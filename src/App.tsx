import { useEffect, useState } from 'react';
import { fetchMovieBlogPost } from './services/api';
import { MovieBlogPost } from './types/movie';
import { BlogSection } from './components/BlogSection';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { MovieIdInput } from './components/MovieIdInput';
import { GlobalStyles } from './styles/GlobalStyles';
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
} from './styles/App.styles';

function App() {
  const [movieId, setMovieId] = useState('tt0059319');
  const [blogPost, setBlogPost] = useState<MovieBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBlogPost = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMovieBlogPost(id);
      setBlogPost(data);
    } catch (err) {
      setError('Falha ao carregar o post do blog. Por favor, tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogPost(movieId);
  }, []);

  const handleMovieIdSubmit = () => {
    if (movieId.trim()) {
      loadBlogPost(movieId);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!blogPost) return null;

  return (
    <>
      <GlobalStyles />
      <Container>
        <Content>
          <MovieIdInput
            value={movieId}
            onChange={setMovieId}
            onSubmit={handleMovieIdSubmit}
          />
          
          <Header>
            <Title>{blogPost.data.title}</Title>
            <PosterContainer>
              <MoviePoster
                src={blogPost.data.poster_url}
                alt={blogPost.data.primaryTitle}
              />
            </PosterContainer>
          </Header>

          <Main>
            <BlogSection title="Introdução" content={blogPost.data.introduction} />
            <BlogSection title="Elenco e Personagens" content={blogPost.data.stars_and_characters} />
            <BlogSection title="Contexto Histórico" content={blogPost.data.historical_context} />
            <BlogSection title="Importância Cultural" content={blogPost.data.cultural_importance} />
            <BlogSection title="Análise Técnica" content={blogPost.data.technical_analysis} />
            <BlogSection title="Trilha Sonora Original" content={blogPost.data.original_movie_soundtrack} />
            <BlogSection title="Conclusão" content={blogPost.data.conclusion} />
          </Main>

          <Footer>
            <MovieId>ID do Filme: {blogPost.data.tconst}</MovieId>
          </Footer>
        </Content>
      </Container>
    </>
  );
}

export default App;