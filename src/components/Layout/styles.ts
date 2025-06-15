import styled from 'styled-components';

export const LayoutContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 85%;

  @media (max-width: 1200px) {
    width: 90%;
  }

  @media (max-width: 992px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 576px) {
    width: 95%;
    padding: 12px;
  }

  @media (max-width: 400px) {
    width: 100%;
    padding: 8px;
  }
`;

export const GoBackWrapper = styled.div<{ isMobile: boolean }>`
  position: relative;
  margin-left: 0;
  margin-top: 16px;
  z-index: 10;
`;

export const MainContent = styled.main`
  flex-grow: 1;
  width: 100%;
  margin: 0 auto;
  margin-top: 16px;
`;
