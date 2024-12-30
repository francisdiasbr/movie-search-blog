import styled from 'styled-components';

interface CardContainerProps {
  imageUrl?: string;
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
  color: #ffffff;
  text-align: right;
  position: relative;
  z-index: 1;
  transition: opacity 0.2s ease-in-out;
`;


export const CardContainer = styled.div<CardContainerProps>`
  background-color: ${({ theme }) => theme.colors.card};
  background-image: ${({ imageUrl }) => imageUrl ? `url(${imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.01);
  border-radius: 8px;
  cursor: pointer;
  padding: 16px;
  min-height: 200px;
  position: relative;
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ imageUrl }) => imageUrl ? 'rgba(0, 0, 0, 0.5)' : 'transparent'};
    border-radius: 8px;
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    transform: translateY(-2px);
    
    &::before {
      background: transparent;
    }

    ${CardHeader}, ${CardDate} {
      opacity: 0;
    }
  }
`;

export const CardTitle = styled.h3`
  font-weight: 600;
  color: white;
  position: relative;
  z-index: 1;
  line-height: 1.2;
`;
