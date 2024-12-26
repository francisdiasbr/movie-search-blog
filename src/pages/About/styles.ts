import styled from 'styled-components';

export const Avatar = styled.img`
  height: 192px;
  border-radius: 50%;
  width: 192px;
`;

export const ContactContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Content = styled.div`
display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;
  text-align: center;
  
  @media (min-width: 768px) {
    text-align: left;
  }
`;

export const ContactLink = styled.a`
  color: #3b82f6;
  &:hover {
    text-decoration: underline;
  }
`;

export const FlexContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 16px;
  
  @media (min-width: 768px) {
    align-items: flex-start;
    flex-direction: row;
  }
`;
