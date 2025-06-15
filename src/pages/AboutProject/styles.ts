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

export const Content = styled.div`
  flex: 1;
  color: ${({ theme }) => theme.colors.text};

  h1 {
    margin-bottom: 1.5rem;
    font-family: ${({ theme }) => theme.fonts.secondary};
    font-weight: 400;
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.6;
    font-family: ${({ theme }) => theme.fonts.primary};
    font-weight: 400;
  }
`;

export const ContactContainer = styled.div`
  margin: 2rem 0;
`;

export const ContactLink = styled.a`
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 400;

  &:hover {
    text-decoration: underline;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

export const IconLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const GitHubButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 2rem auto;
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  width: fit-content;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`; 