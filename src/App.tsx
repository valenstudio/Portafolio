import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import HomePage from './components/HomePage';
import ProjectsPage from './components/ProjectsPage';
import ProjectDetailPage from './components/ProjectDetailPage';
import Preloader from './components/Preloader';
import { projectsData, getCategorySectionId } from './data/projects';
import { ShapeDecoration } from './components/Decorations';
import { smoothScrollTo } from './utils/smoothScroll';

// Import images
import profilePic from './assets/images/Fotovalen.png';
import profilePicIllust from './assets/images/Valenilustrada1.png';
import profilePicIllust2 from './assets/images/Valenilustrada2.png';

const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
};

import keyRed from './assets/images/LlaveRoja.png';
import keyGreen from './assets/images/LlaveVerde.png';
import keyPink from './assets/images/Llaverosada.png';
import stampStar from './assets/images/SelloEstrella.png';
import stampApple from './assets/images/SelloManzana.png';
import stampDog from './assets/images/SelloPerrito.png';
import stampMug from './assets/images/SelloTaza.png';
import lockBlue from './assets/images/Candadoazul.png';
import lockPink from './assets/images/Candadorosa.png';

function App() {
  const [activePage, setActivePage] = useState<'HOME' | 'ABOUT' | 'PROJECTS' | 'CONTACT'>(() => {
    return (sessionStorage.getItem('activePage') as any) || 'HOME';
  });
  const [activeProjectId, setActiveProjectId] = useState<number | null>(() => {
    const saved = sessionStorage.getItem('activeProjectId');
    return saved ? parseInt(saved, 10) : null;
  });

  useEffect(() => {
    sessionStorage.setItem('activePage', activePage);
  }, [activePage]);

  useEffect(() => {
    if (activeProjectId !== null) {
      sessionStorage.setItem('activeProjectId', activeProjectId.toString());
    } else {
      sessionStorage.removeItem('activeProjectId');
    }
  }, [activeProjectId]);
  const [scrollY, setScrollY] = useState(0);
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(() => {
    const savedPage = sessionStorage.getItem('activePage');
    return !savedPage || savedPage === 'HOME';
  });
  const [isMenuForceOpen, setIsMenuForceOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isNaturallyTransparent = activePage === 'HOME' && (scrollY < window.innerHeight * 0.95);
  const isTransparent = isNaturallyTransparent && !isMenuForceOpen;
  const isStaticNav = activePage === 'ABOUT' || activePage === 'PROJECTS';

  useEffect(() => {
    if (!isNaturallyTransparent && isMenuForceOpen) {
      setIsMenuForceOpen(false);
    }
  }, [isNaturallyTransparent, isMenuForceOpen]);

  const handleFlowerClick = () => {
    if (isNaturallyTransparent) {
      setIsMenuForceOpen(!isMenuForceOpen);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!loading) {
      document.body.style.backgroundColor = '';
      return;
    }
    // Al finalizar el timer, limpiamos el color rojo del index.html para que vuelva al color crema
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.backgroundColor = '';
    }, 4200);
    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (pendingScrollId) {
      // Periodic check to ensure the element is available in DOM
      let attempts = 0;
      const checkAndScroll = () => {
        const element = document.getElementById(pendingScrollId);
        if (element) {
          const yOffset = activePage === 'HOME' ? -100 : 0; // Navbar offset (the nav is static on the projects page)
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          smoothScrollTo(y);
          setPendingScrollId(null);
        } else if (attempts < 20) {
          attempts++;
          setTimeout(checkAndScroll, 100);
        } else {
          setPendingScrollId(null);
        }
      };
      
      const timer = setTimeout(checkAndScroll, 100);
      return () => clearTimeout(timer);
    }
  }, [activePage, pendingScrollId]);

  const handleNavClick = (page: 'HOME' | 'ABOUT' | 'PROJECTS' | 'CONTACT', category?: string, scrollId?: string) => {
    setActivePage(page);
    setIsMenuForceOpen(false);
    setIsMobileMenuOpen(false); // Close mobile menu on click
    setActiveProjectId(null); 

    // A category (Editorial, Ilustración, Branding) scrolls to its section on the projects page
    if (category && !scrollId) {
      scrollId = getCategorySectionId(category);
    }
    
    if (scrollId) {
      if (page !== activePage) window.scrollTo(0, 0);
      setPendingScrollId(scrollId);
    } else {
      window.scrollTo(0, 0);
    }
  };

  const handleProjectClick = (projectId: number) => {
    setActivePage('PROJECTS');
    setActiveProjectId(projectId);
    window.scrollTo(0, 0);
  };
  
  const handleNavigateToProjects = (cat?: string) => handleNavClick('PROJECTS', cat);


  const renderContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activePage + (activePage === 'PROJECTS' ? (activeProjectId || 'list') : '')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, type: 'tween', ease: 'easeInOut' }}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}
        >
          {(() => {
            switch (activePage) {
              case 'HOME':
                return <HomePage 
                  onNavigateToProjects={handleNavigateToProjects} 
                  onNavigateToProject={handleProjectClick}
                  onNavigateToAbout={() => handleNavClick('ABOUT')}
                />;
      case 'PROJECTS':
        if (activeProjectId !== null) {
           return <ProjectDetailPage id={activeProjectId} onProjectClick={handleProjectClick} />;
         }
        return <ProjectsPage onProjectClick={handleProjectClick} />;
      case 'ABOUT':
        return (
          <>
            <ScrollToTop />
            <header className="header-section" style={{ position: 'relative' }}>
              <ShapeDecoration type="sparkle" color="#FDE292" size={70} className="floating-shape float-anim-1" style={{ top: '10%', left: '5%' }} />
              <ShapeDecoration type="asterisk" color="#FFC4D9" size={80} className="floating-shape spin-anim" style={{ bottom: '15%', right: '10%' }} />
              <ShapeDecoration type="flower" color="#C4E1FF" size={90} className="floating-shape float-anim-2" style={{ top: '5%', right: '15%' }} />
              <ShapeDecoration type="burst" color="#E5F487" size={100} className="floating-shape pulse-rotate" style={{ top: '50%', left: '2%' }} />
              <div className="header-inner">
                <div className="header-left">
                  <div className="profile-wrapper">
                    <img src={profilePic} alt="Valentina Arbeláez" className="profile-pic" style={{ position: 'absolute', top: 0, left: 0 }} />
                    <img 
                      src={profilePicIllust} 
                      alt="Valentina Ilustrada" 
                      className="profile-pic" 
                      style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        opacity: scrollY > 100 ? 1 : 0,
                        transform: scrollY > 100 ? 'rotate(-4deg) scale(1.05) translate(2px, -3px)' : 'none',
                        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                      }} 
                    />
                    <img 
                      src={profilePicIllust2} 
                      alt="Valentina Ilustrada 2" 
                      className="profile-pic" 
                      style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        opacity: scrollY > 200 ? 1 : 0,
                        transform: scrollY > 200 ? 'rotate(5deg) scale(1.08) translate(-4px, 5px)' : 'none',
                        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.1s linear'
                      }} 
                    />
                  </div>
                </div>
                <div className="header-right">
                  <div className="title-area">
                    <motion.svg 
                      className="logo-valen"
                      viewBox="0 0 956.5 493.47"
                      stroke="var(--color-primary, #A00028)"
                      strokeLinejoin="round"
                      animate={{ 
                        scaleX: [1, 1, 1.006, 1.006],
                        scaleY: [1, 1, 0.994, 0.994],
                        skewX: [0, 0, 0.4, 0.4],
                        rotate: [0, 0, -0.3, -0.3],
                        strokeWidth: [0, 0, 4, 4]
                      }}
                      transition={{ 
                        duration: 0.35, 
                        repeat: Infinity, 
                        times: [0, 0.499, 0.5, 1],
                        ease: "linear" 
                      }}
                    >
                      <path 
                        d="M186.58,250.52c-5.89-6.75-15.94-7.48-24.15-4.7-13.86,4.7-24.75,14.12-34.88,24.96-19.76,21.16-33.27,46.68-42.91,73.99-11.22,31.79-13.97,57.91-16.02,91.61-.73,11.97-.77,23.98-6.35,35.03-8.23,16.33-28.29,25-45.63,21.15C5.66,490.13-.39,480.87.02,470.45c.81-20.47,15.88-47.01,23.93-67.22l16.5-41.44,13.05-37.33c14.67-41.98,24.69-84.85,35.66-128.08-37.65-1.08-72.23-27.08-65.13-66.09,2.1-9.53,7.39-17.4,15.73-22.6,10.86-6.77,25.26-5.2,33.76,4.61,1.07,1.24,2.15,5.04,1.9,6.56-.28,1.71-2.62,3.59-4.67,5.25-4.74,3.83-8.27,10.77-8,17.45.7,17.07,15.57,29.82,32.3,30.9l9.44-34.88c4.24-15.64,10.15-30.13,17.33-44.58,16.38-32.98,42.1-64.39,81.96-66.2,4.19-.19,9.6,1.24,13.8,2.16,15.71,3.44,25.02,15.2,27.83,30.75,3.2,17.71-.72,35.2-9.36,51.3-9.11,17.29-21.09,32.39-35.69,45.49-20.74,18.35-44.78,31.41-72.72,36.98-7.01,23.55-16.21,46.53-21.02,71.96,15.52-20.58,28.99-38.85,48.54-53.19,17.63-13.68,42.83-23.55,64.7-16.63,33.14,10.47,24.54,53.08,15.49,77.86-12.64,34.59-32.23,65.42-41.64,100.26-3.95,14.63-7.05,43.99,12.89,47.26,27.92,4.57,55.7-46.39,59.82-66.09,8.54-40.84,21.8-79.7,44.64-114.71,11.63-17.83,28.56-38.6,47.35-48.93,3.42-1.88,7.56-2.52,11.45-1.32,3.4,1.04,5.8,3.99,7.88,8.34,2.26-1.85,4.88-4.03,7.19-6.27,12.72-12.35,29.3-19.22,47.15-18.3,15.3.79,28.24,8.69,36.68,21.46,11.39,17.22,13.56,40.35,12.13,60.64l-.95,13.46-4.04,22.21c-.08.43.17,1.43.47,1.56.46.2,2.34.23,2.88-.04,11.85-5.91,23.48-14.9,32.16-25.55s16.65-21.65,21.15-34.37c5.42-15.34,9.13-30.33,13.3-46.01l20.58-77.46c2.19-8.23,7.84-31.25,2.86-36.7-4.3-4.7-14.96-.72-20.89-8.24-9.33-11.82-.85-24.89,8.3-34.73,7.36-7.91,15.34-14.91,24.34-20.94,11.67-7.82,33.66-14.7,43.42-1.8,5.53,7.31,5.39,16.43,3.99,25.19-2.89,18.1-7.05,34.93-12.55,52.52l-46.5,148.48-29.25,92.64c-3.08,9.75-4.15,19.13-5.28,29.11s-.03,28.18,10.51,33.98c6.61,3.63,15.17,2.81,22.19-.82,20.6-10.64,41.29-50.73,47.23-72.26,12.8-46.4,34.62-89.68,65.67-126.38,12.37-14.62,26.01-27.09,42.41-36.57,21.49-12.42,49.73-16.49,64.87,8.18,6.39,10.42,8.18,27.36,9.77,21.45,6.54-24.3,12.15-40.74,40.91-39.89,10,.3,17.96,6.17,18.69,16.95.47,6.88-.86,14.74-4.02,21.2-5.35,10.95-11.57,20.65-18.26,30.76-14.51,21.93-22.71,48.57-29.22,73.95-4.37,17.02-15.83,64.95-2.42,77.62,7.94,7.51,19.06,3.72,25.95-2.95,9.81-9.51,14.26-21.5,11.13-35.03-2.46-10.65-.46-22.85,6.87-30.97,8.85-9.79,24.03-11.19,34.1-3.14,13.34,10.66,11.13,34.22,5.73,48.78-4.69,12.64-10.86,24.39-18.87,35.15-18.55,24.91-50.31,53.82-82.96,50.71-15.31-1.46-26.77-10.76-31.29-25.09-3.22-10.22-3.44-20.44-3.67-31.85-21.08,32.37-48.12,67.06-89.84,68.55-18.2.65-34.07-9.05-42.2-25.09-4.92-9.7-8.18-20.03-9.23-30.9l-.19-1.93c-.03-.36-1.57.57-1.91,1.16-14.13,23.88-27.6,45.05-52.96,60.4-7.98,4.83-17.09,7.72-26.45,8.52-16.47,1.42-31.09-7.43-36.28-23.17-4.07-12.35-4.52-24.97-2.69-38.14,3.49-25.15,10.42-48.99,18.7-72.88l6.06-17.48-1.33-1.2c-13.11,11.56-27.44,19.72-44.07,25.39-10.96,32.24-26.13,61.96-46.53,89.28-23.32,31.21-57.58,58.94-98.62,54.73-33.29-3.42-50.22-28.67-55.95-59.32-.49-.41-1.83-1.5-.99-.78-7.22,12.34-13.14,23.44-21.76,34.01-14.49,17.78-33.85,36.66-57.55,39.5-16.53,1.98-31.37-4.87-38.49-20.04-11.51-24.52-2.65-60.78,7.7-84.7l22.39-51.72c6.22-14.38,11.07-28.48,14.16-43.94,1.93-9.68,1.46-20.53-5.61-28.64ZM135.85,168.36c34.76-9.93,70.14-41.96,77.34-78.07,1.67-8.4,1.35-17.73-4.51-24.32-5.29-5.94-14.43-5.9-21.28-2.17-24.27,13.22-42.3,76.42-51.55,104.56ZM695.78,371.92c15.64-3.03,28.63-11.64,39.17-22.95,27.81-29.86,37.07-61.13,40.48-101.53,1.41-16.69,3.12-60.44-16.63-67.12-11.6-3.92-23.31.95-33,7.59-35.87,24.6-57.38,71.44-65.61,113.01-3.28,16.59-3.94,33.54,1.11,49.4,4.77,14.98,18.09,24.76,34.48,21.59ZM434.16,329.42c-7.69.04-13.96-.07-20.81-.73-26.14-2.52-46.86-20.42-54.32-45.28-6.69-22.3-2.26-47.78,8.26-69.43-15.18,4.72-31.33,32.1-37.58,45.73-16.39,35.79-27.76,90.44-8.08,126.36,9.35,17.07,28.01,23.45,46.63,19.05,33.3-7.87,54.98-46.35,65.89-75.7ZM441.4,302.39c6.44-22.73,7.68-69.54-16.1-80.98-12.7-6.11-27.39-.78-34.54,11.37-7.03,11.96-8.02,25.81-3.95,39.2,6.95,22.87,31.53,34.81,54.59,30.4Z"
                        fill="var(--color-primary, #A00028)"
                      />
                      <path 
                        d="M933.8,248.89c-29.91,2.86-37.26,26.54-44.96,25.63-5.66-.67,8.76-24.11-6.79-42.94-4.44-5.38-10.03-10.09-15.35-14.36-.98-.79-2.33-3.45-1.6-4.2,3.44-3.49,12.42-.01,20.16.09,12.37.17,23.34-5.55,31.45-14.36l10.97-11.93c.56-.61,2.47-1.38,3.2-1.3,4.85.51-8.17,26.35,5.84,42.66,7.85,9.14,16.97,13.57,19.6,17.95,2.11,3.52-14.93,2.03-22.52,2.75Z"
                        fill="var(--color-primary, #A00028)"
                      />
                    </motion.svg>
                    <motion.p 
                      className="intro-text-header"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                      <span className="wrap-trigger">Soy <strong>Valentina Arbeláez</strong>, diseñadora gráfica en formación</span>
                      con interés en las áreas de ilustración y de diseño editorial.<br />
                      Me caracterizo por mi atención al detalle, adaptabilidad y enfoque estratégico al desarrollar ideas. Valoro el trabajo colaborativo,<br />
                      la creatividad y la búsqueda constante de soluciones innovadoras.
                    </motion.p>
                  </div>
                </div>
              </div>
            </header>

            <main className="main-section" style={{ position: 'relative' }}>
              <ShapeDecoration type="horseshoe" color="#D32F2F" size={95} className="floating-shape float-anim-1" style={{ bottom: '5%', right: '5%' }} />
              <div className="col-left">
                <motion.div 
                  className="info-block-green"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="education-section">
                    <h2 className="section-title" style={{ whiteSpace: 'nowrap' }}>Formación académica</h2>
                    <p className="edu-text">
                      Pregrado Diseño Gráfico<br/>
                      Universidad Pontificia<br/>
                      Bolivariana | 2023 - Actual<br/>
                      Medellín, Colombia
                    </p>
                    <div className="honor-badge">
                      <span className="asterisk">*</span>
                      <p>Distinción académica<br/>Núcleo Profesional I<br/>| 2025 -01<br/>Ecos Latinos</p>
                    </div>
                    </div>
                  
                  <div className="emphasis-area" style={{ marginTop: '0.5rem' }}>
                    <h3 className="section-title">Énfasis</h3>
                    <div className="stamps-container">
                      <div className="stamp-item" onClick={() => handleNavClick('PROJECTS', 'EDITORIAL')}>
                        <div className="stamp-box">
                          <img src={keyPink} alt="Llave rosa" className="stamp-icon" />
                        </div>
                        <span className="stamp-label"><span className="mv-asterisk">*</span>Editorial</span>
                      </div>
                      <div className="stamp-item" onClick={() => handleNavClick('PROJECTS', 'ILUSTRACIÓN')}>
                        <div className="stamp-box">
                          <img src={keyRed} alt="Llave roja" className="stamp-icon" />
                        </div>
                        <span className="stamp-label"><span className="mv-asterisk">*</span>Ilustración</span>
                      </div>
                      <div className="stamp-item" onClick={() => handleNavClick('PROJECTS', 'BRANDING')}>
                        <div className="stamp-box y-bg">
                          <img src={keyGreen} alt="Llave verde" className="stamp-icon" />
                        </div>
                        <span className="stamp-label"><span className="mv-asterisk">*</span>Branding</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="col-center">
                <motion.div 
                  className="tools-section"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h2 className="section-title">Herramientas</h2>
                  <ul className="tools-list">
                    <li><span className="tool-name">Ai</span> <div className="tool-line"><span className="tool-asterisk" style={{left: '80%'}}>*</span></div></li>
                    <li><span className="tool-name">Ps</span> <div className="tool-line"><span className="tool-asterisk" style={{left: '85%'}}>*</span></div></li>
                    <li><span className="tool-name">Id</span> <div className="tool-line"><span className="tool-asterisk" style={{left: '68%'}}>*</span></div></li>
                    <li><span className="tool-name">Ae</span> <div className="tool-line"><span className="tool-asterisk" style={{left: '68%'}}>*</span></div></li>
                    <li><span className="tool-name">Pr</span> <div className="tool-line"><span className="tool-asterisk" style={{left: '68%'}}>*</span></div></li>
                  </ul>
                </motion.div>
              </div>
              
              <div className="col-right">
                <motion.div 
                  className="interests-section"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="section-title">Intereses</h2>
                  <div className="interests-grid">
                    <div className="interest-item">
                      <div className="stamp-box-interest">
                        <img src={stampDog} alt="Animales" />
                      </div>
                      <span>Animales</span>
                    </div>
                    <div className="interest-item">
                      <div className="stamp-box-interest">
                        <img src={stampMug} alt="Cerámica" />
                      </div>
                      <span>Cerámica</span>
                    </div>
                    <div className="interest-item">
                      <div className="stamp-box-interest star-bg">
                        <img src={stampStar} alt="La astrología" className="star-interest" />
                      </div>
                      <span>La astrología</span>
                    </div>
                    <div className="interest-item">
                      <div className="stamp-box-interest apple-bg">
                        <img src={stampApple} alt="La cocina" />
                      </div>
                      <span>La cocina</span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="languages-section"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h2 className="section-title">Idiomas</h2>
                  <div className="language-item">
                    <img src={lockBlue} alt="Candado azul" />
                    <div className="lang-text">
                      <strong>Español</strong>
                      <span>C2 — Nativo</span>
                    </div>
                  </div>
                  <div className="language-item">
                    <img src={lockPink} alt="Candado rosa" />
                    <div className="lang-text">
                      <strong>Inglés</strong>
                      <span>B2 — Avanzado</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </main>
          </>
        );

      default:
        return null;
    }
          })()}
        </motion.div>
      </AnimatePresence>
    );
  };

  let currentNavBg = undefined;
  let currentNavText = undefined;
  
  if (activePage === 'PROJECTS' && activeProjectId !== null) {
    const project = projectsData.find(p => p.id === activeProjectId);
    if (project) {
      currentNavBg = project.navBgColor;
      currentNavText = project.navTextColor;
    }
  }

  const isHomeTransparent = activePage === 'HOME' && scrollY < window.innerHeight * 0.95;

  const finalNavBg = isHomeTransparent 
    ? 'transparent' 
    : (currentNavBg || 'var(--color-primary)');

  const finalNavText = currentNavText || (isHomeTransparent ? 'var(--color-primary)' : '#fff7ef');
  const finalNavHover = currentNavText || (isHomeTransparent ? 'var(--color-primary)' : '#ffa3cf');
  const finalNavActive = currentNavText || (isHomeTransparent ? 'var(--color-primary)' : '#C4E1FF');

  return (
    <div className="portfolio-container">
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>
      
      {!loading && (
        <>
          {/* Top Navigation Bar */}
          <motion.nav 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className={`top-nav ${isTransparent ? 'transparent-nav' : ''} ${isStaticNav ? 'static-nav' : ''}`}
            style={{
              backgroundColor: finalNavBg,
              '--nav-text-color': finalNavText,
              '--nav-hover-color': finalNavHover,
              '--nav-active-color': finalNavActive
            } as React.CSSProperties}
          >
            <div className="nav-logo-container">
              {activePage === 'HOME' ? (
                <div 
                  className="nav-rotating-asterisk-container"
                  style={{ transform: `rotate(${scrollY * 0.5}deg)`, cursor: 'pointer', pointerEvents: 'auto' }}
                  onClick={handleFlowerClick}
                >
                  <span className="nav-rotating-asterisk">✿</span>
                </div>
              ) : (
                <motion.svg
                  viewBox="0 0 533.27 273.91"
                  className="nav-logo"
                  style={{ cursor: 'pointer', height: '55px', width: 'auto', overflow: 'visible' }}
                  onClick={() => handleNavClick('HOME')}
                >
                  <g fill="#fff7ef">
                    <path d="M5.4,139.08c-16.97-21.57,9.71-57,29.85-66.04,18.44-9.01,48.57-3.08,46.74,21.88-1.34,10.91-9.74,30.77-15.03,43.74-7.65,18.99-19.72,49.56-27.22,70.25-2.84,9.63-6.81,23.07,1.56,29.9,4.35,3,10.98,2.92,15.6.69,46.23-23.65,78.53-119.72,68.26-169.67-4.19-11.19-17.8-15.02-25.79-23.24-5.21-5.14-5.55-13.69-.58-19.01,11.08-11.07,30.42-10.13,41.17.85,7.44,8.98,9.89,20.81,11.37,32.41,3.2,35.76-10.64,75.29-22.02,106.06-17.73,35.04-36.29,72.47-68.74,96.15-8.88,5.79-19.16,11.69-30.04,10.79-10.98-1.1-21.68-8.82-22.69-20.38-1.48-15.57,5.79-30.25,12.18-44.11,13.69-32.17,34.43-60.91,38.59-96.49,1.48-7.69-3.93-14.76-11.13-17.04-8.77-3.2-17.69.98-18.69,10.55-1.62,8.28,1.81,16.02.13,24.22-1.6,11.42-15.3,16.42-23.33,8.69l-.19-.19Z"/>
                    <path d="M201.59,228.15l-3.27-5.11c-22.59,33.65-72.87,42.11-68.22-11.99,3.61-35.5,22.72-66.95,42.96-95.46,8.17-12.07,28.99-35.75,41.78-17.35,5.91,7.47,8.99,15.43,9.23,25.59,3.32-7.25,9.03-30.66,16.26-33.2,26.33-5.64,17.76,12.55,9.21,26.89-7.93,7.76-13.46-5.3-17.42,13.27-3.45,16.2-8.47,35.37-10.58,51.7-3.68,46.64,13.83,7.47,16.83,22.35-.51,7.25-2.72,14.34-6.98,20.32-7.08,8.52-22.61,14.79-29.82,2.98ZM202.22,189.88c5.04-8.08,7.22-16.88,8.29-26.23,1.59-13.07,4.5-30.13-1.04-42.49-6.26-12.69-21.55-5.28-28.59,2.93-17.83,16.38-25.61,38.61-29.66,62.17-4.6,46.88,35.69,33.49,51,3.62Z"/>
                    <path d="M417.3,134.03c-5.27,19.2-8.62,42.69,8.88,54.88,7.97,3.91,18.89-6.69,19.62,8.96-5.45,30.92-52.05,30.45-49.63-15.39-.64-17.79,2.53-34.93,7.29-51.87,3.52-12.23,19.49-45.96,4.54-53.54-16.59,2.36-15.91-24.97-1.44-25.2,8.34-.69,11.29,8.04,13.86,14.51,2.47,5.74,1.62,12.3,3.89,18.01.21.52,2.63-1.86,2.74-2.05,7.84-12.17,22.48-30.01,37.09-33.46,41.34-2.62,14.76,39.54,9.17,60.28,0,0-7.19,24.18-7.19,24.18-2.31,7.7-5.56,31.16,5.87,28.38,3.32-.93,6.72-3.48,8.24-6.56,2.94-6.25-1.29-13.84,2.46-19.94,6.22-9.35,17.12-4.39,19.52,5.23,1.26,6.66-1.71,12.14-4.14,18.04-5.49,13.32-17.62,25.49-32.88,24.36-9.99-.29-22.34-6.75-19.88-18.87,4.65-19.56,15.75-52.89,21.23-72.74,1.58-5.34,3.52-15.95-2.73-18.85-23.56-8.45-41.27,43.91-46.52,61.65Z"/>
                    <path d="M350.93,218.98c-22.74,9.12-44.79-5.5-48.21-27.19-7.92-29.09,7.08-56.83,17.19-75.54,7.57-16.27,30.89-39.65,47.27-43.12,26.49-4.46,13.89,39.43,5.82,51.46-9.59,17.86-25.33,37.1-38.99,52.19-7.99,11.15,5.3,17.06,14.72,17.62,12.58.47,22.67-9.17,30.07-18.47,1.87-2.64,5.11-4.72,6.65-.65,1.06,2.84.31,6.25-.59,9.36-5.81,15.98-18.29,28.06-33.93,34.33ZM334.92,162.35c14.98-13.1,26.59-33,29.46-52.79.35-6.51-.7-12.96-7.08-13.88-16.15.85-26.4,28.67-29.6,43-1.63,6.45-5.72,30.04,7.21,23.68Z"/>
                    <path d="M291.13,190.8c.17.12.33.26.47.42,1.13,1.28.87,3.24.45,4.89-4.11,16.16-16.85,29.85-32.68,35.1-2.62.87-5.45,1.52-8.14.89-4.6-1.09-7.62-5.8-8.24-10.5-.62-4.69.65-9.4,1.91-13.97,13.59-49.49,26.04-99.29,38.49-149.08,1.56-6.24,3.13-12.54,3.47-18.96.08-1.44-.04-3.15-1.27-3.92-1.03-.65-2.36-.31-3.58-.3-5.16.05-8.38-6.33-7.15-11.33,1.4-5.7,6.66-10.01,10.47-14.14,4.12-4.48,9.9-8.81,16.04-9.74,2.42-.36,5-.17,7.12,1.05,5.66,3.25,5.35,11.41,4.1,17.81-3.95,20.22-9.89,39.99-15.81,59.73-7.74,25.79-15.48,51.59-23.23,77.38-2.81,9.36-5.64,18.83-6.09,28.59-.15,3.24.21,6.99,2.87,8.84,5.45,3.79,12.25-4.46,18.82-3.49.7.1,1.41.33,1.98.74Z"/>
                  </g>
                  <g>
                    <path fill="#fff7ef" d="M497.54,127.06c-1.85-1.16,2.24-6.62.54-13.81-2.11-8.92-11.18-12.28-10.02-14.92,1.16-2.63,9.67,1.92,18.77-1.66,9.5-3.73,13.25-13.8,15.1-12.84,1.75.91-3.66,8.89-.72,16.68,3.04,8.04,12.75,9.98,12.02,12.56-.7,2.47-9.29-.63-19.19,3.23-9.97,3.88-14.34,12.12-16.5,10.76Z"/>
                  </g>
                </motion.svg>
              )}
            </div>
            
            <button 
              className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`} 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('HOME'); }} className={activePage === 'HOME' ? 'active' : ''}>INICIO</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('ABOUT'); }} className={activePage === 'ABOUT' ? 'active' : ''}>SOBRE MÍ</a></li>
              <li className="dropdown">
                <a href="#" 
                   className={activePage === 'PROJECTS' ? 'active' : ''}
                   onClick={(e) => {
                     e.preventDefault();
                     handleNavClick('PROJECTS');
                   }}
                >PROYECTOS</a>
                <div className="dropdown-content">
                  <div className="dropdown-inner">
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('PROJECTS', 'ILUSTRACIÓN'); }}>ILUSTRACIÓN</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('PROJECTS', 'BRANDING'); }}>BRANDING</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('PROJECTS', 'EDITORIAL'); }}>EDITORIAL</a>
                  </div>
                </div>
              </li>
              <li><a href="./PortafolioValentinaArbelaez2026.pdf" target="_blank" rel="noopener noreferrer">PORTAFOLIO PDF</a></li>
            </ul>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            {renderContent()}

            <footer className="footer-section">
            <div className="footer-marquee">
              <div className="footer-marquee-content">
                <span>+57 311 360 6718</span><span className="footer-star">*</span>
                <span>valearbelaez.06@gmail.com</span><span className="footer-star">*</span>
                <span>Medellín, Colombia <strong>2026</strong></span><span className="footer-star">*</span>
                <span>Derechos Reservados</span><span className="footer-star">*</span>
                <span>+57 311 360 6718</span><span className="footer-star">*</span>
                <span>valearbelaez.06@gmail.com</span><span className="footer-star">*</span>
                <span>Medellín, Colombia <strong>2026</strong></span><span className="footer-star">*</span>
                <span>Derechos Reservados</span><span className="footer-star">*</span>
                <span>+57 311 360 6718</span><span className="footer-star">*</span>
                <span>valearbelaez.06@gmail.com</span><span className="footer-star">*</span>
                <span>Medellín, Colombia <strong>2026</strong></span><span className="footer-star">*</span>
                <span>Derechos Reservados</span><span className="footer-star">*</span>
                <span>+57 311 360 6718</span><span className="footer-star">*</span>
                <span>valearbelaez.06@gmail.com</span><span className="footer-star">*</span>
                <span>Medellín, Colombia <strong>2026</strong></span><span className="footer-star">*</span>
                <span>Derechos Reservados</span><span className="footer-star">*</span>
              </div>
              <div className="footer-marquee-content" aria-hidden="true">
                <span>+57 311 360 6718</span><span className="footer-star">*</span>
                <span>valearbelaez.06@gmail.com</span><span className="footer-star">*</span>
                <span>Medellín, Colombia <strong>2026</strong></span><span className="footer-star">*</span>
                <span>Derechos Reservados</span><span className="footer-star">*</span>
                <span>+57 311 360 6718</span><span className="footer-star">*</span>
                <span>valearbelaez.06@gmail.com</span><span className="footer-star">*</span>
                <span>Medellín, Colombia <strong>2026</strong></span><span className="footer-star">*</span>
                <span>Derechos Reservados</span><span className="footer-star">*</span>
                <span>+57 311 360 6718</span><span className="footer-star">*</span>
                <span>valearbelaez.06@gmail.com</span><span className="footer-star">*</span>
                <span>Medellín, Colombia <strong>2026</strong></span><span className="footer-star">*</span>
                <span>Derechos Reservados</span><span className="footer-star">*</span>
                <span>+57 311 360 6718</span><span className="footer-star">*</span>
                <span>valearbelaez.06@gmail.com</span><span className="footer-star">*</span>
                <span>Medellín, Colombia <strong>2026</strong></span><span className="footer-star">*</span>
                <span>Derechos Reservados</span><span className="footer-star">*</span>
              </div>
            </div>
          </footer>
        </motion.div>
        </>
      )}
    </div>
  );
}

export default App;
