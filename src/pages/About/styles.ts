import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
  align-items: center;
  gap: 32px;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ContactLink = styled.a`
  font-size: 1.125rem;
  color: #3b82f6;
  &:hover {
    text-decoration: underline;
  }
`;
