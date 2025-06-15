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
import { Section, SpotifyEmbed, ImageGallery } from './Components';
import { sectionTitles } from './sectionTitles';
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
            <p><em>{currentFavorite.startYear} • {currentFavorite.country} • {currentFavorite.director}</em></p>
            <br />
          </div>
        )}
      </S.BlogPostTitleContainer>

      <S.Container hasImages={hasImages}>
        <S.ContentColumn hasImages={hasImages}>
          {review.data && (
            <div>
              {review.data.content[language].text.split('\n').map((paragraph, index) => (
                <p key={index} style={{ marginBottom: '1rem' }}>{paragraph}</p>
              ))}
            </div>
          )}

          {blogPost.data && (
            <div style={{ marginTop: review.data ? '2rem' : 0 }}>
              <S.SectionContainer>
                <Section
                  title={sectionTitles[language].introduction}
                  content={blogPost.data.content[language].introduction}
                />
                <Section
                  title={sectionTitles[language].plot_summary}
                  content={blogPost.data.content[language].plot_summary}
                />
                <Section
                  title={sectionTitles[language].acting_analysis}
                  content={blogPost.data.content[language].acting_analysis}
                />
              </S.SectionContainer>
              <S.SectionBottom>
              <Section
                title={sectionTitles[language].personal_impressions}
                content={blogPost.data.content[language].personal_impressions}
              />
              </S.SectionBottom>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <Section
                title={sectionTitles[language].recommendations}
                content={blogPost.data.content[language].recommendations}
              />
              </div>
              {blogPost.data.spotify_album_url && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h2>{sectionTitles[language].original_movie_soundtrack}</h2>
                  <SpotifyEmbed url={blogPost.data.spotify_album_url} />
                </div>
              )}
              {blogPost.data.references && blogPost.data.references.length > 0 && (
                <S.SectionBottom>
                  <h2>Referências</h2>
                  <ol style={{ paddingLeft: '32px' }}>
                    {blogPost.data.references.map((reference, index) => (
                      <li key={index} style={{ marginBottom: '0.5rem' }}>
                        <a
                          href={reference}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: '#2563eb',
                            textDecoration: 'underline'
                          }}
                        >
                          {reference}
                        </a>
                      </li>
                    ))}
                  </ol>
                </S.SectionBottom>
              )}
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

export default CompleteArticle; 