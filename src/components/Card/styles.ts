import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  cursor: pointer;
  gap: 16px;
  padding: 16px;
  min-height: 140px;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const CardImage = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;

export const CardTitle = styled.h3`
  font-weight: 600;
  height: 90px;
  color: ${({ theme }) => theme.colors.text};
`;

export const CardDate = styled.p`
  color: #999;
  text-align: right;
`;
