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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const t = translations[language];

  const handleClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false); // Fechar menu após navegação
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <S.TopbarContainer>
      <S.TopbarWrapper>
        {/* Logo */}
        <S.LogoContainer
          onClick={() => handleClick('/')}
          onKeyDown={e => e.key === 'Enter' && handleClick('/')}
          role="button"
          tabIndex={0}
        />
        
        {/* Menu Desktop - apenas visível em telas maiores */}
        <S.DesktopNavContainer>
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
        </S.DesktopNavContainer>

        {/* Controles (sempre visíveis) */}
        <S.ControlsContainer>
          <LanguageToggle />
          <ThemeToggle />
          
          {/* Hamburger Menu Button - apenas mobile */}
          <S.HamburgerButton onClick={toggleMenu} isOpen={isMenuOpen}>
            <span />
            <span />
            <span />
          </S.HamburgerButton>
        </S.ControlsContainer>
      </S.TopbarWrapper>

      {/* Menu Mobile - dropdown */}
      <S.MobileNavContainer isOpen={isMenuOpen}>
        <S.MobileNavItem
          onClick={() => handleClick('/')}
          isSelected={location.pathname === '/'}
        >
          {t.home}
        </S.MobileNavItem>
        <S.MobileNavItem
          onClick={() => handleClick('/reviews')}
          isSelected={location.pathname === '/reviews'}
        >
          {t.reviews}
        </S.MobileNavItem>
        <S.MobileNavItem
          onClick={() => handleClick('/blogroll')}
          isSelected={location.pathname === '/blogroll'}
        >
          {t.blog}
        </S.MobileNavItem>
        <S.MobileNavItem
          onClick={() => handleClick('/favorites')}
          isSelected={location.pathname === '/favorites'}
        >
          {t.favorites}
        </S.MobileNavItem>
        <S.MobileNavItem
          onClick={() => handleClick('/about-project')}
          isSelected={location.pathname === '/about-project'}
        >
          {t.about}
        </S.MobileNavItem>
      </S.MobileNavContainer>
    </S.TopbarContainer>
  );
}
