import styled from 'styled-components';

export const ChipContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  margin: 2px;
  transition: all 0.2s ease-in-out;
  text-align: center;

  &:hover {
    opacity: 0.8;
  }
`; 