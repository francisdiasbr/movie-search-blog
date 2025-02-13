export const lightTheme = {
  colors: {
    primary: '#7ebb0b',
    background: '#ffffff',
    card: '#7ebb0b',
    cardHover: '#8ACE00',
    text: '#1e293b',
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
  }
};

export const darkTheme = {
  colors: {
    primary: '#8ACE00',
    background: '#1a1a1a',
    card: '#2d2d2d',
    cardHover: '#333333',
    text: '#e5e7eb',
    border: '#fff',
    hover: '#333333',
    link: '#FFF'
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
  }
};

export type Theme = typeof lightTheme; 