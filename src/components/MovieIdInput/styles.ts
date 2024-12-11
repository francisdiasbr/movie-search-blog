import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #4b5563;
  font-size: 0.875rem;
`;

export const Input = styled.input`
  width: 100%;
  max-width: 20rem;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #1f2937;
  
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;