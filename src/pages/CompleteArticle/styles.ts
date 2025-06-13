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
  position: relative;
  width: 100%;
  padding-top: 66.66%;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 0px;
    margin-top: 10px;
  }
`;

export const SectionContainer = styled.div`
  margin-bottom: 16px;
`;
