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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.2s ease-in-out;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
  }

  p, a {
    font-size: 1rem; /* 16px */
  }

  h1 {
    font-size: 2rem; /* 32px */
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.5rem; /* 24px */
    margin-bottom: 0.75rem;
  }

  h3 {
    font-size: 1.25rem; /* 20px */
    margin-bottom: 0.5rem;
  }

  ul, ol {
    list-style-position: inside;
  }

  button {
    font-size: 1rem;
  }
`;
