import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: white;
  color: #1e293b;
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
`;

export const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 1600px;

  
  @media (min-width: 768px) {
    padding: 16px;
  }
`;

export const GoBackWrapper = styled.div<{ isMobile: boolean }>`
  position: relative;
  margin-left: ${({ isMobile }) => (isMobile ? '16px' : '16px')};
  margin-top: 16px;
  z-index: 10;
`;

export const MainContent = styled.main`
  flex-grow: 1;
  width: 100%;
  margin: 0 auto;
  margin-top: 16px;
  
  @media (min-width: 768px) {
    padding: 24px 16px;
  }
`;
