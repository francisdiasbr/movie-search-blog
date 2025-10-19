import styled from 'styled-components';

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Image = styled.img<{ $loaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: opacity 0.3s ease;
  opacity: ${({ $loaded }) => $loaded ? 1 : 0};
`;

export const FallbackText = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.75rem;
  text-align: center;
  padding: 1rem;
`;

export const LoadingText = styled.span`
  position: absolute;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.75rem;
  text-align: center;
`;
