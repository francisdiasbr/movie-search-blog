import styled from 'styled-components';

import FooterContent from './FooterContent';

const FooterContainer = styled.footer`
  position: relative;
  width: 100%;
  background: linear-gradient(to bottom, #1a1a1a, #000);
  padding: 24px 0;
`;

const FooterWrapper = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 16px;
`;

const FooterContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterContentContainer>
          <FooterContent />
        </FooterContentContainer>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;
