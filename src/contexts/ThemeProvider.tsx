import { useState, ReactNode, useEffect } from 'react';

import { ThemeContext } from './ThemeContext';

type ThemeMode = 'dark' | 'light';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    // Remove qualquer tema salvo no localStorage e força o tema claro
    localStorage.removeItem('theme');
  }, []);

  const toggleTheme = () => {
    // Desabilitado - sempre usar tema claro
    return;
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};