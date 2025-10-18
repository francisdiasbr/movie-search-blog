import styled from 'styled-components';

export const TopbarContainer = styled.div`
  background-color: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const TopbarWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 60px;
  justify-content: space-between;
  padding: 0 16px;
  margin: 0 auto;
  max-width: 1200px;

  /* Desktop */
  @media (min-width: 768px) {
    height: 70px;
    padding: 0 24px;
  }
`;

export const LogoContainer = styled.div`
  font-family: ${({ theme }) => theme.fonts.tertiary};
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }

  &::after {
    content: '🍿';
  }

  /* Desktop */
  @media (min-width: 768px) {
    font-size: 24px;
    
    &::after {
      content: '🍿 Movies';
    }
  }
`;

export const ControlsContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  
  /* Desktop */
  @media (min-width: 768px) {
    gap: 16px;
  }
`;

/* Menu Desktop - Oculto no mobile */
export const DesktopNavContainer = styled.div`
  display: none;
  
  /* Desktop */
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const NavItem = styled.span<{ $isSelected: boolean }>`
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  font-size: 15px;
  font-weight: ${({ $isSelected }) => ($isSelected ? '500' : '400')};
  position: relative;
  color: ${({ theme }) => theme.colors.text};
  opacity: ${({ $isSelected }) => ($isSelected ? '1' : '0.7')};
  transition: all 0.2s ease;
  padding: 8px 12px;
  border-radius: 6px;
  white-space: nowrap;
  
  /* Linha sutil na parte inferior para item selecionado */
  ${({ $isSelected, theme }) => 
    $isSelected && `
      &::after {
        content: '';
        position: absolute;
        bottom: 4px;
        left: 50%;
        transform: translateX(-50%);
        width: 20px;
        height: 1px;
        background-color: ${theme.colors.text};
        opacity: 0.6;
      }
    `}
  
  &:hover {
    opacity: 1;
  }

  /* Desktop */
  @media (min-width: 768px) {
    font-size: 16px;
    padding: 8px 16px;
    
    ${({ $isSelected }) => 
      $isSelected && `
        &::after {
          width: 24px;
        }
      `}
  }
`;

/* Hamburger Button - Apenas mobile */
export const HamburgerButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  span {
    width: 24px;
    height: 2px;
    background: ${({ theme }) => theme.colors.text};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    &:first-child {
      transform: ${({ $isOpen }) => $isOpen ? 'rotate(45deg)' : 'rotate(0)'};
    }

    &:nth-child(2) {
      opacity: ${({ $isOpen }) => $isOpen ? '0' : '1'};
      transform: ${({ $isOpen }) => $isOpen ? 'translateX(20px)' : 'translateX(0)'};
    }

    &:nth-child(3) {
      transform: ${({ $isOpen }) => $isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }

  /* Desktop - ocultar */
  @media (min-width: 768px) {
    display: none;
  }
`;

/* Menu Mobile */
export const MobileNavContainer = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => $isOpen ? 'block' : 'none'};
  background-color: white;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 16px;
  animation: ${({ $isOpen }) => $isOpen ? 'slideDown 0.3s ease-in-out' : 'none'};

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Desktop - ocultar */
  @media (min-width: 768px) {
    display: none;
  }
`;

export const MobileNavItem = styled.div<{ $isSelected: boolean }>`
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  font-size: 16px;
  font-weight: ${({ $isSelected }) => ($isSelected ? '500' : '400')};
  color: ${({ theme }) => theme.colors.text};
  opacity: ${({ $isSelected }) => ($isSelected ? '1' : '0.7')};
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  margin-bottom: 4px;
  position: relative;
  
  /* Linha sutil na lateral esquerda para item selecionado */
  ${({ $isSelected, theme }) => 
    $isSelected && `
      &::before {
        content: '';
        position: absolute;
        left: 8px;
        top: 50%;
        transform: translateY(-50%);
        width: 2px;
        height: 16px;
        background-color: ${theme.colors.text};
        opacity: 0.6;
        border-radius: 1px;
      }
    `}
  
  &:hover {
    opacity: 1;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

/* Deprecated - manter para compatibilidade */
export const NavContainer = styled.div`
  display: none;
`;

export const NavLink = styled.div`
  display: none;
`;

