export const lightTheme = {
  colors: {
    primary: '#ebe7da',
    background: '#f4f1e8',
    card: '#ebe7da',
    cardHover: '#ebe7da',
    text: '#1C1C1E',
    border: '#e0e0e0',
    hover: '#f8f9fa',
    link: '#1e293b'
  },
  spacing: {
    xxxs: '4px',
    xxs: '8px',
    xs: '12px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '40px',
    xxl: '48px',
    xxxl: '56px',
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  },
  mediaQueries: {
    xs: '@media (min-width: 320px)',
    sm: '@media (min-width: 576px)',
    md: '@media (min-width: 768px)',
    lg: '@media (min-width: 992px)',
    xl: '@media (min-width: 1200px)',
    xxl: '@media (min-width: 1400px)',
  },
  fonts: {
    primary: "'Roboto', sans-serif",
    secondary: "'Montserrat', sans-serif",
    tertiary: "'Old Standard TT', serif",
    neueMontreal: 'Arial, sans-serif'
  },
};

export const darkTheme = {
  colors: {
    primary: '#8ACE00',
    background: '#2a2a2a',
    card: '#3a3a3a',
    cardHover: '#404040',
    text: '#d1d5db',
    border: '#555555',
    hover: '#404040',
    link: '#c5c5c5'
  },
  spacing: {
    xxxs: '4px',
    xxs: '8px',
    xs: '12px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '40px',
    xxl: '48px',
    xxxl: '56px',
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  },
  mediaQueries: {
    xs: '@media (min-width: 320px)',
    sm: '@media (min-width: 576px)',
    md: '@media (min-width: 768px)',
    lg: '@media (min-width: 992px)',
    xl: '@media (min-width: 1200px)',
    xxl: '@media (min-width: 1400px)',
  },
  fonts: {
    primary: "'Roboto', sans-serif",
    secondary: "'Montserrat', sans-serif",
    tertiary: "'Old Standard TT', serif",
    neueMontreal: 'Arial, sans-serif'
  },
};

export type Theme = typeof lightTheme; 