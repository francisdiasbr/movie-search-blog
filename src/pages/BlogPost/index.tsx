import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchBlogPost } from '../../features/blogPost/blogPostSlice';
import { BlogSection } from '../../components/BlogSection';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import {
  Container,
  Content,
  Header,
  Title,
  PosterContainer,
  MoviePoster,
  Main,
  Footer,
  MovieId
} from '../../styles/App.styles';
import { RootState } from '../../store/types';

function BlogPost() {
  const { movieId } = useParams();
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state: RootState) => state.blogPost);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchBlogPost(movieId));
    }
  }, [dispatch, movieId]);


  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return null;

  return (
    <Container>
      <Content>
        <Header>
          <Title>{data.title}</Title>
          <PosterContainer>
            <MoviePoster
              src={data.poster_url}
              alt={data.primaryTitle}
            />
          </PosterContainer>
        </Header>

        <Main>
          <BlogSection title="Introdução" content={data.introduction} />
          <BlogSection title="Elenco e Personagens" content={data.stars_and_characters} />
          <BlogSection title="Contexto Histórico" content={data.historical_context} />
          <BlogSection title="Importância Cultural" content={data.cultural_importance} />
          <BlogSection title="Análise Técnica" content={data.technical_analysis} />
          <BlogSection title="Trilha Sonora Original" content={data.original_movie_soundtrack} />
          <BlogSection title="Conclusão" content={data.conclusion} />
        </Main>

        <Footer>
          <MovieId>ID do Filme: {data.tconst}</MovieId>
        </Footer>
      </Content>
    </Container>
  );
}

export default BlogPost; 