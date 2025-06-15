import { createGlobalStyle } from 'styled-components';

import { Theme } from './theme';

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.2s ease-in-out;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
  }

  p, a {
    line-height: 1.6;
    font-size: 1.2rem;
    font-family: ${({ theme }) => theme.fonts.tertiary};
  }

  h1, h2, h3 {
    font-family: ${({ theme }) => theme.fonts.secondary};
    font-weight: 500;
  }

  h1 {
    font-size: 1.7rem;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  ul, ol {
    list-style-position: inside;
  }

  button {
    font-size: 1rem;
  }
`;
