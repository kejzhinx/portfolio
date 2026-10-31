import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light' | 'halloween' | 'christmas';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  isHalloween: boolean;
  isNatural: boolean; // Alias to ensure full backward compatibility
  isChristmas: boolean;
  isRain: boolean;
  transitioningTheme: 'halloween' | 'christmas' | null;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  clearTransition: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kejzhin_portfolio_theme') as Theme | null;
      if (saved && ['dark', 'light', 'halloween', 'christmas'].includes(saved)) {
        return saved;
      }
    }
    return 'dark';
  });

  const [transitioningTheme, setTransitioningTheme] = useState<'halloween' | 'christmas' | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    // Remove all theme classes first
    root.classList.remove('light', 'dark', 'theme-halloween', 'theme-christmas', 'theme-natural');

    if (theme === 'light') {
      root.classList.add('light');
      root.style.colorScheme = 'light';
    } else {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
      if (theme === 'halloween') {
        root.classList.add('theme-halloween');
      } else if (theme === 'christmas') {
        root.classList.add('theme-christmas');
      }
    }
    localStorage.setItem('kejzhin_portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: Theme) => {
    if (newTheme === theme) return;

    if (newTheme === 'halloween') {
      setTransitioningTheme('halloween');
    } else if (newTheme === 'christmas') {
      setTransitioningTheme('christmas');
    } else {
      setTransitioningTheme(null);
    }

    setThemeState(newTheme);
  };

  const clearTransition = () => {
    setTransitioningTheme(null);
  };

  const isDark = theme !== 'light';
  const isHalloween = theme === 'halloween';
  const isNatural = isHalloween; // Alias so legacy checks resolve cleanly
  const isChristmas = theme === 'christmas';
  const isRain = false;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark,
        isHalloween,
        isNatural,
        isChristmas,
        isRain,
        transitioningTheme,
        toggleTheme,
        setTheme,
        clearTransition,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
