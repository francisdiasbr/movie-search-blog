import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ErrorMessage } from '../../components/ErrorMessage';
import { Layout } from '../../components/Layout';
import SkeletonBlogPost from '../../components/SkeletonBlogPost';
import { useLanguage } from '../../contexts/LanguageContext';
import { clearAuthoralReviewState, fetchAuthoralReview } from '../../features/authoralReview/authoralReviewSlice';
import { clearImageState, fetchAllImageUrls } from '../../features/blogPost/blogPostImagesSlice';
import { clearFavoriteState, getFavoriteById } from '../../features/favorites/favoritesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import * as S from './styles';

function Review() {
  const { movieId } = useParams();
  const { language } = useLanguage();

  const dispatch = useAppDispatch();
  
  const { data, error, status } = useAppSelector(state => state.authoralReview);
  const { imageUrls } = useAppSelector(state => state.blogPostImages);
  const { currentFavorite } = useAppSelector((state: RootState) => state.favorites);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchAllImageUrls({ tconst: movieId }));
      dispatch(fetchAuthoralReview(movieId));
      dispatch(getFavoriteById(movieId));
    }

    return () => {
      dispatch(clearImageState());
      dispatch(clearAuthoralReviewState());
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
                <p><em>{currentFavorite.startYear} • {currentFavorite.country} • {currentFavorite.director}</em></p>
                <br/>
              </div>
            )}
          </S.BlogPostTitleContainer>
          <S.Container hasImages={hasImages}>
            <S.ContentColumn hasImages={hasImages}>
              {data.content[language].text.split('\n').map((paragraph, index) => (
                <p key={index} style={{ marginBottom: '1rem' }}>{paragraph}</p>
              ))}
          </S.ContentColumn>
          {hasImages && (
            <S.ImageColumn>
              <ImageGallery images={imageUrls} />
              </S.ImageColumn>
            )}
          </S.Container>
        </>
      )}
    </Layout>
  );
} 

function ImageGallery({ images }: { images: string[] }) {
  if (!images || images.length === 0) return null;

  return (
    <>
      {images.map((url, index) => (
        <S.ImageWrapper key={index}>
          <img src={url} alt={`Imagem ${index + 1}`} />
        </S.ImageWrapper>
      ))}
    </>
  );
}

export default Review;