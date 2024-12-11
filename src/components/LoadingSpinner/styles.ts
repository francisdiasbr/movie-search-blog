import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .spinner {
    width: 2rem;
    height: 2rem;
    color: #2563eb;
    animation: ${spin} 1s linear infinite;
  }
`;