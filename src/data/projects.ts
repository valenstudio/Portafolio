import jardinLogo from '../assets/images/JardindeltiempoLogo-web.png';
import ideasLogo from '../assets/images/IdeasalAzarLogo-web.png';
import mapa1 from '../assets/images/Mapa_1.png';
import mapa2 from '../assets/images/Mapa_2.png';
import mientrasTantoLogo from '../assets/images/MientrasTantoLogo.svg';
import sonarContigo1 from '../assets/images/SoñarContigo1-web.jpg';
import sonarContigo2 from '../assets/images/SoñarContigo2-web.jpg';
import jardinEterno from '../assets/images/JardinEterno.jpg';
import carrito from '../assets/images/Carrito.png';
import pesa from '../assets/images/Pesa.png';
import pueblitoPaisa from '../assets/images/PueblitoPaisa.jpg';
import retro1 from '../assets/images/PortadaRetroMotion.png';
import retroContra from '../assets/images/Conrtraportadaa.png';
import retro2 from '../assets/images/OrquestaDeEnsueñoMockup.png';
import ideas1 from '../assets/images/IdeasAlAzar.png';
import ideas2 from '../assets/images/ManifiestoTiro-web.png';
import ideas3 from '../assets/images/ManifiestoRetiro-web.png';
import ideas4 from '../assets/images/BotonIdeasAlAzar.png';
import ideas5 from '../assets/images/BotonAbrazaLoCotidiano.png';
import hogar1 from '../assets/images/Casa1Mockup.png';
import hogar2 from '../assets/images/Casa2Mockup.png';
import hogarLogo from '../assets/images/HogarLogo.svg';
import hogarPoster1 from '../assets/images/Hogar1-web.jpg';
import hogarPoster2 from '../assets/images/Hogar2-web.jpg';
import hogarPoster3 from '../assets/images/Hogar3-web.jpg';
import hogarModeloPapel from '../assets/images/HogarModeloPapel.png';
import alma1 from '../assets/images/AgendaTigres2024.png';
import alma2 from '../assets/images/AlmaCotidianaPajaros.png';
import alma3 from '../assets/images/AlmaCotidianaSeparador.png';
import casaOculta1 from '../assets/images/CasaOcultaBolsaIlustrada.png';
import casaOculta1_2 from '../assets/images/CasaOcultaBolsafoil.png';
import casaOcultaVideo1 from '../assets/images/CasaOcultavideo1.mov';
import casaOcultaVideo2 from '../assets/images/CasaOcultavideo2.mov';
import casaOcultaCarousel1 from '../assets/images/CasaOcultaCarrusel-01.png';
import casaOcultaCarousel2 from '../assets/images/CasaOcultaCarrusel-02.png';
import casaOcultaCarousel4 from '../assets/images/CasaOcultaCarrusel-04.png';
import casaOcultaCarousel5 from '../assets/images/CasaOcultaCarrusel-05.png';
import casaOcultaLogo from '../assets/images/CasaOcultaLogo-01.svg';
import corcovadoLogo from '../assets/images/CorcovadoLogo.svg';
import corcovadoSixPack from '../assets/images/CorcovadoSixPack.png';
import infoCorcovado from '../assets/images/InfoCorcovado.png';
import corcovadoSixPackPendon from '../assets/images/CorcovadoSixpackYPendón.png';
import corcovadoCervezaMockup from '../assets/images/CorcovadoCerevezaMockup.png';
import corcovadoHidromielMockup from '../assets/images/CorcovadoHidromielMockup.png';
import corcovadoVinoMockup from '../assets/images/CorcovadoVinoMockup.png';
import corcovadoPortavinos from '../assets/images/CorcovadoPortavinos.png';
import aguaConSalLogo from '../assets/images/AguaConSalLogo.svg';
import aguaConSalEtiquetas from '../assets/images/EtiquetasAguaConSal.png';
import aguaConSalBolso from '../assets/images/BolsoPecesAguaConSal.png';
import aguaConSalFromShore from '../assets/images/FromShoreAguaconSal.png';
import aguaConSalTags from '../assets/images/AguaConSalEtiquetas-web.png';
import aguaConSalBolsitos from '../assets/images/BolsitosAguaConSal-web.png';
import cuarzoCafeLogo from '../assets/images/CuarzoCafeLogo.svg';
import cuarzoCamisa from '../assets/images/CuarzoCamisa.png';
import cuarzoDisenoCamisa from '../assets/images/CuarzoDiseñoCamisa.png';
import infoCuarzo from '../assets/images/InfocCuarzo.png';
import cuarzoBolsas from '../assets/images/BolsasdeCafeCuarzo.png';
import cuarzoCapsulas from '../assets/images/CapsulasdeCafeCuarzo.png';
import cuarzoCajaTrilogia from '../assets/images/CuarzoCajaTrilogia.png';

// Llaves por categoría (se muestran junto a la descripción de cada proyecto)
import llaveRosada from '../assets/images/Llaverosada.png';
import llaveAzul from '../assets/images/LlaveRoja.png'; // sello rojo con la llave azul clara
import llaveVerde from '../assets/images/LlaveVerde.png';

// Miniaturas livianas para la página de proyectos
import miniaturaJardinDelTiempo from '../assets/images/miniaturas/MiniaturaJardinDelTiempo.webp';
import miniaturaMientrasTanto from '../assets/images/miniaturas/MiniaturaMientrasTanto.webp';
import miniaturaRetroMotion from '../assets/images/miniaturas/MiniaturaRetroMotion.webp';
import miniaturaIdeasAlAzar from '../assets/images/miniaturas/MiniaturaIdeasAlAzar.webp';
import miniaturaHogar from '../assets/images/miniaturas/MiniaturaHogar.webp';
import miniaturaAlmaCotidiana from '../assets/images/miniaturas/MiniaturaAlmaCotidiana.webp';
import miniaturaCorcovado from '../assets/images/miniaturas/MiniaturaCorcovado.webp';
import miniaturaCasaOculta from '../assets/images/miniaturas/MiniaturaCasaOculta.webp';
import miniaturaAguaConSal from '../assets/images/miniaturas/MiniaturaAguaConSal.webp';
import miniaturaCuarzoCafe from '../assets/images/miniaturas/MiniaturaCuarzoCafe.webp';

export interface ProjectInfo {
  label: string;
  value: string;
}

export interface ProjectImage {
  url: string;
  caption: string;
  halfWidth?: boolean;
  thirdWidth?: boolean;
  quarterWidth?: boolean;
  autoHeight?: boolean;
  hideOnMobile?: boolean;
  scaleDown?: boolean;
  isCarousel?: boolean;
  isHeroLogo?: boolean;
  largePortrait?: boolean;
  keepLogoColors?: boolean; // hero logo keeps its own colors instead of turning white
  youtubeId?: string; // YouTube video (shown in a window with the colorful play / sound buttons); url can stay ''
  previewSeconds?: number; // YouTube: how many final seconds loop as the thumbnail before play (default 5)
  rowOfThree?: boolean;
}

export interface ProjectData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  category: 'EDITORIAL' | 'ILUSTRACIÓN' | 'BRANDING';
  info: ProjectInfo[];
  images: ProjectImage[];
  noFeatured?: boolean;
  singleFeatured?: boolean;
  primaryColor?: string;
  navBgColor?: string;
  navTextColor?: string;
  bannerColor?: string; // banner background (falls back to primaryColor, then the category color)
  bannerTextColor?: string; // banner title color when there is no logo
  thumbnail?: string;
  thumbnailFit?: 'cover' | 'contain';
  sideIcon?: string; // optional override of the category key shown next to the description
}
export const projectsData: ProjectData[] = [
  {
    id: 1,
    thumbnail: miniaturaJardinDelTiempo,
    bannerColor: '#C9ECE8', // verde menta claro, más azul que verde
    title: 'Jardin del Tiempo',
    subtitle: 'MAPA DE LAURELES',
    category: 'EDITORIAL',
    description: 'Se construye desde la idea de dualidad: un lugar donde\nconviven memoria y proyección, siendo un jardín donde hay\nun puente entre el pasado y el futuro. A través de recorridos\ny puntos clave, se ve el encuentro entre lo que permanece\ny lo que ha cambiado con el tiempo.',
    info: [
      { label: 'PROYECTO ACADÉMICO', value: '2025' },
      { label: 'CRÉDITOS', value: 'DG. Sofía Alzate, DG. Sofía Restrepo, DG. Ana Sofía Patiño, DG. Valentina Arbeláez' }
    ],
    images: [
      { url: jardinLogo, caption: '', isHeroLogo: true, keepLogoColors: true },
      { url: mapa1, caption: 'Tiro' },
      { url: mapa2, caption: 'Retiro' },
      { url: mapa1, caption: 'Detalle Tiro', hideOnMobile: true },
      { url: mapa2, caption: 'Detalle Retiro', hideOnMobile: true }
    ]
  },
  {
    id: 2,
    thumbnail: miniaturaMientrasTanto,
    thumbnailFit: 'cover',
    bannerColor: '#FCE9B8', // amarillo mantequilla claro, para que el logo café se lea
    title: 'Mientras tanto',
    subtitle: 'CREACIONES DE TIEMPO LIBRE',
    category: 'EDITORIAL',
    description: 'A la hora del tinto se me ocurrió que no todo lo que hago tiene que empezar con un proyecto, una entrega o una razón concreta.\n\n"Mientras tanto" reúne esas creaciones que aparecen entre una cosa y otra: ilustraciones, objetos, experimentos e ideas de mi tiempo libre.',
    info: [
      { label: 'PROYECTO PERSONAL', value: '2026' },
      { label: 'CRÉDITOS', value: 'Valentina Arbeláez' }
    ],
    noFeatured: true,
    images: [
      { url: mientrasTantoLogo, caption: '', isHeroLogo: true, keepLogoColors: true },
      { url: sonarContigo1, caption: 'Soñar contigo', largePortrait: true },
      { url: sonarContigo2, caption: 'Soñar contigo — patrón', largePortrait: true },
      { url: jardinEterno, caption: 'Jardín eterno', rowOfThree: true },
      { url: carrito, caption: 'Carrito', rowOfThree: true },
      { url: pesa, caption: 'Pesa', rowOfThree: true },
      { url: pueblitoPaisa, caption: 'Pueblito paisa' }
    ]
  },
  {
    id: 3,
    thumbnail: miniaturaRetroMotion,
    title: 'Retro Motion',
    subtitle: 'REVISTA DE CINE',
    category: 'EDITORIAL',
    description: 'Proyecto editorial que busca revivir la magia del cine en su era dorada, potenciando los estilos que se usaban antes en tipografía e ilustración, mezclándolos con temas, tendencias y filmes de la actualidad.',
    info: [
      { label: 'PROYECTO ACADÉMICO', value: '2025' },
      { label: 'CRÉDITOS', value: 'DG. Sofía Medina, DG. Sofía Álvarez, DG. Sofía Restrepo, DG. Valentina Arbeláez' }
    ],
    images: [
      { url: retro1, caption: 'Portada' },
      { url: retroContra, caption: 'Contraportada' },
      { url: retro2, caption: 'Orquesta de ensueño - Interior' }
    ]
  },

  {
    id: 5,
    thumbnail: miniaturaIdeasAlAzar,
    bannerColor: '#FFD6E0', // rosa claro
    title: 'Ideas Al Azar',
    subtitle: 'ABRAZA LO COTIDIANO',
    category: 'ILUSTRACIÓN',
    description: 'Ideas al azar habla sobre cómo el jugar con lo cotidiano y explorar con lo que te rodea logra que disfrutes más la forma en la que ves el mundo, sobre todo como diseñador.',
    info: [
      { label: 'PROYECTO ACADÉMICO', value: '2024' },
      { label: 'CRÉDITOS', value: 'Valentina Arbeláez' }
    ],
    images: [
      { url: ideasLogo, caption: '', isHeroLogo: true, keepLogoColors: true },
      { url: ideas1, caption: 'Póster Ideas al Azar' },
      { url: ideas2, caption: 'Manifiesto Tiro', largePortrait: true },
      { url: ideas3, caption: 'Manifiesto Retiro', largePortrait: true },
      { url: ideas4, caption: 'Botón Ideas al Azar', halfWidth: true, autoHeight: true },
      { url: ideas5, caption: 'Botón Abraza Lo Cotidiano', halfWidth: true, autoHeight: true }
    ]
  },
  {
    id: 6,
    thumbnail: miniaturaHogar,
    bannerColor: '#CFE4FA', // azul claro
    bannerTextColor: '#1A365D',
    title: 'Hogar',
    subtitle: 'DESTELLOS DE NOSTALGIA',
    category: 'ILUSTRACIÓN',
    description: 'Explora la nostalgia del hogar pasado mediante ilustraciones que reconstruyen escenas y objetos desde la memoria, evocando refugio, pertenencia e intimidad.',
    info: [
      { label: 'PROYECTO PERSONAL', value: '2025' },
      { label: 'CRÉDITOS', value: 'Valentina Arbeláez' }
    ],
    noFeatured: true,
    images: [
      { url: hogarLogo, caption: '', isHeroLogo: true, keepLogoColors: true },
      { url: hogar1, caption: 'Casa nostalgia 1', halfWidth: true, autoHeight: true },
      { url: hogar2, caption: 'Casa nostalgia 2', halfWidth: true, autoHeight: true },
      { url: hogarModeloPapel, caption: 'Modelo en papel' },
      // Fanzine: a single caption under the middle image, so it reads as the caption of the whole row
      { url: hogarPoster1, caption: '', rowOfThree: true },
      { url: hogarPoster2, caption: 'Ilustraciones de fanzine', rowOfThree: true },
      { url: hogarPoster3, caption: '', rowOfThree: true }
    ]
  },
  {
    id: 7,
    thumbnail: miniaturaAlmaCotidiana,
    bannerColor: '#F8C3B0', // rosa salmón
    bannerTextColor: '#8C182B',
    title: 'Alma cotidiana',
    subtitle: 'AGENDA',
    category: 'ILUSTRACIÓN',
    description: 'Agenda ilustrada diseñada como acompañamiento emocional. Utiliza símbolos naturales, flores y elementos celestes para crear un ambiente íntimo que invita a la consciencia diaria.',
    info: [
      { label: 'PROYECTO PERSONAL', value: '2024' },
      { label: 'CRÉDITOS', value: 'Valentina Arbeláez' }
    ],
    noFeatured: true,
    images: [
      { url: alma1, caption: 'Diseño de portada e interior', halfWidth: true, autoHeight: true },
      { url: alma2, caption: 'Diseño de pájaros', halfWidth: true, autoHeight: true },
      { url: alma3, caption: 'Separador de agenda' }
    ]
  },
  {
    id: 8,
    thumbnail: miniaturaCorcovado,
    title: 'Corcovado',
    subtitle: 'LICORES ARTESANALES',
    category: 'BRANDING',
    description: 'Marca de licores artesanales de La Ceja, Antioquia. Su concepto gira en torno al uso de sabores e ingredientes locales para crear bebidas únicas con un profundo sentido de pertenencia.',
    primaryColor: '#a1184c',
    navBgColor: '#C4E1FF', /* Light blue */
    navTextColor: '#0E2D4F', /* Deep blue text for contrast */
    info: [
      { label: 'PROYECTO COMERCIAL', value: '2026' },
      { label: 'CRÉDITOS', value: 'Valentina Arbeláez' }
    ],
    noFeatured: true,
    images: [
      { url: corcovadoLogo, caption: '', isHeroLogo: true },
      { url: corcovadoCervezaMockup, caption: 'Cerveza Oatmeal Stout', rowOfThree: true },
      { url: corcovadoHidromielMockup, caption: 'Hidromiel', rowOfThree: true },
      { url: corcovadoVinoMockup, caption: 'Vino de mora', rowOfThree: true },
      { url: infoCorcovado, caption: 'Infografía' },
      { url: corcovadoSixPackPendon, caption: 'Six pack y pendón', halfWidth: true },
      { url: corcovadoSixPack, caption: 'Troquel six pack', halfWidth: true },
      { url: corcovadoPortavinos, caption: 'Portavinos', largePortrait: true },
      { url: '', youtubeId: 'C-6D4srVfb4', previewSeconds: 10, caption: 'Presentación de la marca' }
    ]
  },
  {
    id: 9,
    thumbnail: miniaturaCasaOculta,
    thumbnailFit: 'cover',
    title: 'Casa Oculta',
    subtitle: 'CASA DE CULTO\nAL DISEÑO',
    category: 'BRANDING',
    primaryColor: '#A00028',
    navBgColor: '#FFC4D9',
    navTextColor: '#A00028',
    description: 'Concebida como una casa de culto al diseño, esta marca de ropa encuentra su inspiración en la riqueza visual de nuestro entorno. Su identidad fusiona colores vibrantes, exploración de texturas y elementos surrealistas, transformándose en un viaje de nostalgia que revive nuestra memoria compartida.',
    info: [
      { label: 'PROYECTO PERSONAL', value: '2026' },
      { label: 'CRÉDITOS', value: 'Valentina Arbeláez' }
    ],
    noFeatured: true,
    images: [
      { url: casaOcultaLogo, caption: '', isHeroLogo: true },
      { url: casaOculta1, caption: 'Bolsa ilustrada', thirdWidth: true },
      { url: casaOculta1_2, caption: 'Bolsa foil', thirdWidth: true, scaleDown: true },
      { url: casaOcultaVideo1, caption: 'Video de campaña 1', halfWidth: true },
      { url: casaOcultaVideo2, caption: 'Video de campaña 2', halfWidth: true },
      { url: casaOcultaCarousel1, caption: 'Publicación 1', quarterWidth: true },
      { url: casaOcultaCarousel2, caption: 'Publicación 2', quarterWidth: true },
      { url: casaOcultaCarousel4, caption: 'Publicación 3', quarterWidth: true },
      { url: casaOcultaCarousel5, caption: 'Lanzamiento Drop 01', quarterWidth: true }
    ]
  },
  {
    id: 10,
    thumbnail: miniaturaAguaConSal,
    thumbnailFit: 'cover',
    title: 'Agua con sal',
    subtitle: 'UNIVERSO DE AGUA SALADA',
    category: 'BRANDING',
    primaryColor: '#C4E1FF',
    navBgColor: '#0E2D4F',
    navTextColor: '#FFF',
    description: 'Marca de repostería inspirada en la estética vintage y sentimientos familiares, rescatando lo tradicional a través\nde sabores reconfortantes y una presentación cuidada.',
    info: [
      { label: 'PROYECTO PERSONAL', value: '2026' },
      { label: 'CRÉDITOS', value: 'DG. Sofía Mendoza, DG. Sofía Restrepo, DG. Ana Sofía Patiño, DG. Valentina Arbeláez' }
    ],
    noFeatured: true,
    images: [
      { url: aguaConSalLogo, caption: '', isHeroLogo: true },
      { url: aguaConSalBolso, caption: 'Bolso', largePortrait: true },
      { url: aguaConSalFromShore, caption: 'From shore to sea', largePortrait: true },
      { url: aguaConSalTags, caption: 'Marquillas', halfWidth: true },
      { url: aguaConSalEtiquetas, caption: 'Empaque marquillas', halfWidth: true },
      { url: aguaConSalBolsitos, caption: 'Estuches' }
    ]
  },
  {
    id: 11,
    thumbnail: miniaturaCuarzoCafe,
    title: 'Cuarzo Café',
    subtitle: 'CAFÉ DE ESPECIALIDAD',
    category: 'BRANDING',
    primaryColor: '#4A154B',
    navBgColor: '#C4E1FF',
    navTextColor: '#0E2D4F',
    description: 'Café de especialidad en El Retiro. Nace desde la historia del lugar y el amor de sus dueños hacia ella, buscando transmitir esta conexión y herencia a través del arte del café.',
    info: [
      { label: 'PROYECTO COMERCIAL', value: '2026' },
      { label: 'CRÉDITOS', value: 'Valentina Arbeláez' }
    ],
    noFeatured: true,
    images: [
      { url: cuarzoCafeLogo, caption: '', isHeroLogo: true },
      { url: cuarzoBolsas, caption: 'Bolsas de café' },
      { url: infoCuarzo, caption: 'Infografía' },
      { url: cuarzoCajaTrilogia, caption: 'Caja Trilogía del Cuarzo', halfWidth: true },
      { url: cuarzoCapsulas, caption: 'Cápsulas de café', halfWidth: true },
      { url: cuarzoCamisa, caption: 'Camisa', halfWidth: true },
      { url: cuarzoDisenoCamisa, caption: 'Diseño de camisa', halfWidth: true },
      { url: '', youtubeId: 'yzUlqLF_Zr4', caption: 'Presentación de la marca' }
    ]
  }
];

// Key stamp shown next to the description on every project page, one per category
const categoryKeyIcons: Record<ProjectData['category'], string> = {
  'EDITORIAL': llaveRosada,
  'ILUSTRACIÓN': llaveAzul,
  'BRANDING': llaveVerde
};

export const getProjectSideIcon = (project: ProjectData) => project.sideIcon ?? categoryKeyIcons[project.category];

export const projectCategories: { key: ProjectData['category']; label: string; sectionId: string }[] = [
  { key: 'ILUSTRACIÓN', label: 'Ilustración', sectionId: 'proyectos-ilustracion' },
  { key: 'BRANDING', label: 'Branding', sectionId: 'proyectos-branding' },
  { key: 'EDITORIAL', label: 'Editorial', sectionId: 'proyectos-editorial' }
];

export const getCategorySectionId = (category: string) =>
  projectCategories.find(c => c.key === category.toUpperCase())?.sectionId;
