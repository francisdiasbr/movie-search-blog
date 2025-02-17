import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { SubTopbarContainer, InnerContainer, NavItem } from './styles';

export function SubTopbar() {
  const navigate = useNavigate();
  const location = useLocation();
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
          REVIEWS
        </NavItem>
        <NavItem
          onClick={() => handleClick('/links')}
          isSelected={selectedItem === '/links'}
        >
          LINKS
        </NavItem>
        <NavItem
          onClick={() => handleClick('/about-project')}
          isSelected={selectedItem === '/about-project'}
        >
          ABOUT
        </NavItem>
      </InnerContainer>
    </SubTopbarContainer>
  );
}
