import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  align-items: center;

  &::before,
  &::after,
  & span {
    content: '';
    width: 12px;
    height: 12px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    animation: bounce 1s infinite ease-in-out;
  }

  &::before {
    animation-delay: -0.32s;
  }

  & span {
    animation-delay: -0.16s;
  }

  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(0);
      opacity: 0.3;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
`; 