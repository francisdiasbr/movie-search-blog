import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  padding: 16px;
`;

export const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  justify-content: center;

  > * {
    flex: 0 0 250px;
    margin: 0;
    animation: fadeIn 0.4s ease-out;
    animation-fill-mode: both;
  }

  @media (min-width: 846px) {
    justify-content: center;
    
    > * {
      flex: 0 1 250px;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const NoPostsMessage = styled.p`
  text-align: center;
  color: gray;
  margin-top: 16px;
`;

export const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

export const StyledCard = styled.div`
  cursor: pointer;
  transition: background-color 0.3s;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const CardContent = styled.div`
  padding: 16px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;

  img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0;
  }
`;

export const CardDate = styled.p`
  text-align: right;
  color: #757575;
  font-size: 0.9rem;
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
