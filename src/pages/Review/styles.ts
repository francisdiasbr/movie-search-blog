import styled from 'styled-components';

export const BlogPostTitleContainer = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

export const Container = styled.div<{ hasImages: boolean }>`
  max-width: 4xl;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const ContentColumn = styled.div<{ hasImages: boolean }>`
  flex: ${({ hasImages }) => (hasImages ? '2' : '1')};
  min-width: 0;
`;

export const ImageColumn = styled.div`
  width: 38%;
  padding-left: 1rem;

  @media (max-width: 1024px) {
    width: 100%;
    padding-left: 0;
  }
`;

export const ImageWrapper = styled.div`
  margin-bottom: 16px;
  img {

    width: 100%;
    margin: 0;
  }
`;
