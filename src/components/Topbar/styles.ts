import styled from 'styled-components';

export const IconLink = styled.a`
  color: #000;
  margin-left: 16px;
  transition: color 0.3s;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
`;

export const NavLink = styled.span`
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  margin-right: 16px;
  transition: color 0.3s;
`;

export const TopbarContainer = styled.div`
  border-bottom: 1px solid #e0e0e0;
`;

export const TopbarWrapper = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  height: 64px;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;
