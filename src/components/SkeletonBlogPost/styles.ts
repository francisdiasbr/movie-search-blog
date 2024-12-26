import styled from 'styled-components';

export const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SkeletonTitle = styled.div`
  height: 32px;
  width: 60%;
  background: #e0e0e0;
  border-radius: 4px;
  margin: 0 auto;
`;

export const SkeletonContent = styled.div`
  height: 16px;
  width: 100%;
  background: #e0e0e0;
  border-radius: 4px;
`;

export const SkeletonImage = styled.div`
  height: 200px;
  width: 100%;
  background: #e0e0e0;
  border-radius: 4px;
`;
