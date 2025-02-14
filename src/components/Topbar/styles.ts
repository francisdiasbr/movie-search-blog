import styled from 'styled-components';

export const IconLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.3s;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;

  &::after {
    content: 'TMB';
  }

  @media (min-width: 768px) {
    &::after {
      content: 'The Movie Blog';
    }
  }
`;

export const NavLink = styled.div`
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

export const TopbarContainer = styled.div`
  border-bottom: 1px solid #e0e0e0;
`;

export const TopbarWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 64px;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1300px;
  padding: 0 16px;
`;

export const NavContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 24px;
`;
