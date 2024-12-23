import styled from 'styled-components';

import SocialLinks from './SocialLinks';

const FooterContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (min-width: 768px) {
    justify-content: space-between;
  }
`;

const CopyrightContainer = styled.div`
  width: 100%;
  padding: 0 16px;
  margin: 0 auto;
  text-align: center;

  @media (min-width: 768px) {
    width: 33.3333%;
    text-align: left;
  }
`;

const SocialLinksContainer = styled.div`
  width: 100%;
  padding: 0 16px;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 66.6667%;
  }
`;

const FooterContent = () => (
  <FooterContentContainer>
    <CopyrightContainer>
      <div style={{ color: '#fff' }}>The Movie Search &copy; {new Date().getFullYear()}</div>
    </CopyrightContainer>
    <SocialLinksContainer>
      <SocialLinks />
    </SocialLinksContainer>
  </FooterContentContainer>
);

export default FooterContent;
