import styled from 'styled-components';

export const Avatar = styled.img`
  width: 192px;
  height: 192px;
  border-radius: 50%;
`;

export const ContactContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
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

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
  align-items: center;
  gap: 32px;
`;
