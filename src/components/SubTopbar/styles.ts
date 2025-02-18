import styled from 'styled-components';


export const InnerContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 48px;
  height: 50px;
  justify-content: center;
  margin: 0 auto;
  max-width: 1280px;
  padding: 0 16px;
`;

export const NavItem = styled.span<{ isSelected: boolean }>`
  cursor: pointer;
  font-size: 18px;
  font-weight: ${({ isSelected }) => (isSelected ? '700' : '600')};
  position: relative;
  color: ${({ theme, isSelected }) => 
    isSelected ? theme.colors.text : theme.colors.textSecondary};
  transition: all 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const SubTopbarContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
`;
