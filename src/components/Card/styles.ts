import styled from 'styled-components';

interface CardContainerProps {
  imageUrl?: string;
  isFirst?: boolean;
}

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  margin-top: auto;
  transition: opacity 0.2s ease-in-out;
`;


export const CardDate = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-weight: 600;
  text-align: right;
  position: relative;
  z-index: 1;
  transition: text-shadow 0.2s ease-in-out;
`;

export const CardTitle = styled.h3`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-weight: 600;
  position: relative;
  z-index: 1;
  line-height: 1.2;
  transition: text-shadow 0.2s ease-in-out;
`;

export const CardContainer = styled.div<CardContainerProps>`
  background-color: ${({ theme, imageUrl }) => imageUrl ? 'transparent' : theme.colors.card};
  background-image: ${({ imageUrl }) => imageUrl ? `url(${imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.01);
  border-radius: 8px;
  cursor: pointer;
  padding: 8px;
  min-height: ${({ isFirst }) => isFirst ? '400px' : '300px'};
  aspect-ratio: ${({ isFirst }) => isFirst ? '2/1' : '1.6/1'};
  position: relative;
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  width: 100%;
  
  @media (max-width: 1200px) {
    min-height: ${({ isFirst }) => isFirst ? '350px' : '280px'};
  }

  @media (max-width: 992px) {
    min-height: ${({ isFirst }) => isFirst ? '320px' : '260px'};
  }

  @media (max-width: 768px) {
    min-height: ${({ isFirst }) => isFirst ? '300px' : '240px'};
  }

  @media (max-width: 576px) {
    min-height: ${({ isFirst }) => isFirst ? '280px' : '220px'};
  }

  @media (max-width: 400px) {
    min-height: ${({ isFirst }) => isFirst ? '250px' : '200px'};
    padding: 6px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 8px;
    transition: all 0.2s ease-in-out;
  }

  ${CardTitle}, ${CardDate} {
    color: ${({ imageUrl, theme }) => imageUrl ? '#ffffff' : theme.colors.text};
    text-shadow: ${({ imageUrl }) => imageUrl ? '1px 1px 3px rgba(0, 0, 0, 0.92)' : 'none'};
  }

  &:hover {
    transform: translateY(-2px) scale(1.03);
    background-color: ${({ theme, imageUrl }) => imageUrl ? 'transparent' : theme.colors.cardHover};
    box-shadow: 0 8px 24px rgba(0,0,0,0.18), 0 1.5px 6px rgba(0,0,0,0.10);
    
    &::before {
      background: transparent;
    }

    ${CardTitle}, ${CardDate} {
      opacity: 1;
      color: ${({ imageUrl, theme }) => imageUrl ? '#ffffff' : theme.colors.text};
      text-shadow: ${({ imageUrl }) => 
        imageUrl ? '2px 2px 4px rgba(0, 0, 0, 0.92), -1px -1px 4px rgba(0, 0, 0, 0.92)' : 'none'};
    }
  }
`;

