import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  padding: 16px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const CardImage = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 8px;
`;

export const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;

export const CardDate = styled.p`
  color: #999;
  font-size: 0.875rem;
`;
