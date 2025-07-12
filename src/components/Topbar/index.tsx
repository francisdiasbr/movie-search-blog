import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useLanguage } from '../../contexts/LanguageContext';
import { LanguageToggle } from '../LanguageToggle';
import { ThemeToggle } from '../ThemeToggle';
import * as S from './styles';

const translations = {
  pt: {
    home: 'Home',
    reviews: 'Críticas',
    blog: 'Blogroll',
    favorites: 'Vale a Pena Assistir',
    about: 'Sobre'
  },
  en: {
    home: 'Home',
    reviews: 'Reviews',
    blog: 'Blogroll',
    favorites: 'Worth Watching',
    about: 'About'
  }
};

export function Topbar() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState<string>(location.pathname);
  
  const t = translations[language];

  const handleClick = (path: string) => {
    setSelectedItem(path);
    navigate(path);
  };

  return (
    <S.TopbarContainer>
      <S.TopbarWrapper>
        <S.LogoContainer
          onClick={() => handleClick('/')}
          onKeyDown={e => e.key === 'Enter' && handleClick('/')}
          role="button"
          tabIndex={0}
        />
        
        <S.NavContainer>
          <S.NavItem
            onClick={() => handleClick('/')}
            isSelected={location.pathname === '/'}
          >
            {t.home}
          </S.NavItem>
          <S.NavItem
            onClick={() => handleClick('/reviews')}
            isSelected={location.pathname === '/reviews'}
          >
            {t.reviews}
          </S.NavItem>
          <S.NavItem
            onClick={() => handleClick('/blogroll')}
            isSelected={location.pathname === '/blogroll'}
          >
            {t.blog}
          </S.NavItem>
          <S.NavItem
            onClick={() => handleClick('/favorites')}
            isSelected={location.pathname === '/favorites'}
          >
            {t.favorites}
          </S.NavItem>
          <S.NavItem
            onClick={() => handleClick('/about-project')}
            isSelected={location.pathname === '/about-project'}
          >
            {t.about}
          </S.NavItem>
        </S.NavContainer>

        <S.ControlsContainer>
          <LanguageToggle />
          <ThemeToggle />
        </S.ControlsContainer>
      </S.TopbarWrapper>
    </S.TopbarContainer>
  );
}
