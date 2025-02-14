import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useLanguage } from '../../contexts/LanguageContext';
import { SubTopbarContainer, InnerContainer, NavItem } from './styles';
import { Language } from '../../contexts/LanguageContext';

const translations: Record<Language, {
  reviews: string;
  links: string;
  favorites: string;
}> = {
  pt: {
    reviews: 'RESENHAS',
    links: 'LINKS',
    favorites: 'A - Z'
  },
  en: {
    reviews: 'REVIEWS',
    links: 'LINKS',
    favorites: 'A - Z'
  },
  de: {
    reviews: 'REZENSIONEN',
    links: 'LINKS',
    favorites: 'A - Z'
  },
  it: {
    reviews: 'RECENSIONI',
    links: 'LINKS',
    favorites: 'A - Z'
  }
};

export function SubTopbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<string>(location.pathname);

  const handleClick = (path: string) => {
    setSelectedItem(path);
    navigate(path);
  };

  return (
    <SubTopbarContainer>
      <InnerContainer>
        <NavItem
          onClick={() => handleClick('/')}
          isSelected={selectedItem === '/'}
        >
          {translations[language].reviews}
        </NavItem>
        <NavItem
          onClick={() => handleClick('/links')}
          isSelected={selectedItem === '/links'}
        >
          {translations[language].links}
        </NavItem>
        <NavItem
          onClick={() => handleClick('/favorites')}
          isSelected={selectedItem === '/favorites'}
        >
          {translations[language].favorites}
        </NavItem>
      </InnerContainer>
    </SubTopbarContainer>
  );
}
