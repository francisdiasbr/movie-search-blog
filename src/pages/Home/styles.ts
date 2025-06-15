import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  padding: 16px;

  @media (max-width: 400px) {
    padding: 8px;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  justify-items: center;

  > *:first-child {
    grid-column: 1 / -1;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
  }

  .card-break {
    display: none;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: ${({ theme }) => theme.spacing.xs};
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: ${({ theme }) => theme.spacing.xxs};
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    padding: 4px;
    gap: 8px;
  }
`;

export const NoPostsMessage = styled.p`
  text-align: center;
  color: gray;
  margin-top: 16px;
  font-size: 1rem;

  @media (max-width: 400px) {
    font-size: 0.95rem;
  }
`;

export const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 16px;

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    gap: 8px;
    margin-top: 8px;
  }
`;


export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

export const ActivityIndicator = styled.div`
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
