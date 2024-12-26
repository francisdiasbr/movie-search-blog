import React from 'react';
import styled from 'styled-components';

const StyledSeparator = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 1px 0 16px 0;
`;

const Separator: React.FC = () => {
  return <StyledSeparator />;
};

export default Separator;
