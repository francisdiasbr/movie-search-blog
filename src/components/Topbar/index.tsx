import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLanguage } from '../../contexts/LanguageContext';
import { LanguageToggle } from '../LanguageToggle';
import { ThemeToggle } from '../ThemeToggle';
import * as S from './styles';

export function Topbar() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

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
          <S.DropdownContainer
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <S.NavLink>
              {language === 'pt' ? 'SOBRE' : 'ABOUT'} <FontAwesomeIcon icon={faChevronDown} />
            </S.NavLink>
            {showDropdown && (
              <S.DropdownMenu>
                <S.DropdownItem onClick={() => navigate('/about-project')}>
                  {language === 'pt' ? 'Sobre este projeto' : 'About this project'}
                </S.DropdownItem>
                <S.DropdownItem onClick={() => navigate('/about-me')}>
                  {language === 'pt' ? 'Quem escreve' : 'About me'}
                </S.DropdownItem>
              </S.DropdownMenu>
            )}
          </S.DropdownContainer>
        </S.NavContainer>
      </S.TopbarWrapper>
    </S.TopbarContainer>
  );
}
