import React from 'react';
import styled from 'styled-components';

interface InputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const StyledInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  onKeyPress,
  placeholder,
}) => {
  return (
    <StyledInput
      type={type}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
    />
  );
};

export default Input;
