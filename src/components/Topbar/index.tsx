import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import { LanguageToggle } from '../LanguageToggle';
import { ThemeToggle } from '../ThemeToggle';
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
        />
        <S.NavContainer>
          <ThemeToggle />
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
            href="https://github.com/francisdiasbr/movie-search-blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </S.IconLink>
        </S.NavContainer>
      </S.TopbarWrapper>
    </S.TopbarContainer>
  );
}
