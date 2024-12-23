import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { SubTopbarContainer, InnerContainer, NavItem } from './styles';

export function SubTopbar() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleClick = (path: string) => {
    setSelectedItem(path);
    navigate(path);
  };

  return (
    <SubTopbarContainer>
      <InnerContainer>
        <NavItem
          onClick={() => handleClick('/reviews')}
          isSelected={selectedItem === '/reviews'}
        >
          REVIEWS
        </NavItem>
        <NavItem
          onClick={() => handleClick('/links')}
          isSelected={selectedItem === '/links'}
        >
          LINKS
        </NavItem>
      </InnerContainer>
    </SubTopbarContainer>
  );
}
