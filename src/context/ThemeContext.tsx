import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeColor = 'blue' | 'indigo' | 'emerald' | 'violet' | 'rose' | 'amber' | 'slate' | 'cyan' | 'fuchsia' | 'lime' | 'orange';
export type BorderRadius = 'none' | 'md' | 'xl' | '2xl' | '3xl';
export type BackgroundType = 'mesh' | 'gradient' | 'minimal' | 'geometric' | 'image' | 'custom-gradient';
export type FontFamily = 'sans' | 'serif' | 'mono' | 'outfit' | 'cormorant';

export interface ThemeSettings {
  backgroundBlur: number;
  glassBlur: number;
  glassSaturation: number;
  backgroundSaturation: number;
  backgroundBrightness: number;
  backgroundContrast: number;
  backgroundHue: number;
  primaryColor: ThemeColor;
  glassOpacity: number;
  borderRadius: BorderRadius;
  backgroundType: BackgroundType;
  backgroundImage?: string;
  fontFamily: FontFamily;
  darkMode: boolean;
  gradient?: string;
  backgroundAnimation: boolean;
  vignette: boolean;
  noise: boolean;
}

interface ThemeContextType {
  settings: ThemeSettings;
  updateSettings: (newSettings: Partial<ThemeSettings>) => void;
  resetSettings: () => void;
  primaryColorHex: string;
  colors: Record<ThemeColor, string>;
}

const defaultSettings: ThemeSettings = {
  backgroundBlur: 0,
  glassBlur: 12,
  glassSaturation: 100,
  backgroundSaturation: 100,
  backgroundBrightness: 100,
  backgroundContrast: 100,
  backgroundHue: 0,
  primaryColor: 'blue',
  glassOpacity: 70,
  borderRadius: '3xl',
  backgroundType: 'mesh',
  backgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000',
  fontFamily: 'sans',
  darkMode: false,
  gradient: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
  backgroundAnimation: true,
  vignette: true,
  noise: true,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const colors: Record<ThemeColor, string> = {
  blue: '#2563eb',
  indigo: '#4f46e5',
  emerald: '#059669',
  violet: '#7c3aed',
  rose: '#e11d48',
  amber: '#d97706',
  slate: '#475569',
  cyan: '#0891b2',
  fuchsia: '#c026d3',
  lime: '#65a30d',
  orange: '#ea580c',
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    const saved = localStorage.getItem('ui-customization-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultSettings, ...parsed };
      } catch (e) {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  const primaryColorHex = colors[settings.primaryColor] || colors.blue;

  useEffect(() => {
    localStorage.setItem('ui-customization-settings', JSON.stringify(settings));
    
    const root = document.documentElement;
    root.style.setProperty('--primary-color', primaryColorHex);
    root.style.setProperty('--glass-opacity', (settings.glassOpacity / 100).toString());
    root.style.setProperty('--background-blur', `${settings.backgroundBlur}px`);
    root.style.setProperty('--glass-blur', `${settings.glassBlur}px`);
    root.style.setProperty('--glass-saturation', `${settings.glassSaturation || 100}%`);
    root.style.setProperty('--background-saturation', `${settings.backgroundSaturation}%`);
    root.style.setProperty('--background-brightness', `${settings.backgroundBrightness}%`);
    root.style.setProperty('--background-contrast', `${settings.backgroundContrast}%`);
    root.style.setProperty('--background-hue', `${settings.backgroundHue}deg`);
    root.style.setProperty('--vignette-opacity', settings.vignette ? '0.4' : '0');
    root.style.setProperty('--noise-opacity', settings.noise ? '0.05' : '0');
    
    if (settings.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    if (settings.gradient) {
      root.style.setProperty('--background-gradient', settings.gradient);
    } else {
      root.style.removeProperty('--background-gradient');
    }
    
    const radiusMap: Record<BorderRadius, string> = {
      none: '0px',
      md: '0.375rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
    };
    root.style.setProperty('--border-radius', radiusMap[settings.borderRadius]);

    // Apply font family
    const fonts: Record<FontFamily, string> = {
      sans: '"Inter", ui-sans-serif, system-ui, sans-serif',
      serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      outfit: '"Outfit", sans-serif',
      cormorant: '"Cormorant Garamond", serif',
    };
    const selectedFont = fonts[settings.fontFamily];
    root.style.fontFamily = selectedFont;
    root.style.setProperty('--font-sans', selectedFont);
    
  }, [settings, primaryColorHex]);

  const updateSettings = (newSettings: Partial<ThemeSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <ThemeContext.Provider value={{ settings, updateSettings, resetSettings, primaryColorHex, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
