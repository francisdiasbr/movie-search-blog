import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Chip from '../../components/Chip';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Layout } from '../../components/Layout';
import Separator from '../../components/Separator';
import SkeletonBlogPost from '../../components/SkeletonBlogPost';
import { useLanguage } from '../../contexts/LanguageContext';
import { clearImageState, fetchAllImageUrls } from '../../features/blogPost/blogPostImagesSlice';
import { clearBlogPostState, fetchBlogPost } from '../../features/blogPost/blogPostSlice';
import { searchFavorites } from '../../features/favorites/favoritesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/types';
import * as S from './styles';

const sectionTitles = {
  pt: {
    introduction: 'Introdução',
    stars_and_characters: 'Elenco e Personagens',
    historical_context: 'Contexto Histórico',
    cultural_importance: 'Importância Cultural',
    technical_analysis: 'Análise Técnica',
    original_movie_soundtrack: 'Trilha Sonora Original',
    conclusion: 'Conclusão'
  },
  en: {
    introduction: 'Introduction',
    stars_and_characters: 'Cast and Characters',
    historical_context: 'Historical Context',
    cultural_importance: 'Cultural Importance',
    technical_analysis: 'Technical Analysis',
    original_movie_soundtrack: 'Original Soundtrack',
    conclusion: 'Conclusion'
  }
};

function BlogPost() {
  const { movieId } = useParams();
  const dispatch = useAppDispatch();
  const { language } = useLanguage();

  const { data, error, loading } = useAppSelector((state: RootState) => state.blogPost);
  const { imageUrls } = useAppSelector((state: RootState) => state.blogPostImages);
  const { data: favoritesData } = useAppSelector((state: RootState) => state.favorites);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchAllImageUrls({ tconst: movieId }));
      dispatch(fetchBlogPost(movieId));
      dispatch(searchFavorites({ filters: { tconst: movieId } }));
    }

    return () => {
      dispatch(clearBlogPostState());
      dispatch(clearImageState());
    };
  }, [dispatch, movieId]);

  if (error) return <ErrorMessage message={error} />;
  if (!data && !loading) return null;

  const hasImages = imageUrls && imageUrls.length > 0;
  const currentMovie = favoritesData?.entries?.[0];

  return (
    <Layout>
      {loading && <SkeletonBlogPost />}
      {!loading && data && (
        <>
          <S.BlogPostTitleContainer>
            <h2>{data.content[language].title}</h2>
          </S.BlogPostTitleContainer>
          <S.Container hasImages={hasImages}>
            <S.ContentColumn hasImages={hasImages}>
              <S.ChipsContainer>
                {currentMovie?.plot_keywords
                  ?.slice(0, 10)
                  .map((keyword, index) => (
                    <Chip key={index} label={keyword} />
                  ))}
              </S.ChipsContainer>
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
                <ImageGallery images={imageUrls} />
              </S.ImageColumn>
            )}
          </S.Container>
          {data.poster_url && (
            <S.PosterContainer>
              <img src={data.poster_url} alt={data.primaryTitle} />
            </S.PosterContainer>
          )}
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

export default BlogPost;
