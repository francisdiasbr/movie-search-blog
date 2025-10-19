import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

export const ScrollContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.cardBackground};
  
  /* Custom scrollbar - mais visível */
  &::-webkit-scrollbar {
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
    border-radius: 6px;
    margin: 0 ${({ theme }) => theme.spacing.sm};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary || theme.colors.border};
    border-radius: 6px;
    border: 2px solid ${({ theme }) => theme.colors.background};
    
    &:hover {
      background: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`;

export const CardsWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const MovieCard = styled.div`
  min-width: 180px;
  max-width: 180px;
  height: 340px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    min-width: 140px;
    max-width: 140px;
    height: 280px;
  }
`;

export const Thumbnail = styled.div`
  width: 100%;
  height: 260px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

export const Info = styled.div`
  padding: ${({ theme }) => theme.spacing.xs};
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const MovieTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

export const MovieMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

export const Year = styled.span``;

export const Rating = styled.span`
  display: flex;
  align-items: center;
  gap: 2px;

  &::before {
    content: '⭐';
    font-size: 0.75rem;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

