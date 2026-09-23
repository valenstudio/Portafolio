import React from 'react';
import './HomePage.css';
import florAzul from '../assets/images/FlorAzul.png';
import mariquita from '../assets/images/Mariquita.png';
import manzana from '../assets/images/Manzana.png';
import puertaRosada from '../assets/images/PuertaRosada.png';
import puertaAzul from '../assets/images/PuertaAzul.png';
import puertaVerde from '../assets/images/PuertaVerde.png';
import valenLandingImg from '../assets/images/ValenParaLanding.png';
import valenLandingCelularImg from '../assets/images/LandingCelular.png';
import { projectsData } from '../data/projects';
import { ShapeDecoration } from './Decorations';

interface HomePageProps {
  onNavigateToProjects: (category: string) => void;
  onNavigateToProject: (projectId: number) => void;
  onNavigateToAbout?: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateToProjects, onNavigateToProject, onNavigateToAbout }) => {
  return (
    <div className="home-page">
      {/* Filtro SVG para la sombra de pincel de grano tipo Procreate */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <filter id="grainy-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', flex: 1, marginTop: '-115px' }}>
        <div className="hero-section">
          <div className="noise-overlay"></div>
          
          <ShapeDecoration type="sparkle" color="#FDE292" size={90} className="floating-shape float-anim-1" style={{ top: '20%', left: '15%' }} />
          <ShapeDecoration type="asterisk" color="#FFC4D9" size={110} className="floating-shape spin-anim" style={{ top: '65%', left: '8%' }} />
          <ShapeDecoration type="flower" color="#C4E1FF" size={80} className="floating-shape float-anim-2" style={{ top: '15%', right: '15%' }} />
          <ShapeDecoration type="burst" color="#E5F487" size={120} className="floating-shape pulse-rotate" style={{ top: '70%', right: '12%' }} />
          <ShapeDecoration type="roundedFlower" color="#F57F17" size={70} className="floating-shape float-anim-3" style={{ top: '45%', right: '5%' }} />
          <ShapeDecoration type="sparkle" color="#F48FB1" size={60} className="floating-shape float-anim-2" style={{ top: '85%', left: '30%' }} />

        </div>
        <div className="hero-logo-center">
          <div className="hero-center-logo">
            <picture style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <source media="(max-width: 768px)" srcSet={valenLandingCelularImg} />
              <img 
                src={valenLandingImg} 
                alt="Valen Landing Logo" 
                style={{ width: '100%', height: 'auto', objectFit: 'contain', zIndex: 10, position: 'relative' }} 
              />
            </picture>
          </div>
        </div>
      </div>

      <div id="proyectos-inicio" className="services-section">
        <div className="services-top-yellow" style={{ position: 'relative' }}>
          <ShapeDecoration type="sparkle" color="#D32F2F" size={50} className="floating-shape float-anim-1" style={{ top: '20px', left: '10%' }} />
          <ShapeDecoration type="asterisk" color="#1A365D" size={60} className="floating-shape spin-anim" style={{ bottom: '20px', right: '10%' }} />
          
          <div className="quote-pill">
            <span className="quote-text">"Mereces lo que sueñas"</span>
          </div>
        </div>
        
        <div className="services-bottom-pink">


          <div className="services-cards-container">
            {/* Ilustración */}
            <div className="service-card" style={{ backgroundColor: '#F0F7FF', '--card-color': '#1A365D' } as React.CSSProperties}>
              <div className="service-card-inner">
                <div className="service-card-img-wrapper">
                  <img src={florAzul} alt="Ilustración" className="service-card-image house-img" />
                  <img src={puertaAzul} alt="Puerta Ilustración" className="service-card-image door-img" />
                </div>
                <h3 className="service-card-title">
                  Ilustración
                  <span style={{ 
                    fontFamily: "'MV Boli', cursive", 
                    fontWeight: 'normal', 
                    paddingLeft: '10px',
                    fontSize: '1.4em',
                    display: 'inline-block',
                    transform: 'translateY(15px)'
                  }}>*</span>
                </h3>
                <p className="service-card-desc">Personajes, composiciones, portadas<br/>y universos visuales.</p>
                <div className="service-card-pills">
                  {projectsData.filter(p => p.category === 'ILUSTRACIÓN').map(project => (
                    <span 
                      key={project.id} 
                      className="service-pill"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateToProject(project.id);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {project.title}
                    </span>
                  ))}
                </div>
              </div>
              <button className="service-card-btn btn-blue" onClick={() => onNavigateToProjects('ILUSTRACIÓN')}>➜</button>
            </div>

            {/* Branding */}
            <div className="service-card" style={{ backgroundColor: '#FDFEEB', '--card-color': '#2E4D2B' } as React.CSSProperties}>
              <div className="service-card-inner">
                <div className="service-card-img-wrapper">
                  <img src={mariquita} alt="Branding" className="service-card-image house-img" />
                  <img src={puertaVerde} alt="Puerta Branding" className="service-card-image door-img" />
                </div>
                <h3 className="service-card-title">
                  Branding
                  <span style={{ 
                    fontFamily: "'MV Boli', cursive", 
                    fontWeight: 'normal', 
                    paddingLeft: '10px',
                    fontSize: '1.4em',
                    display: 'inline-block',
                    transform: 'translateY(15px)'
                  }}>*</span>
                </h3>
                <p className="service-card-desc">Identidades visuales, tono de marca,<br/>empaques y dirección creativa.</p>
                <div className="service-card-pills">
                  {projectsData.filter(p => p.category === 'BRANDING').map(project => (
                    <span 
                      key={project.id} 
                      className="service-pill"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateToProject(project.id);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {project.title}
                    </span>
                  ))}
                </div>
              </div>
              <button className="service-card-btn btn-yellow" onClick={() => onNavigateToProjects('BRANDING')}>➜</button>
            </div>

            {/* Editorial */}
            <div className="service-card" style={{ backgroundColor: '#FFF4F8', '--card-color': '#8C182B' } as React.CSSProperties}>
              <div className="service-card-inner">
                <div className="service-card-img-wrapper">
                  <img src={manzana} alt="Editorial" className="service-card-image house-img" style={{ maxWidth: '145px', bottom: '-10px' }} />
                  <img src={puertaRosada} alt="Puerta Editorial" className="service-card-image door-img" style={{ maxWidth: '145px', bottom: '-10px' }} />
                </div>
                <h3 className="service-card-title">
                  Editorial
                  <span style={{ 
                    fontFamily: "'MV Boli', cursive", 
                    fontWeight: 'normal', 
                    paddingLeft: '10px',
                    fontSize: '1.4em',
                    display: 'inline-block',
                    transform: 'translateY(15px)'
                  }}>*</span>
                </h3>
                <p className="service-card-desc">Revistas, mapas, libros y piezas variadas.</p>
                <div className="service-card-pills">
                  {projectsData.filter(p => p.category === 'EDITORIAL').map(project => (
                    <span 
                      key={project.id} 
                      className="service-pill"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateToProject(project.id);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {project.title}
                    </span>
                  ))}
                </div>
              </div>
              <button className="service-card-btn btn-blue" onClick={() => onNavigateToProjects('EDITORIAL')}>➜</button>
            </div>
          </div>
        </div>

        {/* Proyectos Destacados */}
        <div className="featured-projects-section">
          <div className="featured-header">
            <span className="featured-subtitle">ALGUNOS DE MIS FAVORITOS</span>
            <h2 className="featured-title">Proyectos Destacados</h2>
            <p className="featured-desc">Una selección de trabajos que he realizado con mucho amor.</p>
          </div>
          <div className="featured-projects-grid">
            {[9, 2, 7].map((id, index) => { /* Casa Oculta, Mientras tanto, Alma cotidiana */
              const project = projectsData.find(p => p.id === id);
              if (!project) return null;
              const bgs = ['#FAD2E1', '#D3E2C7', '#C4E1FF'];
              const stickerColors = ['#D32F2F', '#F57F17', '#F48FB1'];
              
              return (
                <div 
                  key={project.id} 
                  className="featured-project-card"
                  onClick={() => onNavigateToProject(project.id)}
                >
                  <div className="featured-img-wrapper" style={{ '--card-bg': bgs[index] } as React.CSSProperties}>
                    <img
                      src={project.thumbnail ?? project.images.find(img => !img.isHeroLogo)?.url}
                      alt={project.title}
                    />
                    <div className="featured-sticker">
                      {index === 0 && (
                        <svg viewBox="0 0 100 100" className="sticker-svg" fill={stickerColors[index]}>
                          <path d="M50 15 C 65 -5, 95 10, 85 30 C 105 45, 95 75, 75 75 C 80 95, 55 105, 50 85 C 45 105, 20 95, 25 75 C 5 75, -5 45, 15 30 C 5 10, 35 -5, 50 15 Z" strokeLinejoin="round" strokeWidth="4" stroke={stickerColors[index]}/>
                        </svg>
                      )}
                      {index === 1 && (
                        <svg viewBox="0 0 100 100" className="sticker-svg" fill={stickerColors[index]}>
                          <path d="M 50 5 L 60 30 L 90 20 L 70 45 L 95 65 L 65 65 L 75 95 L 50 75 L 20 95 L 35 65 L 5 60 L 30 45 L 10 20 L 40 30 Z" strokeLinejoin="round" strokeWidth="4" stroke={stickerColors[index]}/>
                        </svg>
                      )}
                      {index === 2 && (
                        <svg viewBox="0 0 100 100" className="sticker-svg" fill={stickerColors[index]}>
                          <path d="M 50 15 C 60 5, 80 15, 80 30 C 95 30, 95 50, 85 60 C 95 75, 75 90, 60 85 C 50 95, 30 90, 25 75 C 10 80, 5 60, 15 50 C 5 35, 20 15, 35 25 C 40 10, 55 10, 50 15 Z" strokeLinejoin="round" strokeWidth="4" stroke={stickerColors[index]}/>
                        </svg>
                      )}
                      <span className="sticker-text">{index + 1}</span>
                    </div>
                  </div>
                  <div className="featured-info">
                    <h3 className="featured-project-title">{project.title}</h3>
                    <p className="featured-project-subtitle">{project.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* About Preview Section */}
        <div className="about-preview-section">
          <div className="about-preview-left">
            <div className="about-preview-card">
              <h2 className="about-preview-title">QUIÉN SOY</h2>
              <p className="about-preview-desc">
                Soy una diseñadora gráfica en formación con un profundo interés en las artes visuales, buscando siempre aprender y adaptarme a nuevos retos creativos.
              </p>
              <h3 className="about-preview-subtitle">Especialidades:</h3>
              <ul className="about-preview-list">
                <li>ILUSTRACIÓN DIGITAL</li>
                <li>DISEÑO EDITORIAL</li>
                <li>IDENTIDAD DE MARCA</li>
              </ul>
              <button className="about-preview-btn" onClick={onNavigateToAbout}>
                SOBRE MÍ
              </button>
            </div>
          </div>
          <div className="about-preview-right">
            {/* Decorations */}
            <svg className="dec-icon dec-blue-star float-anim-1" viewBox="0 0 100 100" fill="#3B82F6" style={{ overflow: 'visible' }}>
              <path d="M50 0 C50 40 60 50 100 50 C60 50 50 60 50 100 C50 60 40 50 0 50 C40 50 50 40 50 0 Z"/>
            </svg>
            <svg className="dec-icon dec-green-sparkle spin-anim" viewBox="0 0 100 100" fill="#10B981" style={{ overflow: 'visible' }}>
              <path d="M50 5 L58 38 L95 25 L65 50 L95 75 L58 62 L50 95 L42 62 L5 75 L35 50 L5 25 L42 38 Z"/>
            </svg>
            <svg className="dec-icon dec-pink-spiral float-anim-2" viewBox="0 0 100 50" fill="none" stroke="#F472B6" strokeWidth="8" strokeLinecap="round" style={{ overflow: 'visible' }}>
              <path d="M10 30 C 15 -10, 45 -10, 45 20 C 45 45, 25 45, 25 30 C 25 5, 65 5, 65 25 C 65 45, 45 45, 45 30 C 45 10, 85 10, 85 25 C 85 45, 65 45, 65 30 C 65 15, 95 15, 95 30" />
            </svg>
            <svg className="dec-icon dec-orange-wave pulse-rotate" viewBox="0 0 100 40" fill="none" stroke="#F97316" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: 'visible' }}>
              <path d="M10 25 C 20 5, 30 5, 40 25 C 50 45, 60 45, 70 25 C 80 5, 90 5, 100 25" />
            </svg>
            <svg className="dec-icon dec-yellow-curl float-anim-1" viewBox="0 0 50 50" fill="none" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" style={{ overflow: 'visible' }}>
              <path d="M10 10 C 40 -10, 50 40, 25 40 C 0 40, 0 10, 30 20" />
            </svg>
            <div className="dec-icon dec-yellow-dot float-anim-2"></div>

            <div className="about-preview-photo">
              <span>¿Trabajamos juntos? :)</span>
              <div className="about-preview-contact-btns">
                <a
                  className="about-preview-btn about-preview-whatsapp"
                  href="https://wa.me/573113606718?text=Hola!%20vengo%20de%20chismosear%20tu%20portafolio%20%E2%9C%B7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WHATSAPP
                </a>
                <a
                  className="about-preview-btn about-preview-whatsapp"
                  href="mailto:valearbelaez.06@gmail.com?subject=Hola!%20%E2%9C%B7&body=Hola!%20Vengo%20de%20chismosear%20tu%20portafolio%20%E2%9C%B7"
                >
                  CORREO
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
