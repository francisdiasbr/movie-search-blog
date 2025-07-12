import styled from 'styled-components';

export const HeroSection = styled.div<{ backgroundImage: string | null }>`
  position: relative;
  width: 100vw;
  height: 70vh;
  min-height: 500px;
  background-image: ${({ backgroundImage }) => backgroundImage ? `url(${backgroundImage})` : 'none'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    height: 60vh;
    min-height: 400px;
    background-attachment: scroll;
  }
  
  @media (max-width: 480px) {
    height: 50vh;
    min-height: 350px;
  }
`;

export const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 900px;
  padding: 0 40px;
  
  @media (max-width: 768px) {
    padding: 0 30px;
  }
  
  @media (max-width: 480px) {
    padding: 0 20px;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 25px;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8);
  line-height: 1.1;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 2.2rem;
    margin-bottom: 15px;
  }
`;

export const HeroSubtitle = styled.div`
  font-size: 1.6rem;
  font-weight: 300;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  opacity: 0.95;
  letter-spacing: 0.5px;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

export const BlogPostTitleContainer = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

export const Container = styled.div<{ hasImages: boolean }>`
  max-width: 4xl;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 0 16px;
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

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  max-width: 100%;
  word-break: break-word;
`;

export const SectionBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 100%;
  word-break: break-word;
  margin-bottom: 50px;
`;

export const SectionContainer = styled.div`
  margin-bottom: 50px;
`;

export const RecommendedSection = styled.div`
  margin-top: 60px;
  padding: 40px 20px 0;
  border-top: 2px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 1024px) {
    padding: 40px 16px 0;
  }
`;

export const RecommendedTitle = styled.h3`
  font-size: 1.5rem;
  text-align: left;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: 768px) {
    font-size: 1.7rem;
    margin-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 25px;
  }
`;

export const RecommendedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;
  
  @media (max-width: 1024px) {
    gap: 20px;
  }
  
  @media (max-width: 768px) {
    gap: 16px;
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;
