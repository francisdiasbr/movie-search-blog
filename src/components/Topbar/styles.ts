import styled from 'styled-components';

export const LogoContainer = styled.div`
  font-family: ${({ theme }) => theme.fonts.tertiary};
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }

  &::after {
    content: 'TMB';
  }

  @media (min-width: 768px) {
    &::after {
      content: 'The Movie Blog';
    }
  }
`;

export const NavItem = styled.span<{ isSelected: boolean }>`
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  font-size: 16px;
  font-weight: ${({ isSelected }) => (isSelected ? '600' : '500')};
  position: relative;
  color: ${({ theme, isSelected }) => 
    isSelected ? theme.colors.text : theme.colors.textSecondary};
  transition: all 0.2s ease;
  padding: 8px 16px;
  border-radius: 6px;
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.cardHover};
  }

  ${({ isSelected, theme }) => 
    isSelected && `
      background-color: ${theme.colors.cardHover};
    `}
`;

export const NavLink = styled.div`
  font-family: ${({ theme }) => theme.fonts.secondary};
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

export const TopbarContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const TopbarWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 80px;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 24px;

  @media (max-width: 768px) {
    padding: 0 16px;
    height: 70px;
  }
`;

export const NavContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  
  @media (max-width: 768px) {
    gap: 4px;
  }
`;

export const ControlsContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

