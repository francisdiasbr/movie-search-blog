import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/useTheme';
import BaseService from '../../api/service';
import { Recommendation } from '../../features/recommendations/types';
import * as S from './styles';

const translations = {
  pt: {
    back: 'Voltar',
    imdbButton: 'Ver no IMDb',
    director: 'Diretor',
    year: 'Ano',
    rating: 'Avaliação',
    runtime: 'Duração',
    genres: 'Gêneros',
    loading: 'Carregando...',
    error: 'Erro ao carregar filme',
    notFound: 'Filme não encontrado'
  },
  en: {
    back: 'Back',
    imdbButton: 'View on IMDb',
    director: 'Director',
    year: 'Year',
    rating: 'Rating',
    runtime: 'Runtime',
    genres: 'Genres',
    loading: 'Loading...',
    error: 'Error loading movie',
    notFound: 'Movie not found'
  }
};

interface DirectorInfo {
  _id?: string;
  name: string;
  bio: string;
  photo: string | null;
}

export default function MovieDetail() {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [movie, setMovie] = useState<Recommendation | null>(null);
  const [directorInfo, setDirectorInfo] = useState<DirectorInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const t = translations[language];

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movieId) {
        setError(t.notFound);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Busca informações do filme
        const movieResponse = await BaseService.get<{ data: Recommendation[] }>(
          `/recommendations/all?search_term=${movieId}&page_size=1`
        );

        if (movieResponse.entries && movieResponse.entries.length > 0) {
          const movieData = movieResponse.entries[0];
          setMovie(movieData);

          // Busca informações do diretor
          if (movieData.director) {
            try {
              const directorResponse = await BaseService.get<DirectorInfo>(
                `/directors/${encodeURIComponent(movieData.director)}`
              );
              setDirectorInfo(directorResponse);
            } catch (directorError) {
              console.warn('Could not fetch director info:', directorError);
              // Continua sem informações do diretor
            }
          }
        } else {
          setError(t.notFound);
        }
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError(t.error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId, t.notFound, t.error]);

  const getThumbnailUrl = (movie: Recommendation) => {
    if (movie.image_url) {
      return movie.image_url.replace(/\._V1_.*?\.jpg/, '._V1_UX400_CR0,0,400,600_AL_.jpg');
    }
    return `https://m.media-amazon.com/images/M/${movie.tconst}_V1_UX400_CR0,0,400,600_AL_.jpg`;
  };

  const handleImdbClick = () => {
    if (movie?.url) {
      window.open(movie.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <S.Container>
        <S.Header>
          <S.BackButton onClick={handleBackClick}>
            ← {t.back}
          </S.BackButton>
        </S.Header>
        <S.LoadingContainer>
          {t.loading}
        </S.LoadingContainer>
      </S.Container>
    );
  }

  if (error || !movie) {
    return (
      <S.Container>
        <S.Header>
          <S.BackButton onClick={handleBackClick}>
            ← {t.back}
          </S.BackButton>
        </S.Header>
        <S.ErrorContainer>
          {error || t.notFound}
        </S.ErrorContainer>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={handleBackClick}>
          ← {t.back}
        </S.BackButton>
      </S.Header>

      <S.Content>
        <S.MovieSection>
          <S.MoviePoster $imageUrl={getThumbnailUrl(movie)}>
            {!getThumbnailUrl(movie) && 'Sem imagem'}
          </S.MoviePoster>
          
          <S.MovieInfo>
            <S.MovieTitle>{movie.title}</S.MovieTitle>
            
            <S.MovieMeta>
              <S.MetaItem>
                <S.MetaLabel>{t.year}</S.MetaLabel>
                <S.MetaValue>{movie.year}</S.MetaValue>
              </S.MetaItem>
              
              <S.MetaItem>
                <S.MetaLabel>{t.rating}</S.MetaLabel>
                <S.MetaValue>{movie.imdb_rating}/10</S.MetaValue>
              </S.MetaItem>
              
              <S.MetaItem>
                <S.MetaLabel>{t.runtime}</S.MetaLabel>
                <S.MetaValue>{movie.runtime} min</S.MetaValue>
              </S.MetaItem>
              
              <S.MetaItem>
                <S.MetaLabel>{t.genres}</S.MetaLabel>
                <S.MetaValue>{movie.genres}</S.MetaValue>
              </S.MetaItem>
            </S.MovieMeta>

            <S.ImdbButton onClick={handleImdbClick}>
              {t.imdbButton}
            </S.ImdbButton>
          </S.MovieInfo>
        </S.MovieSection>

        {directorInfo && (
          <S.DirectorSection>
            <S.DirectorTitle>{t.director}</S.DirectorTitle>
            
            <S.DirectorInfo>
              <S.DirectorPhoto $imageUrl={directorInfo.photo}>
                {!directorInfo.photo && 'Sem foto'}
              </S.DirectorPhoto>
              
              <S.DirectorDetails>
                <S.DirectorName>{directorInfo.name}</S.DirectorName>
                <S.DirectorBio>{directorInfo.bio}</S.DirectorBio>
              </S.DirectorDetails>
            </S.DirectorInfo>
          </S.DirectorSection>
        )}
      </S.Content>
    </S.Container>
  );
}
