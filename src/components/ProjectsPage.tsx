import React from 'react';
import { motion } from 'framer-motion';
import './ProjectsPage.css';
import { projectsData, projectCategories } from '../data/projects';
import { ShapeDecoration, type ShapeType } from './Decorations';

interface ProjectsPageProps {
  onProjectClick: (id: number) => void;
}

// Same palette as the category cards on the home page
// sectionBg: soft tint behind each whole section (solid, so the scalloped edge matches exactly)
const categoryStyles: Record<string, { bg: string; color: string; thumbBg: string; sectionBg: string; shape: ShapeType; shapeColor: string }> = {
  'EDITORIAL': { bg: '#FFF4F8', color: '#8C182B', thumbBg: '#FFD0DF', sectionBg: '#FFEFE4', shape: 'sparkle', shapeColor: '#FFC4D9' },
  'ILUSTRACIÓN': { bg: '#F0F7FF', color: '#1A365D', thumbBg: '#DCE9FF', sectionBg: '#E9EEFA', shape: 'flower', shapeColor: '#C4E1FF' },
  'BRANDING': { bg: '#FDFEEB', color: '#2E4D2B', thumbBg: '#F1F5BA', sectionBg: '#F9F9D1', shape: 'burst', shapeColor: '#E5F487' }
};

const ProjectsPage: React.FC<ProjectsPageProps> = ({ onProjectClick }) => {
  return (
    <div className="home-page projects-overview">
      {projectCategories.map((category, catIndex) => {
        const style = categoryStyles[category.key];
        const projects = projectsData.filter(p => p.category === category.key);

        return (
          <section
            key={category.key}
            id={category.sectionId}
            className="projects-category-section"
            style={{ '--section-bg': style.sectionBg } as React.CSSProperties}
          >
            <div className="projects-category-inner">
              <ShapeDecoration
                type={style.shape}
                color={style.shapeColor}
                size={70}
                className={`floating-shape ${catIndex % 2 === 0 ? 'float-anim-1' : 'float-anim-2'}`}
                style={{ top: catIndex % 2 === 0 ? '10px' : '30px', right: catIndex % 2 === 0 ? '4%' : '10%' }}
              />

              <h2 className="projects-category-title" style={{ color: style.color }}>
                {category.label}
                <span className="projects-category-asterisk">*</span>
              </h2>

              <div className="projects-tiles-grid">
                {projects.map((project, index) => (
                  <motion.button
                    key={project.id}
                    type="button"
                    className="project-tile"
                    style={{ '--tile-bg': style.bg, '--tile-color': style.color, '--tile-thumb-bg': style.thumbBg } as React.CSSProperties}
                    onClick={() => onProjectClick(project.id)}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    aria-label={`Ver proyecto ${project.title}`}
                  >
                    <div className="project-tile-inner">
                      <div className={`project-tile-thumb ${project.thumbnailFit === 'cover' ? 'fit-cover' : 'fit-contain'}`}>
                        {project.thumbnail && (
                          <img src={project.thumbnail} alt="" loading="lazy" />
                        )}
                      </div>
                      <div className="project-tile-info">
                        <span className="project-tile-title">{project.title}</span>
                        <span className="project-tile-number">({index < 9 ? '0' : ''}{index + 1})</span>
                      </div>
                      <span className="project-tile-subtitle">{project.subtitle.replace('\n', ' ')}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default ProjectsPage;
