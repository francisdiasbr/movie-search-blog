import styled from 'styled-components';

const Button = styled.button`
  margin-left: 8px;
  padding: 4px 16px;
  background-color: #1e293b;
  color: #ffffff; 
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #334155;
  }
`;

export default Button;