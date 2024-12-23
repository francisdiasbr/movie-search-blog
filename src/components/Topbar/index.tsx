import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TopbarContainer = styled.div`
  border-bottom: 1px solid #e0e0e0;
`;

const TopbarWrapper = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  height: 64px;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
`;

const NavLink = styled.span`
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  margin-right: 16px;
  transition: color 0.3s;

  &:hover {
    color: #0070f3;
  }
`;

const IconLink = styled.a`
  color: #000;
  margin-left: 16px;
  transition: color 0.3s;

  &:hover {
    color: #0070f3;
  }
`;

export function Topbar() {
  const navigate = useNavigate();

  return (
    <TopbarContainer>
      <TopbarWrapper>
        <LogoContainer
          onClick={() => navigate('/')}
          onKeyDown={e => e.key === 'Enter' && navigate('/')}
          role="button"
          tabIndex={0}
        >
          The Movie Blog
        </LogoContainer>

        <div>
          <NavLink
            onClick={() => navigate('/about')}
            onKeyDown={e => e.key === 'Enter' && navigate('/about')}
            role="button"
            tabIndex={0}
          >
            ABOUT
          </NavLink>
          <IconLink href="https://github.com/francisdiasbr" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </IconLink>
          <IconLink href="https://linkedin.com/in/francisdiasbr" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
          </IconLink>
        </div>
      </TopbarWrapper>
    </TopbarContainer>
  );
}
