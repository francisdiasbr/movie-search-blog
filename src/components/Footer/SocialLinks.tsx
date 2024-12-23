import styled from 'styled-components';

const SocialLinksList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`;

const SocialLinkItem = styled.li`
  margin: 0 8px;
`;

const SocialLink = styled.a`
  color: #FFF;
  font-size: 0.875rem;
  font-weight: 500;
  display: block;
  padding: 0.25rem 0.75rem;
  transition: color 0.3s;

  &:hover {
    color: #ffffff;
  }
`;

const SocialLinks = () => (
  <SocialLinksList>
    <SocialLinkItem>
      <SocialLink href="/about">About</SocialLink>
    </SocialLinkItem>
    <SocialLinkItem>
      <SocialLink href="/">Blog</SocialLink>
    </SocialLinkItem>
  </SocialLinksList>
);

export default SocialLinks;
