import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLanguage } from '../../contexts/LanguageContext';
import { SubTopbarContainer, InnerContainer, NavItem } from './styles';

const translations = {
  pt: {
    reviews: 'FILMES',
    links: 'BLOGROLL',
    favorites: 'FAVORITOS'
  },
  en: {
    reviews: 'REVIEWS',
    links: 'BLOGROLL',
    favorites: 'FAVORITES'
  }
};

export function SubTopbar() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<string>(location.pathname);
  
  const t = translations[language];

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
          {t.reviews}
        </NavItem>
        <NavItem
          onClick={() => handleClick('/blogroll')}
          isSelected={selectedItem === '/blogroll'}
        >
          {t.links}
        </NavItem>
        <NavItem
          onClick={() => handleClick('/favorites')}
          isSelected={selectedItem === '/favorites'}
        >
          {t.favorites}
        </NavItem>
      </InnerContainer>
    </SubTopbarContainer>
  );
}
