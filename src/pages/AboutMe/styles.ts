import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Title = styled.h1`
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const Content = styled.div`
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
`; 