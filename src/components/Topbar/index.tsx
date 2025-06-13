import { useNavigate } from 'react-router-dom';

import { useLanguage } from '../../contexts/LanguageContext';
import { LanguageToggle } from '../LanguageToggle';
import * as S from './styles';

export function Topbar() {
  const { language } = useLanguage();
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
          <LanguageToggle />
          <S.NavLink onClick={() => navigate('/about-project')}>
            {language === 'pt' ? 'SOBRE' : 'ABOUT'}
          </S.NavLink>
        </S.NavContainer>
      </S.TopbarWrapper>
    </S.TopbarContainer>
  );
}
