import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
`;

export const Content = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  padding: 3rem 1rem;
`;

export const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
`;

export const PosterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const MoviePoster = styled.img`
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  max-height: 24rem;
`;

export const Main = styled.main`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 2rem;
`;

export const MovieId = styled.p`
  color: #6b7280;
`;