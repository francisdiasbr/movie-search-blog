import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  padding: 16px;
  height: 100%;
  min-height: 140px;
  gap: 16px;
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
`;

export const CardDate = styled.p`
  color: #999;
  text-align: right;
`;
