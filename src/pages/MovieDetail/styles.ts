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
  background: ${({ theme }) => theme.colors.link};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

export const BackIcon = styled.span`
  font-size: 14px;
`;

export const Content = styled.div`
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
  border-radius: 8px;
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
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.8;
`;

export const MetaValue = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

export const ImdbButton = styled.button`
  background: #f5c518;
  color: #000;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

export const ImdbIcon = styled.span`
  font-size: 14px;
`;

export const ExternalIcon = styled.span`
  font-size: 12px;
`;

export const DirectorSection = styled.div`
  padding-top: 40px;
  // background-color: #f2f2f7;
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
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.border};
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
  font-family: ${({ theme }) => theme.fonts.neueMontreal};
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  max-width: 100%;
  word-wrap: break-word;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 20px;
  text-align: center;
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.error};
  padding: 20px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.error}10;
  border: 1px solid ${({ theme }) => theme.colors.error}30;
  border-radius: 8px;
  margin: 20px;
`;

export const SoundtrackSection = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 40px;
  margin-top: 40px;
`;

export const SoundtrackTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const SoundtrackDescription = styled.p`
  font-family: ${({ theme }) => theme.fonts.neueMontreal};
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 24px 0;
`;

export const TracksList = styled.div`
  display: grid;
  gap: 16px;
`;

export const TrackItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.cardHover};
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

export const TrackAlbumCover = styled.div<{ $imageUrl: string | null }>`
  width: 60px;
  height: 60px;
  background-image: ${({ $imageUrl }) => $imageUrl ? `url(${$imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  background-color: ${({ theme }) => theme.colors.border};
`;

export const TrackInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const TrackTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const TrackArtist = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

export const TrackDescription = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  font-style: italic;
`;

export const TrackActions = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
`;

export const TrackButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  background: ${({ $variant, theme }) => 
    $variant === 'primary' ? '#1DB954' : theme.colors.border};
  color: ${({ $variant }) => $variant === 'primary' ? 'white' : 'inherit'};
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: ${({ $variant }) => 
      $variant === 'primary' ? '#1ed760' : 'rgba(0, 0, 0, 0.1)'};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const AudioPlayer = styled.audio`
  width: 100%;
  margin-top: 8px;
`;
