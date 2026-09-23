import React from 'react';
import './Decorations.css';

export type ShapeType = 'sparkle' | 'asterisk' | 'flower' | 'starburst' | 'roundedFlower' | 'burst' | 'horseshoe' | 'domino';

interface ShapeDecorationProps {
  type: ShapeType;
  color?: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ShapeDecoration: React.FC<ShapeDecorationProps> = ({ 
  type, 
  color = '#000', 
  size = 50, 
  className = '', 
  style = {} 
}) => {
  const getPath = () => {
    switch (type) {
      case 'sparkle':
        return <path d="M50 5 C50 45, 55 50, 95 50 C55 50, 50 55, 50 95 C50 55, 45 50, 5 50 C45 50, 50 45, 50 5 Z" fill={color} />;
      case 'asterisk':
        return (
          <>
            <path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22 M35 12 L65 88 M65 12 L35 88 M12 35 L88 65 M12 65 L88 35" stroke={color} strokeWidth="4" strokeLinecap="round" />
            <circle cx="50" cy="50" r="5" fill={color} />
          </>
        );
      case 'flower':
        return (
          <path d="M50 50 C30 10, 70 10, 50 50 C90 30, 90 70, 50 50 C70 90, 30 90, 50 50 C10 70, 10 30, 50 50 Z" fill={color} />
        );
      case 'roundedFlower':
        return (
          <>
            <circle cx="35" cy="35" r="22" fill={color} />
            <circle cx="65" cy="35" r="22" fill={color} />
            <circle cx="35" cy="65" r="22" fill={color} />
            <circle cx="65" cy="65" r="22" fill={color} />
            <circle cx="50" cy="50" r="18" fill={color} />
          </>
        );
      case 'burst':
        return (
          <path d="M50 5 L58 35 L90 28 L72 50 L90 72 L58 65 L50 95 L42 65 L10 72 L28 50 L10 28 L42 35 Z" fill={color} />
        );
      case 'starburst':
        return (
          <path d="M50 5 Q55 35 95 50 Q55 65 50 95 Q45 65 5 50 Q45 35 50 5 Z" fill={color} />
        );
      case 'horseshoe':
        return (
          <>
            {/* Main horseshoe body */}
            <path 
              d="M 30 15 
                 C 10 15,  5 45, 10 65 
                 C 20 100, 80 100, 90 65 
                 C 95 45, 90 15, 70 15 
                 C 60 15, 65 30, 65 40 
                 C 65 75, 35 75, 35 40 
                 C 35 30, 40 15, 30 15 Z" 
              fill={color} 
            />
            {/* Little stars/nails inside */}
            <circle cx="20" cy="45" r="2.5" fill="#FFF" opacity="0.8" />
            <circle cx="23" cy="65" r="2.5" fill="#FFF" opacity="0.8" />
            <circle cx="36" cy="81" r="2.5" fill="#FFF" opacity="0.8" />
            <circle cx="64" cy="81" r="2.5" fill="#FFF" opacity="0.8" />
            <circle cx="77" cy="65" r="2.5" fill="#FFF" opacity="0.8" />
            <circle cx="80" cy="45" r="2.5" fill="#FFF" opacity="0.8" />
            
            <path d="M 28 25 L 30 30 L 35 30 L 31 34 L 33 39 L 28 36 L 23 39 L 25 34 L 21 30 L 26 30 Z" fill="#FDE292" />
            <path d="M 72 25 L 74 30 L 79 30 L 75 34 L 77 39 L 72 36 L 67 39 L 69 34 L 65 30 L 70 30 Z" fill="#FDE292" />
          </>
        );
      case 'domino':
        return (
          <>
            {/* Domino tile: color = tile, dark outline and red pips */}
            <rect x="27" y="5" width="46" height="90" rx="9" fill={color} stroke="#2B1B1B" strokeWidth="3" />
            <line x1="32" y1="50" x2="68" y2="50" stroke="#2B1B1B" strokeWidth="3" strokeLinecap="round" />
            <circle cx="39" cy="17" r="4.5" fill="#D32F2F" />
            <circle cx="50" cy="28" r="4.5" fill="#D32F2F" />
            <circle cx="61" cy="39" r="4.5" fill="#D32F2F" />
            <circle cx="39" cy="62" r="4.5" fill="#D32F2F" />
            <circle cx="61" cy="62" r="4.5" fill="#D32F2F" />
            <circle cx="39" cy="83" r="4.5" fill="#D32F2F" />
            <circle cx="61" cy="83" r="4.5" fill="#D32F2F" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={`shape-decoration ${className}`} 
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      {getPath()}
    </svg>
  );
};
