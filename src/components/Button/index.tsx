import styled from 'styled-components';

const Button = styled.button<{ hasMarginLeft?: boolean }>`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 6px;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
  font-weight: 600;
  margin-left: ${({ hasMarginLeft }) => (hasMarginLeft ? '8px' : '0')};

  &:hover {
    background-color: #334155;
  }
`;

export default Button;
