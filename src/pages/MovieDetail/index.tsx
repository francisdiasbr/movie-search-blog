import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import BaseService from '../../api/service';
import { useLanguage } from '../../contexts/LanguageContext';
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
    notFound: 'Filme não encontrado',
    soundtrack: 'Trilha Sonora',
    playPreview: 'Tocar Preview',
    openSpotify: 'Abrir no Spotify',
    noPreview: 'Preview não disponível'
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
    notFound: 'Movie not found',
    soundtrack: 'Soundtrack',
    playPreview: 'Play Preview',
    openSpotify: 'Open in Spotify',
    noPreview: 'Preview not available'
  }
};

interface DirectorInfo {
  _id?: string;
  name: string;
  bio: string;
  photo: string | null;
}

interface Track {
  title: string;
  artist: string;
  spotify_id: string | null;
  preview_url: string | null;
  external_urls: {
    spotify?: string;
  };
  album: {
    name: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
  } | null;
  duration_ms: number | null;
  description: string;
}

interface SoundtrackInfo {
  _id?: string;
  movie_title: string;
  movie_year: number | null;
  movie_director: string | null;
  tracks: Track[];
  description: string;
  source: string;
}

export default function MovieDetail() {
  const { movieId } = useParams<{ movieId: string }>();
  const { language } = useLanguage();
  const [movie, setMovie] = useState<Recommendation | null>(null);
  const [directorInfo, setDirectorInfo] = useState<DirectorInfo | null>(null);
  const [soundtrackInfo, setSoundtrackInfo] = useState<SoundtrackInfo | null>(null);
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

          // Atualiza o título da página
          document.title = `${movieData.title} (${movieData.year}) - Movie Search Blog`;

          // Busca informações do diretor
          if (movieData.director) {
            try {
              const directorResponse = await BaseService.get<DirectorInfo>(
                `/directors/${encodeURIComponent(movieData.director)}?tconst=${movieData.tconst}`
              );
              setDirectorInfo(directorResponse);
            } catch (directorError) {
              console.warn('Could not fetch director info:', directorError);
              // Continua sem informações do diretor
            }
          }

          // Busca trilha sonora do filme
          try {
            const soundtrackResponse = await BaseService.get<SoundtrackInfo>(
              `/music/soundtrack?title=${encodeURIComponent(movieData.title)}&year=${movieData.year}&director=${encodeURIComponent(movieData.director || '')}`
            );
            setSoundtrackInfo(soundtrackResponse);
          } catch (soundtrackError) {
            console.warn('Could not fetch soundtrack info:', soundtrackError);
            // Continua sem informações da trilha sonora
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

  const handleImdbClick = useCallback(() => {
    if (movie?.url) {
      window.open(movie.url, '_blank', 'noopener,noreferrer');
    }
  }, [movie?.url]);


  if (loading) {
    return (
      <S.Container role="main" aria-label="Carregando detalhes do filme">
        <S.LoadingContainer 
          role="status" 
          aria-live="polite"
          aria-label="Carregando informações do filme"
        >
          {t.loading}
        </S.LoadingContainer>
      </S.Container>
    );
  }

  if (error || !movie) {
    return (
      <S.Container role="main" aria-label="Erro ao carregar filme">
        <S.ErrorContainer 
          role="alert" 
          aria-live="assertive"
          aria-label="Erro ao carregar informações do filme"
        >
          {error || t.notFound}
        </S.ErrorContainer>
      </S.Container>
    );
  }

  return (
    <S.Container 
      role="main" 
      aria-label="Detalhes do filme"
    >
      <S.Content>
        <S.MovieSection>
          <S.MoviePoster 
            $imageUrl={getThumbnailUrl(movie)}
            role="img"
            aria-label={`Poster do filme ${movie.title}`}
          >
            {!getThumbnailUrl(movie) && 'Sem imagem'}
          </S.MoviePoster>
          
          <S.MovieInfo>
            <S.MovieTitle id="movie-title">{movie.title}</S.MovieTitle>
            
            <S.MovieMeta role="list" aria-label="Informações do filme">
              <S.MetaItem role="listitem">
                <S.MetaLabel>{t.year}</S.MetaLabel>
                <S.MetaValue aria-label={`Ano de lançamento: ${movie.year}`}>{movie.year}</S.MetaValue>
              </S.MetaItem>
              
              <S.MetaItem role="listitem">
                <S.MetaLabel>{t.rating}</S.MetaLabel>
                <S.MetaValue aria-label={`Avaliação IMDb: ${movie.imdb_rating} de 10`}>{movie.imdb_rating}/10</S.MetaValue>
              </S.MetaItem>
              
              <S.MetaItem role="listitem">
                <S.MetaLabel>{t.runtime}</S.MetaLabel>
                <S.MetaValue aria-label={`Duração: ${movie.runtime} minutos`}>{movie.runtime} min</S.MetaValue>
              </S.MetaItem>
              
              <S.MetaItem role="listitem">
                <S.MetaLabel>{t.genres}</S.MetaLabel>
                <S.MetaValue aria-label={`Gêneros: ${movie.genres}`}>{movie.genres}</S.MetaValue>
              </S.MetaItem>
            </S.MovieMeta>

            <S.ImdbButton 
              onClick={handleImdbClick}
            >
              <S.ImdbIcon>🎬 {' '} {t.imdbButton}</S.ImdbIcon>
            </S.ImdbButton>
          </S.MovieInfo>
        </S.MovieSection>

        {directorInfo && (
          <S.DirectorSection>
            <S.DirectorTitle id="director-title">{t.director}</S.DirectorTitle>
            
            <S.DirectorInfo>
              <S.DirectorPhoto 
                $imageUrl={directorInfo.photo}
                role="img"
                aria-label={directorInfo.photo ? `Foto do diretor ${directorInfo.name}` : `Sem foto do diretor ${directorInfo.name}`}
              >
                {!directorInfo.photo && 'Sem foto'}
              </S.DirectorPhoto>
              
              <S.DirectorDetails>
                <S.DirectorName id="director-name">{directorInfo.name}</S.DirectorName>
                <S.DirectorBio 
                  aria-label={`Biografia do diretor ${directorInfo.name}`}
                  aria-describedby="director-name"
                >
                  {directorInfo.bio}
                </S.DirectorBio>
              </S.DirectorDetails>
            </S.DirectorInfo>
          </S.DirectorSection>
        )}

        {soundtrackInfo && (
          <S.SoundtrackSection>
            <S.SoundtrackTitle id="soundtrack-title">{t.soundtrack}</S.SoundtrackTitle>
            
            {soundtrackInfo.description && (
              <S.SoundtrackDescription>
                {soundtrackInfo.description}
              </S.SoundtrackDescription>
            )}
            
            <S.TracksList>
              {soundtrackInfo.tracks.map((track, index) => (
                <S.TrackItem key={index}>
                  <S.TrackAlbumCover 
                    $imageUrl={track.album?.images?.[0]?.url || null}
                  >
                    {!track.album?.images?.[0]?.url && '🎵'}
                  </S.TrackAlbumCover>
                  
                  <S.TrackInfo>
                    <S.TrackTitle>{track.title}</S.TrackTitle>
                    <S.TrackArtist>{track.artist}</S.TrackArtist>
                    {track.description && (
                      <S.TrackDescription>{track.description}</S.TrackDescription>
                    )}
                  </S.TrackInfo>
                  
                  <S.TrackActions>
                    {track.preview_url && (
                      <S.TrackButton $variant="primary" title={t.playPreview}>
                        ▶️ {t.playPreview}
                      </S.TrackButton>
                    )}
                    {track.external_urls?.spotify && (
                      <S.TrackButton 
                        $variant="secondary" 
                        title={t.openSpotify}
                        onClick={() => window.open(track.external_urls?.spotify, '_blank')}
                      >
                        🎵 {t.openSpotify}
                      </S.TrackButton>
                    )}
                  </S.TrackActions>
                </S.TrackItem>
              ))}
            </S.TracksList>
          </S.SoundtrackSection>
        )}
      </S.Content>
    </S.Container>
  );
}
