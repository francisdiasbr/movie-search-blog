import styled from 'styled-components';

export const Container = styled.div`
  max-width: 4xl;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const ContentColumn = styled.div`
  width: 62%;
  padding-right: 1rem;

  @media (max-width: 1024px) {
    width: 100%;
    padding-right: 0;
  }
`;

export const ImageColumn = styled.div`
  width: 38%;
  padding-left: 1rem;
`;