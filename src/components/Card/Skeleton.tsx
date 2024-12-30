import React from 'react';
import styled from 'styled-components';

const SkeletonCardContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  padding: 16px;
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
`;

const SkeletonHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
`;

const SkeletonTitle = styled.div`
  background-color: #d9d9d9;
  height: 80px;
  width: 100%;
  border-radius: 4px;
`;

const SkeletonDate = styled.div`
  background-color: #d9d9d9;
  height: 16px;
  width: 30%;
  border-radius: 4px;
  align-self: flex-end;
`;

const SkeletonCard: React.FC = () => {
  return (
    <SkeletonCardContainer>
      <SkeletonHeader>
        <SkeletonTitle />
      </SkeletonHeader>
      <SkeletonDate />
    </SkeletonCardContainer>
  );
};

export default SkeletonCard;
