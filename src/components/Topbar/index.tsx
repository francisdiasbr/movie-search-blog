import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import { LanguageToggle } from '../LanguageToggle';
import * as S from './styles';

export function Topbar() {
  const navigate = useNavigate();

  return (
    <S.TopbarContainer>
      <S.TopbarWrapper>
        <S.LogoContainer
          onClick={() => navigate('/')}
          onKeyDown={e => e.key === 'Enter' && navigate('/')}
          role="button"
          tabIndex={0}
        >
          The Movie Blog
        </S.LogoContainer>
        <S.NavContainer>
          <LanguageToggle />
          <S.NavLink
            onClick={() => navigate('/about')}
            onKeyDown={e => e.key === 'Enter' && navigate('/about')}
            role="button"
            tabIndex={0}
          >
            ABOUT
          </S.NavLink>
          <S.IconLink
            href="https://github.com/francisdiasbr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </S.IconLink>
          <S.IconLink
            href="https://linkedin.com/in/francisdiasbr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
          </S.IconLink>
        </S.NavContainer>
      </S.TopbarWrapper>
    </S.TopbarContainer>
  );
}
