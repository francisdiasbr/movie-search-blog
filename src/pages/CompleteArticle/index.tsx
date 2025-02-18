import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ErrorMessage } from '../../components/ErrorMessage';
import { Layout } from '../../components/Layout';
import SkeletonBlogPost from '../../components/SkeletonBlogPost';
import { useLanguage } from '../../contexts/LanguageContext';
import { clearAuthoralReviewState, fetchAuthoralReview } from '../../features/authoralReview/authoralReviewSlice';
import { fetchAllImageUrls, clearImageState } from '../../features/blogPost/blogPostImagesSlice';
import { clearBlogPostState, fetchBlogPost } from '../../features/blogPost/blogPostSlice';
import { clearFavoriteState, getFavoriteById } from '../../features/favorites/favoritesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import { Section } from '../BlogPost';
import { sectionTitles } from '../BlogPost/sectionTitles';
import * as S from './styles';

function CompleteArticle() {
  const { movieId } = useParams();
  const { language } = useLanguage();
  const dispatch = useAppDispatch();

  const blogPost = useAppSelector((state: RootState) => state.blogPost);
  const review = useAppSelector(state => state.authoralReview);
  const { imageUrls, subtitles } = useAppSelector((state: RootState) => state.blogPostImages);
  const { currentFavorite } = useAppSelector((state: RootState) => state.favorites);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchAllImageUrls({ tconst: movieId }));
      dispatch(fetchBlogPost(movieId));
      dispatch(fetchAuthoralReview(movieId));
      dispatch(getFavoriteById(movieId));
    }

    return () => {
      dispatch(clearBlogPostState());
      dispatch(clearImageState());
      dispatch(clearAuthoralReviewState());
      dispatch(clearFavoriteState());
    };
  }, [dispatch, movieId]);

  if ((blogPost.error && !blogPost.data) || (review.error && !review.data)) {
    return <ErrorMessage message={blogPost.error || review.error || 'Erro desconhecido'} />;
  }
  if ((blogPost.status === 'loading' && review.status === 'loading')) {
    return <Layout><SkeletonBlogPost /></Layout>;
  }
  if (!blogPost.data && !review.data) return null;

  const hasImages = imageUrls && imageUrls.length > 0;

  return (
    <Layout>
      <S.BlogPostTitleContainer>
        <h2>{blogPost.data?.primaryTitle || review.data?.primaryTitle}</h2>
        {currentFavorite && (
          <div>
            <p><em>{currentFavorite.originalTitle} ({currentFavorite.startYear}) • {currentFavorite.country} • {currentFavorite.director}</em></p>
            <br/>
          </div>
        )}
      </S.BlogPostTitleContainer>

      <S.Container hasImages={hasImages}>
        <S.ContentColumn hasImages={hasImages}>
          {review.data && (
            <div>
              {review.data.content[language].text.split('\n').map((paragraph, index) => (
                <p key={index} style={{ marginBottom: '1rem', textIndent: '32px' }}>{paragraph}</p>
              ))}
            </div>
          )}

          {blogPost.data && (
            <div style={{ marginTop: review.data ? '2rem' : 0 }}>
              <Section
                title={sectionTitles[language].introduction}
                content={blogPost.data.content[language].introduction}
              />
              <Section
                title={sectionTitles[language].stars_and_characters}
                content={blogPost.data.content[language].stars_and_characters}
              />
              <Section
                title={sectionTitles[language].historical_context}
                content={blogPost.data.content[language].historical_context}
              />
              <Section
                title={sectionTitles[language].cultural_importance}
                content={blogPost.data.content[language].cultural_importance}
              />
              <Section
                title={sectionTitles[language].technical_analysis}
                content={blogPost.data.content[language].technical_analysis}
              />
              <Section
                title={sectionTitles[language].original_movie_soundtrack}
                content={blogPost.data.original_movie_soundtrack}
              />
              <Section
                title={sectionTitles[language].conclusion}
                content={blogPost.data.content[language].conclusion}
              />
            </div>
          )}
        </S.ContentColumn>

        {hasImages && (
          <S.ImageColumn>
            <ImageGallery images={imageUrls} subtitles={subtitles} />
          </S.ImageColumn>
        )}
      </S.Container>
    </Layout>
  );
}

function ImageGallery({ images, subtitles }: { images: string[]; subtitles?: string[] }) {
  if (!images || images.length === 0) return null;

  return (
    <>
      {images.map((url, index) => (
        <S.ImageWrapper key={index}>
          <img src={url} alt={`Imagem ${index + 1}`} />
          <p>{subtitles?.[index] || ''}</p>
        </S.ImageWrapper>
      ))}
    </>
  );
}

export default CompleteArticle; 