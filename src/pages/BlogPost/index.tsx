import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ErrorMessage } from '../../components/ErrorMessage';
import { Layout } from '../../components/Layout';
import Separator from '../../components/Separator';
import SkeletonBlogPost from '../../components/SkeletonBlogPost';
import { useLanguage } from '../../contexts/LanguageContext';
import { fetchAllImageUrls, clearImageState } from '../../features/blogPost/blogPostImagesSlice';
import { clearBlogPostState, fetchBlogPost } from '../../features/blogPost/blogPostSlice';
import { clearFavoriteState, getFavoriteById } from '../../features/favorites/favoritesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/types';
import { sectionTitles } from './sectionTitles';
import * as S from './styles';


function BlogPost() {
  const { movieId } = useParams();
  const { language } = useLanguage();

  const dispatch = useAppDispatch();

  const { data, error, status } = useAppSelector((state: RootState) => state.blogPost);
  const { imageUrls, subtitles } = useAppSelector((state: RootState) => state.blogPostImages);
  const { currentFavorite } = useAppSelector((state: RootState) => state.favorites);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchAllImageUrls({ tconst: movieId }));
      dispatch(fetchBlogPost(movieId));
      dispatch(getFavoriteById(movieId));
    }

    return () => {
      dispatch(clearBlogPostState());
      dispatch(clearImageState());
      dispatch(clearFavoriteState());
    };
  }, [dispatch, movieId]);

  
  if (error) return <ErrorMessage message={error} />;
  if (status === 'loading') return <Layout><SkeletonBlogPost /></Layout>;
  if (!data) return null;

  const hasImages = imageUrls && imageUrls.length > 0;

  return (
    <Layout>
      {status === 'succeeded' && data && (
        <>
          <S.BlogPostTitleContainer>
            <h2>{data.primaryTitle}</h2>
            {currentFavorite && (
              <div>
                <p><em>{currentFavorite.originalTitle} ({currentFavorite.startYear}) • {currentFavorite.country} • {currentFavorite.director}</em></p>
                <br/>
              </div>
            )}
          </S.BlogPostTitleContainer>
          <S.Container hasImages={hasImages}>
            <S.ContentColumn hasImages={hasImages}>
              <Section
                title={sectionTitles[language].introduction}
                content={data.content[language].introduction}
              />
              <Section
                title={sectionTitles[language].stars_and_characters}
                content={data.content[language].stars_and_characters}
              />
              <Section
                title={sectionTitles[language].historical_context}
                content={data.content[language].historical_context}
              />
              <Section
                title={sectionTitles[language].cultural_importance}
                content={data.content[language].cultural_importance}
              />
              <Section
                title={sectionTitles[language].technical_analysis}
                content={data.content[language].technical_analysis}
              />
              <Section
                title={sectionTitles[language].original_movie_soundtrack}
                content={data.original_movie_soundtrack}
              />
              <Section
                title={sectionTitles[language].conclusion}
                content={data.content[language].conclusion}
              />
            </S.ContentColumn>
            {hasImages && (
              <S.ImageColumn>
                <ImageGallery images={imageUrls} subtitles={subtitles} />
              </S.ImageColumn>
            )}
          </S.Container>
        </>
      )}
    </Layout>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  if (!content) return null;

  return (
    <S.SectionContainer>
      <h2>{title}</h2>
      <Separator />
      <p style={{ textIndent: '32px' }}>{content}</p>
    </S.SectionContainer>
  );
}

function ImageGallery({ images, subtitles }: { images: string[]; subtitles?: string[] }) {
  if (!images || images.length === 0) return null;

  console.log(subtitles, 'subtitles');
  return (
    <>
      {images.map((url, index) => (
        <S.ImageWrapper key={index}>
          <img 
            src={url} 
            alt={`Imagem ${index + 1}`} 
          />
          <p>
            {subtitles?.[index] || 'Cenae'}
          </p>
        </S.ImageWrapper>
      ))}
    </>
  );
}

export default BlogPost;
