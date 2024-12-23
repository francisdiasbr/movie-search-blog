import { useNavigate } from 'react-router-dom';

import { SubTopbarContainer, InnerContainer, NavItem } from './styles';

export function SubTopbar() {
  const navigate = useNavigate();

  return (
    <SubTopbarContainer>
      <InnerContainer>
        <NavItem onClick={() => navigate('/reviews')}>REVIEWS</NavItem>
      </InnerContainer>
    </SubTopbarContainer>
  );
}
