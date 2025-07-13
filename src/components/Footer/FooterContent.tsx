import styled from 'styled-components';

const FooterContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
`;

const FooterText = styled.div`
  color: #fff;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.primary};
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  transition: opacity 0.2s ease;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: inherit;
  
  &:hover {
    opacity: 0.8;
  }
`;

const Heart = styled.span`
  color: #ff6b6b;
  margin: 0 4px;
`;

const FooterContent = () => (
  <FooterContentContainer>
    <FooterText>
      Developed with <Heart>♥</Heart> by{' '}
      <FooterLink 
        href="https://www.linkedin.com/in/francisdiasbr/" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Francis Dias
      </FooterLink>
      {' '} - {' '}
      <FooterLink 
        href="https://github.com/francisdiasbr/movie-search-blog" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        GitHub
      </FooterLink>
    </FooterText>
  </FooterContentContainer>
);

export default FooterContent;
