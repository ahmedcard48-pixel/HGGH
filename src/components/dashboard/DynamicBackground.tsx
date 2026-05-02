import React from 'react';
import { useTheme } from '@/src/context/ThemeContext';

export const DynamicBackground: React.FC = () => {
  const { settings, primaryColorHex } = useTheme();
  const { backgroundBlur, backgroundType, backgroundImage } = settings;

  const getPrimaryColorWithOpacity = (opacity = 0.1) => {
    // Convert hex to rgba
    const r = parseInt(primaryColorHex.slice(1, 3), 16);
    const g = parseInt(primaryColorHex.slice(3, 5), 16);
    const b = parseInt(primaryColorHex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <div 
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none transition-all duration-1000 ease-in-out" 
      style={{ 
        filter: `blur(var(--background-blur)) saturate(var(--background-saturation)) brightness(var(--background-brightness)) contrast(var(--background-contrast)) hue-rotate(var(--background-hue))`,
        transform: 'scale(1.05)', // Slightly larger scale to hide blurred edges
      }}
    >
      {backgroundType === 'image' && backgroundImage && (
        <>
          <img 
            src={backgroundImage} 
            alt="Background" 
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${settings.backgroundAnimation ? 'animate-subtle-zoom' : ''}`}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[0.5px]"></div>
          {/* Subtle gradient overlay to improve readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10 dark:via-black/5 dark:to-black/10"></div>
        </>
      )}
      {backgroundType === 'custom-gradient' && (
        <div 
          className="absolute inset-0 transition-all duration-1000" 
          style={{ background: `var(--background-gradient)` }}
        ></div>
      )}
      {backgroundType === 'mesh' && (
        <div className={`absolute inset-0 ${settings.backgroundAnimation ? 'animate-subtle-drift' : ''}`}>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-60 animate-pulse" 
               style={{ background: `radial-gradient(circle, ${getPrimaryColorWithOpacity(0.15)} 0%, transparent 70%)` }}></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full translate-y-1/2 -translate-x-1/2 opacity-40"
               style={{ background: `radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)` }}></div>
          <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30"
               style={{ background: `radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)` }}></div>
        </div>
      )}
      {backgroundType === 'gradient' && (
        <div className="absolute inset-0 opacity-20" 
             style={{ background: `linear-gradient(135deg, ${getPrimaryColorWithOpacity(0.2)} 0%, transparent 50%, ${getPrimaryColorWithOpacity(0.1)} 100%)` }}></div>
      )}
      {backgroundType === 'geometric' && (
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ 
               backgroundImage: `radial-gradient(${getPrimaryColorWithOpacity(0.5)} 1px, transparent 1px)`, 
               backgroundSize: '40px 40px' 
             }}></div>
      )}
      {backgroundType === 'minimal' && (
        <div className="absolute inset-0 bg-slate-50/50"></div>
      )}

      {/* Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[var(--noise-opacity)] mix-blend-overlay pointer-events-none"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Vignette Effect */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{ 
          background: `radial-gradient(circle, transparent 40%, rgba(0,0,0,var(--vignette-opacity)) 100%)`,
        }}
      ></div>
    </div>
  );
};
