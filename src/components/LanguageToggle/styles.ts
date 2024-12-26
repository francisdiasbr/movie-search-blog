import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

interface FlagWrapperProps {
  isActive: boolean;
}

export const FlagWrapper = styled.div<FlagWrapperProps>`
  font-size: 20px;
  line-height: 1;
  transition: all 0.2s ease-in-out;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
  transform: ${({ isActive }) => (isActive ? 'scale(1.1)' : 'scale(0.9)')};

  &:hover {
    opacity: 0.8;
  }
`; 