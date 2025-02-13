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
  color: ${({ isSelected }) => (isSelected ? '#000' : '#666')};
  transition: all 0.2s ease;
  
  &:hover {
    color: #000;
  }
`;
export const SubTopbarContainer = styled.div`
  border-bottom: 1px solid #e5e7eb;
  background-color: #fff;
`;
