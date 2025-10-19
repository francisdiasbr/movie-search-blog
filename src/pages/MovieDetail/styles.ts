import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 20px;
`;

export const Header = styled.div`
  margin-bottom: 30px;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 16px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}20;
  }
`;

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const MovieSection = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 60px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const MoviePoster = styled.div<{ $imageUrl: string }>`
  width: 300px;
  height: 450px;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    height: 400px;
    margin: 0 auto;
  }
`;

export const MovieInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const MovieTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const MovieMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

export const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MetaLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const MetaValue = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

export const ImdbButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const DirectorSection = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 40px;
`;

export const DirectorTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const DirectorInfo = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const DirectorPhoto = styled.div<{ $imageUrl: string | null }>`
  width: 120px;
  height: 120px;
  background-image: ${({ $imageUrl }) => $imageUrl ? `url(${$imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    align-self: center;
  }
`;

export const DirectorDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DirectorName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const DirectorBio = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.error};
`;
