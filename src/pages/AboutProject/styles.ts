import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.sm};
  max-width: 800px;

  @media (max-width: 400px) {
    padding: ${({ theme }) => theme.spacing.xs};
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 576px) {
    width: 120px;
    height: 120px;
  }
`;

export const Content = styled.div`
  flex: 1;
  color: ${({ theme }) => theme.colors.text};

  h1 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-family: ${({ theme }) => theme.fonts.secondary};
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    line-height: 1.6;
    font-family: ${({ theme }) => theme.fonts.tertiary};
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ContactContainer = styled.div`
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

export const ContactLink = styled.a`
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.tertiary};
  font-size: 1.2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 400px) {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const IconLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 400px) {
    font-size: 1.3rem;
  }
`;

export const GitHubButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin: ${({ theme }) => theme.spacing.lg} auto;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-family: ${({ theme }) => theme.fonts.tertiary};
  font-size: 1.2rem;
  width: fit-content;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  @media (max-width: 400px) {
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    font-size: 1rem;
  }
`; 