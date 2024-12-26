import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ErrorMessage } from '../../components/ErrorMessage';
import { Layout } from '../../components/Layout';
import Separator from '../../components/Separator';
import SkeletonBlogPost from '../../components/SkeletonBlogPost';
import { clearImageState, fetchAllImageUrls } from '../../features/blogPost/blogPostImagesSlice';
import { clearBlogPostState, fetchBlogPost } from '../../features/blogPost/blogPostSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/types';
import * as S from './styles';

function BlogPost() {
  const { movieId } = useParams();
  const dispatch = useAppDispatch();
  const [language, setLanguage] = useState<'pt' | 'en'>(() => 
    localStorage.getItem('language') as 'pt' | 'en' || 'pt'
  );

  const { data, error, loading } = useAppSelector((state: RootState) => state.blogPost);
  const { imageUrls } = useAppSelector((state: RootState) => state.blogPostImages);

  const toggleLanguage = () => {
    const newLanguage = language === 'pt' ? 'en' : 'pt';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  useEffect(() => {
    if (movieId) {
      dispatch(fetchAllImageUrls({ tconst: movieId }));
      dispatch(fetchBlogPost(movieId));
    }

    return () => {
      dispatch(clearBlogPostState());
      dispatch(clearImageState());
    };
  }, [dispatch, movieId]);

  if (error) return <ErrorMessage message={error} />;
  if (!data && !loading) return null;

  const hasImages = imageUrls && imageUrls.length > 0;

  return (
    <Layout>
      {loading && <SkeletonBlogPost />}
      {!loading && data && (
        <>
          <S.BlogPostTitleContainer>
            <h2>{data.content[language as keyof typeof data.content].title}</h2>
          </S.BlogPostTitleContainer>
          <S.Container hasImages={hasImages}>
            <S.ContentColumn hasImages={hasImages}>
              <Section title="Introdução" content={data.content[language as keyof typeof data.content].introduction} />
              <Section title="Elenco e Personagens" content={data.content[language as keyof typeof data.content].stars_and_characters} />
              <Section title="Contexto Histórico" content={data.content[language as keyof typeof data.content].historical_context} />
              <Section title="Importância Cultural" content={data.content[language as keyof typeof data.content].cultural_importance} />
              <Section title="Análise Técnica" content={data.content[language as keyof typeof data.content].technical_analysis} />
              <Section title="Trilha Sonora Original" content={data.original_movie_soundtrack} />
              <Section title="Conclusão" content={data.content[language as keyof typeof data.content].conclusion} />
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
