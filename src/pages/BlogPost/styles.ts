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
  margin-top: 48px;

  @media (max-width: 1024px) {
    width: 100%;
    padding-left: 0;
  }
`;

export const ImageWrapper = styled.div`
  margin-bottom: 16px;
  img {
    width: calc(100% - 32px);
    margin: 0 16px;
  }
`;

export const PosterContainer = styled.div`
  width: 15%;
  margin: 0 auto;
  aspect-ratio: 2 / 3;
  background-color: #f9fafb;
  border-radius: 8px;
  overflow: hidden;
`;

export const SectionContainer = styled.div`
  margin-bottom: 16px;
`;

export const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
  padding: 0 16px;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    padding: 0;
  }
`;
