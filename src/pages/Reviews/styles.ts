import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
  margin-top: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
