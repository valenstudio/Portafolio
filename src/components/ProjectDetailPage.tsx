import React from 'react';
import { motion } from 'framer-motion';
import './ProjectDetailPage.css';
import { projectsData, getProjectSideIcon } from '../data/projects';
import { ShapeDecoration, type ShapeType } from './Decorations';

const TransitionVideo: React.FC<{ src: string }> = ({ src }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const isResetting = React.useRef(false);

  const handleTimeUpdate = () => {
    if (!videoRef.current || isResetting.current) return;
    const video = videoRef.current;
    
    // If we are within 0.15 seconds of the end, restart to avoid the black frame
    if (video.duration && video.currentTime >= video.duration - 0.15) {
      isResetting.current = true;
      video.currentTime = 0;
      video.play().then(() => {
        // Small delay before allowing another reset to prevent double triggers
        setTimeout(() => { isResetting.current = false; }, 500);
      }).catch(e => {
        console.error(e);
        isResetting.current = false;
      });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <video 
        ref={videoRef}
        src={src} 
        autoPlay 
        muted 
        playsInline
        onTimeUpdate={handleTimeUpdate}
        style={{ 
          width: '100%', 
          height: '100%',
          objectFit: 'contain',
          display: 'block', 
          borderRadius: 'inherit'
        }} 
      />
    </div>
  );
};

const categoryBannerColors: Record<string, string> = {
  'EDITORIAL': '#8C182B',
  'ILUSTRACIÓN': '#1A365D',
  'BRANDING': '#A00028'
};

// ---- Floating shapes on the banner (same shapes used around the site) ----
type BannerDeco = { type: ShapeType; color: string; size: number; anim: string; pos: React.CSSProperties; rotate?: number };

const isLightColor = (hex: string) => {
  const h = hex.replace('#', '');
  if (h.length !== 6) return false;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b > 170;
};

const getBannerDecorations = (projectId: number, lightBanner: boolean): BannerDeco[] => {
  // Ideas al Azar: floating dominoes
  if (projectId === 5) {
    return [
      { type: 'domino', color: '#FDE292', size: 110, anim: 'float-anim-1', pos: { top: '12%', left: '9%' }, rotate: -20 },
      { type: 'domino', color: '#FFF6EC', size: 95, anim: 'float-anim-2', pos: { top: '50%', right: '9%' }, rotate: 28 },
      { type: 'domino', color: '#C4E1FF', size: 75, anim: 'float-anim-3', pos: { top: '60%', left: '20%' }, rotate: 70 },
      { type: 'sparkle', color: '#E0457B', size: 50, anim: 'float-anim-2', pos: { top: '16%', right: '20%' } }
    ];
  }
  // Pastel shapes on dark banners, stronger colors on light banners so they still show
  const c = lightBanner
    ? { sparkle: '#F5B301', asterisk: '#E0457B', flower: '#3B82F6', burst: '#10B981' }
    : { sparkle: '#FDE292', asterisk: '#FFC4D9', flower: '#C4E1FF', burst: '#E5F487' };
  return [
    { type: 'sparkle', color: c.sparkle, size: 70, anim: 'float-anim-1', pos: { top: '14%', left: '8%' } },
    { type: 'asterisk', color: c.asterisk, size: 80, anim: 'spin-anim', pos: { top: '60%', left: '15%' } },
    { type: 'flower', color: c.flower, size: 64, anim: 'float-anim-2', pos: { top: '16%', right: '13%' } },
    { type: 'burst', color: c.burst, size: 90, anim: 'pulse-rotate', pos: { top: '55%', right: '6%' } }
  ];
};

// YouTube video in a window with the colorful controls: play / pause, sound on / off and a volume slider.
// The buttons talk to the YouTube player through postMessage (enablejsapi=1), so no extra script is needed.
// Before someone clicks play, the last seconds of the video (5 by default) loop silently as a moving thumbnail.
// Whenever YouTube is loading / jumping (black frame, spinner), a veil with the video's image covers it.

const YouTubeVideo: React.FC<{ videoId: string; title: string; previewSeconds?: number }> = ({ videoId, title, previewSeconds = 5 }) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  // 'preview': silent loop of the ending · 'full': the real video, from the start
  const [mode, setMode] = React.useState<'preview' | 'full'>('preview');
  const modeRef = React.useRef<'preview' | 'full'>('preview');
  const [playing, setPlaying] = React.useState(false); // the real video is playing
  const [muted, setMuted] = React.useState(false); // clicking play starts it with sound
  const [volume, setVolume] = React.useState(70); // YouTube volume goes from 0 to 100
  // Veil: covers the player until the picture is really moving at the right spot
  const [waiting, setWaiting] = React.useState(true);
  const [buffering, setBuffering] = React.useState(false);

  const durationRef = React.useRef(0);
  const previewStartRef = React.useRef(0);
  const seekedRef = React.useRef(false);
  const stateRef = React.useRef(-1);
  const waitTargetRef = React.useRef<number | null>(null); // time the player has to pass before the veil lifts
  const pausedByUserRef = React.useRef(false);
  const bufferTimerRef = React.useRef<number | undefined>(undefined);
  const timersRef = React.useRef<number[]>([]);

  React.useEffect(() => () => {
    timersRef.current.forEach(t => clearTimeout(t));
    clearTimeout(bufferTimerRef.current);
  }, []);

  const send = React.useCallback((func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args }), '*');
  }, []);

  // Cover the player until it has played a little past `time`
  const waitUntilPast = React.useCallback((time: number) => {
    waitTargetRef.current = time;
    setWaiting(true);
  }, []);

  const restartPreview = React.useCallback(() => {
    send('seekTo', [previewStartRef.current, true]);
    send('playVideo');
  }, [send]);

  React.useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.source !== iframeRef.current?.contentWindow || typeof e.data !== 'string') return;
      let info: { duration?: number; currentTime?: number; playerState?: number; muted?: boolean } | undefined;
      try {
        info = JSON.parse(e.data)?.info;
      } catch {
        return; // not a YouTube message
      }
      if (!info || typeof info !== 'object') return;

      if (typeof info.duration === 'number' && info.duration > 0) {
        durationRef.current = info.duration;
        previewStartRef.current = Math.max(0, info.duration - previewSeconds);
      }

      if (typeof info.playerState === 'number') {
        stateRef.current = info.playerState;
        // Short loading hiccups are ignored; longer ones get covered
        if (info.playerState === 3) {
          clearTimeout(bufferTimerRef.current);
          bufferTimerRef.current = window.setTimeout(() => setBuffering(true), 250);
        } else {
          clearTimeout(bufferTimerRef.current);
          setBuffering(false);
        }
      }

      const t = info.currentTime;
      // Lift the veil once the video is really moving past the point we jumped to
      if (typeof t === 'number' && waitTargetRef.current !== null) {
        const target = waitTargetRef.current;
        if (t >= target + 0.25 && t < target + 4) {
          waitTargetRef.current = null;
          setWaiting(false);
        }
      }

      const duration = durationRef.current;

      if (modeRef.current === 'preview') {
        // Jump to the last seconds as soon as we know how long the video is
        if (duration > 0 && !seekedRef.current) {
          seekedRef.current = true;
          send('mute');
          waitUntilPast(previewStartRef.current);
          restartPreview();
          return;
        }
        if (!seekedRef.current) return;
        if (typeof t === 'number' && waitTargetRef.current === null) {
          // Loop: back to the start of the ending when it reaches the end (or slipped before it)
          if (t >= duration - 0.3 || t < previewStartRef.current - 1) restartPreview();
        }
        if (info.playerState === 0) restartPreview();
        return;
      }

      // Real video
      if (info.playerState === 1) setPlaying(true);
      else if (info.playerState === 2) setPlaying(false);
      else if (info.playerState === 0) {
        // Finished: go back to the silent ending loop
        modeRef.current = 'preview';
        setMode('preview');
        setPlaying(false);
        send('mute');
        waitUntilPast(previewStartRef.current);
        restartPreview();
      }
      if (typeof info.muted === 'boolean') setMuted(info.muted);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [send, restartPreview, waitUntilPast, previewSeconds]);

  const handleLoad = () => {
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: videoId }), '*');
  };

  const startFull = () => {
    modeRef.current = 'full';
    setMode('full');
    pausedByUserRef.current = false;
    waitUntilPast(0);
    send('seekTo', [0, true]);
    if (!muted) {
      send('unMute');
      send('setVolume', [volume]);
    }
    send('playVideo');
    setPlaying(true);
    // If the browser blocks sound (some phones), play it muted instead
    timersRef.current.push(window.setTimeout(() => {
      if (modeRef.current === 'full' && stateRef.current !== 1 && !pausedByUserRef.current) {
        send('mute');
        send('playVideo');
        setMuted(true);
        setPlaying(true);
      }
    }, 1500));
    // Safety net: never keep the veil forever if the player stops reporting
    timersRef.current.push(window.setTimeout(() => {
      if (modeRef.current === 'full' && waitTargetRef.current === 0) {
        waitTargetRef.current = null;
        setWaiting(false);
      }
    }, 5000));
  };

  const togglePlay = () => {
    if (modeRef.current === 'preview') {
      startFull();
      return;
    }
    if (playing) {
      pausedByUserRef.current = true;
      send('pauseVideo');
      setPlaying(false);
    } else {
      send('playVideo');
      setPlaying(true);
    }
  };

  const toggleMute = () => {
    const inFull = modeRef.current === 'full';
    if (muted) {
      const level = volume > 0 ? volume : 70;
      if (inFull) {
        send('unMute');
        send('setVolume', [level]);
      }
      setVolume(level);
      setMuted(false);
    } else {
      if (inFull) send('mute');
      setMuted(true);
    }
  };

  const changeVolume = (value: number) => {
    if (modeRef.current === 'full') {
      send('setVolume', [value]);
      send(value === 0 ? 'mute' : 'unMute');
    }
    setVolume(value);
    setMuted(value === 0);
  };

  const shownVolume = muted ? 0 : volume;
  const params = new URLSearchParams({
    autoplay: '1', // only the silent ending loop plays by itself
    mute: '1',
    controls: '0',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    iv_load_policy: '3',
    disablekb: '1',
    enablejsapi: '1',
    origin: window.location.origin
  });

  const inPreview = mode === 'preview';
  // Veil over the player: while loading / jumping, and while the real video is paused
  const veiled = waiting || buffering || (!inPreview && !playing);
  const showPlayButton = inPreview || !playing;

  return (
    <div className="brand-video yt-video">
      <div className="yt-frame">
        {/* The iframe is taller than the window so YouTube's title bar (top) and logo (bottom) are cropped out,
            and it ignores the mouse so YouTube's hover overlays never appear */}
        <iframe
          ref={iframeRef}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          tabIndex={-1}
          onLoad={handleLoad}
        />
        <div
          className={`yt-veil ${veiled ? '' : 'is-hidden'}`}
          style={{ backgroundImage: `url(https://i.ytimg.com/vi/${videoId}/hqdefault.jpg)` }}
          aria-hidden="true"
        />
        {/* Clicking the video plays / pauses it */}
        <div className="yt-click-layer" onClick={togglePlay} aria-hidden="true" />
        {showPlayButton && (
          <button
            type="button"
            className={`yt-cover ${inPreview && !veiled ? 'is-preview' : ''}`}
            onClick={togglePlay}
            aria-label="Reproducir video"
          >
            <span className="yt-cover-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="30" height="30">
                <path d="M8 5.5v13a1 1 0 0 0 1.5.87l10-6.5a1 1 0 0 0 0-1.74l-10-6.5A1 1 0 0 0 8 5.5z" fill="currentColor" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <div className="brand-video-controls">
        <button
          type="button"
          className="bv-btn bv-play"
          onClick={togglePlay}
          aria-label={playing && !inPreview ? 'Pausar video' : 'Reproducir video'}
        >
          {playing && !inPreview ? (
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1.5" fill="currentColor" />
              <rect x="14" y="5" width="4" height="14" rx="1.5" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M8 5.5v13a1 1 0 0 0 1.5.87l10-6.5a1 1 0 0 0 0-1.74l-10-6.5A1 1 0 0 0 8 5.5z" fill="currentColor" />
            </svg>
          )}
        </button>
        <button
          type="button"
          className="bv-btn bv-sound"
          onClick={toggleMute}
          aria-label={muted ? 'Activar sonido' : 'Silenciar'}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
            {muted ? (
              <>
                <line x1="16" y1="9.5" x2="21" y2="14.5" />
                <line x1="21" y1="9.5" x2="16" y2="14.5" />
              </>
            ) : (
              <>
                <path d="M15.5 9a4 4 0 0 1 0 6" />
                <path d="M18 6.5a7.5 7.5 0 0 1 0 11" />
              </>
            )}
          </svg>
        </button>
        <input
          type="range"
          className="bv-volume"
          min={0}
          max={100}
          step={5}
          value={shownVolume}
          onChange={e => changeVolume(Number(e.target.value))}
          style={{ '--vol': `${shownVolume}%` } as React.CSSProperties}
          aria-label="Volumen"
        />
      </div>
    </div>
  );
};

interface ProjectDetailPageProps {
  id: number;
  onProjectClick: (id: number) => void;
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ id, onProjectClick }) => {
  const project = projectsData.find(p => p.id === id);

  // Category key stamp: sits right next to the description and matches its height
  const descRef = React.useRef<HTMLDivElement>(null);
  const [descHeight, setDescHeight] = React.useState<number | null>(null);
  const sideIcon = project ? getProjectSideIcon(project) : undefined;

  React.useEffect(() => {
    const el = descRef.current;
    if (!el || !sideIcon) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const h = Math.round(el.offsetHeight);
        setDescHeight(prev => (prev !== null && Math.abs(prev - h) <= 1 ? prev : h));
      });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [sideIcon, id]);
  
  // Navigation logic
  const categoryProjects = projectsData.filter(p => p.category === project?.category);
  const currentIndex = categoryProjects.findIndex(p => p.id === id);
  
  const prevProject = categoryProjects[(currentIndex - 1 + categoryProjects.length) % categoryProjects.length];
  const nextProject = categoryProjects[(currentIndex + 1) % categoryProjects.length];

  if (!project) {
    return <div className="project-detail-page">Proyecto no encontrado</div>;
  }

  const heroLogoImg = project.images.find(img => img.isHeroLogo);
  // Banner color: the project's own color (Branding) or its category color (Editorial / Ilustración)
  const bannerColor = project.bannerColor ?? project.primaryColor ?? categoryBannerColors[project.category];
  const bannerDecorations = getBannerDecorations(project.id, isLightColor(bannerColor));
  const regularImages = project.images.filter(img => !img.isHeroLogo);
  const featuredImages = regularImages.slice(0, project.category === 'EDITORIAL' && !project.singleFeatured ? 2 : 1);
  const secondaryImages = regularImages.slice(project.noFeatured ? 0 : (project.category === 'EDITORIAL' && !project.singleFeatured ? 2 : 1));

  // Helper to render title with potential breaks
  const renderTitle = (title: string) => {
    return title.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < title.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div 
      className={`project-detail-page project-id-${project.id}`}
      style={project.primaryColor ? { '--color-primary': project.primaryColor } as React.CSSProperties : undefined}
    >
      {/* Banner for every project: logo when there is one, otherwise the project title */}
      <div
        className="hero-logo-banner-top"
        style={{ '--banner-bg': bannerColor, '--banner-text': project.bannerTextColor } as React.CSSProperties}
      >
        {bannerDecorations.map((d, i) => (
          <div
            key={i}
            className="banner-deco"
            style={{ ...d.pos, '--r': `${d.rotate ?? 0}deg` } as React.CSSProperties}
            aria-hidden="true"
          >
            <ShapeDecoration type={d.type} color={d.color} size={d.size} className={d.anim} />
          </div>
        ))}
        {heroLogoImg ? (
          <img
            src={heroLogoImg.url}
            alt={`${project.title} logo`}
            className={`hero-logo-banner-img ${heroLogoImg.keepLogoColors ? 'keep-colors' : ''}`}
          />
        ) : (
          <h1 className="hero-banner-title">{renderTitle(project.title)}</h1>
        )}
        {project.id === 8 && (
          <svg viewBox="-8 -8 116 116" className="corcovado-star-decorator" aria-hidden="true">
            <path d="M 50 5 L 60 30 L 90 20 L 70 45 L 95 65 L 65 65 L 75 95 L 50 75 L 20 95 L 35 65 L 5 60 L 30 45 L 10 20 L 40 30 Z" fill="#C4E1FF" stroke="#FFFFFF" strokeWidth="7" strokeLinejoin="round" paintOrder="stroke" />
          </svg>
        )}
      </div>

      <div className="detail-container horizontal-layout">
        {/* Horizontal Header */}
        <div className="detail-header-horizontal">
          <div className={`header-columns ${sideIcon ? 'has-side-icon' : ''}`}>
            {sideIcon && (
              <div className="header-icon-col">
                <img
                  src={sideIcon}
                  alt=""
                  aria-hidden="true"
                  className="project-side-icon"
                  style={descHeight ? { height: `${descHeight}px` } : undefined}
                />
              </div>
            )}
            
            <div className="header-right-col">
              <div className="desc-section" ref={descRef}>
                <h2 className="project-subtitle-large">{renderTitle(project.subtitle)}</h2>
                <div className="project-meta-list">
                  {project.info.filter(item => item.label !== 'CRÉDITOS').map((item, idx) => (
                    <motion.div 
                      key={idx} 
                      className="project-meta"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <span className="meta-star">*</span>
                      <span className="meta-text">{item.label} — {item.value}</span>
                    </motion.div>
                  ))}
                </div>
                {/* Description Block */}
                {project.description && (
                  <motion.p 
                    className="project-description-large"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                  >
                    {project.description}
                  </motion.p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="detail-main">
          <div className="project-images-stack">
            {/* Featured Images */}
            {!project.noFeatured && (
              <div className={`images-featured-group ${project.category !== 'EDITORIAL' || project.singleFeatured ? 'single-featured' : ''}`}>
                {featuredImages.map((img, index) => (
                  <div key={`feat-${index}`} className="image-featured">
                    {img.youtubeId ? (
                      <YouTubeVideo videoId={img.youtubeId} previewSeconds={img.previewSeconds} title={`${project.title} — ${img.caption || 'video'}`} />
                    ) : img.url.toLowerCase().match(/\.(mp4|mov|webm)$/) ? (
                      <TransitionVideo src={img.url} />
                    ) : (
                      <motion.img 
                        src={img.url} 
                        alt={img.caption || `${project.title} imagen destacada ${index + 1}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.03, rotate: index % 2 === 0 ? 1 : -1 }}
                      />
                    )}
                    {img.caption && <span className="image-caption">{img.caption}</span>}
                  </div>
                ))}
              </div>
            )}

            {/* Secondary Spreads/Internal Pages */}
            {secondaryImages.length > 0 && (
              <div className="images-grid">
                {(() => {
                  const groupedImages: any[] = [];
                  let currentCarouselGroup: any[] = [];
                  
                  secondaryImages.forEach((img, idx) => {
                    if (img.isCarousel) {
                      currentCarouselGroup.push({ img, originalIndex: idx });
                    } else {
                      if (currentCarouselGroup.length > 0) {
                        groupedImages.push({ type: 'carousel', items: currentCarouselGroup });
                        currentCarouselGroup = [];
                      }
                      groupedImages.push({ type: 'single', img, originalIndex: idx });
                    }
                  });
                  if (currentCarouselGroup.length > 0) {
                    groupedImages.push({ type: 'carousel', items: currentCarouselGroup });
                  }
                  
                  return groupedImages.map((group, gIdx) => {
                    if (group.type === 'single') {
                      const { img, originalIndex } = group;
                      return (
                        <div key={`spread-${originalIndex}`} className={`image-spread ${img.halfWidth ? 'half-width' : ''} ${img.thirdWidth ? 'third-width' : ''} ${img.quarterWidth ? 'quarter-width' : ''} ${img.autoHeight ? 'auto-height' : ''} ${img.hideOnMobile ? 'hide-on-mobile' : ''} ${img.scaleDown ? 'scale-down' : ''} ${img.largePortrait ? 'large-portrait' : ''} ${img.rowOfThree ? 'row-of-three' : ''}`}>
                          {img.youtubeId ? (
                            <YouTubeVideo videoId={img.youtubeId} previewSeconds={img.previewSeconds} title={`${project.title} — ${img.caption || 'video'}`} />
                          ) : img.url.toLowerCase().match(/\.(mp4|mov|webm)$/) ? (
                            <TransitionVideo src={img.url} />
                          ) : (
                            <motion.img 
                              src={img.url} 
                              alt={img.caption || `${project.title} imagen ${originalIndex + 1}`}
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                              whileHover={{ scale: 1.02 }}
                            />
                          )}
                          <span className="map-caption">{img.caption}</span>
                        </div>
                      );
                    } else {
                      return (
                        <div key={`carousel-${gIdx}`} className="carousel-group-container">
                          {group.items.map(({ img, originalIndex }: any, idx: number) => (
                            <div key={`c-item-${originalIndex}`} className={`carousel-item carousel-item-${idx}`}>
                              <img src={img.url} alt={img.caption || `Carousel image ${idx + 1}`} />
                            </div>
                          ))}
                        </div>
                      );
                    }
                  });
                })()}
              </div>
            )}
          </div>
        </div>
        
        {/* Navigation Arrows at the bottom */}
        <div className="project-navigation-bottom">
          <button 
            className="nav-arrow prev" 
            onClick={() => onProjectClick(prevProject.id)}
            title={`Anterior: ${prevProject.title}`}
          >
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <span className="nav-counter" style={{ color: 'var(--color-primary)', fontFamily: "'Ambit', sans-serif", fontSize: '1.2rem', fontWeight: 'bold' }}>
            {currentIndex + 1} / {categoryProjects.length}
          </span>

          <button 
            className="nav-arrow next" 
            onClick={() => onProjectClick(nextProject.id)}
            title={`Siguiente: ${nextProject.title}`}
          >
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
