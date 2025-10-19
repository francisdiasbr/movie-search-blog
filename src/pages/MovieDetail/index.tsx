import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import BaseService from '../../api/service';
import { Layout } from '../../components/Layout';
import { useLanguage } from '../../contexts/LanguageContext';
import { Recommendation } from '../../features/recommendations/types';
import * as S from './styles';

const translations = {
  pt: {
    back: 'Voltar',
    imdbButton: 'Ver no IMDb',
    director: 'Diretor',
    directors: 'Diretores',
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
    noPreview: 'Preview não disponível',
    noImage: 'Sem imagem',
    noPhoto: 'Sem foto',
    moviePoster: 'Poster do filme',
    releaseYear: 'Ano de lançamento',
    imdbRating: 'Avaliação IMDb',
    duration: 'Duração',
    movieGenres: 'Gêneros',
    directorPhoto: 'Foto do diretor',
    directorBio: 'Biografia do diretor',
    movieDetails: 'Detalhes do filme',
    loadingMovieDetails: 'Carregando detalhes do filme',
    loadingMovieInfo: 'Carregando informações do filme',
    errorLoadingMovie: 'Erro ao carregar filme',
    errorLoadingMovieInfo: 'Erro ao carregar informações do filme'
  },
  en: {
    back: 'Back',
    imdbButton: 'View on IMDb',
    director: 'Director',
    directors: 'Directors',
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
    noPreview: 'Preview not available',
    noImage: 'No image',
    noPhoto: 'No photo',
    moviePoster: 'Movie poster',
    releaseYear: 'Release year',
    imdbRating: 'IMDb rating',
    duration: 'Duration',
    movieGenres: 'Genres',
    directorPhoto: 'Director photo',
    directorBio: 'Director biography',
    movieDetails: 'Movie details',
    loadingMovieDetails: 'Loading movie details',
    loadingMovieInfo: 'Loading movie information',
    errorLoadingMovie: 'Error loading movie',
    errorLoadingMovieInfo: 'Error loading movie information'
  }
};

interface DirectorInfo {
  _id?: string;
  name: string;
  bio: string;
  photo: string | null;
  directors?: DirectorInfo[]; // Para múltiplos diretores
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
        
        console.log(`🎬 [FRONTEND] Iniciando busca para filme: ${movieId} (idioma: ${language})`);
        const totalStart = performance.now();

        // Busca informações do filme
        console.log(`📊 [FRONTEND] Buscando dados do filme...`);
        const movieStart = performance.now();
        const movieResponse = await BaseService.get<{ data: Recommendation[] }>(
          `/recommendations/all?search_term=${movieId}&page_size=1`,
          {},
          language
        );
        const movieTime = performance.now() - movieStart;
        console.log(`📊 [FRONTEND] Dados do filme: ${movieTime.toFixed(2)}ms`);

        if (movieResponse.entries && movieResponse.entries.length > 0) {
          const movieData = movieResponse.entries[0];
          setMovie(movieData);

          // Atualiza o título da página
          document.title = `${movieData.title} (${movieData.year}) - Movie Search Blog`;

          // ✅ OTIMIZAÇÃO: Requisições paralelas para diretor e trilha sonora
          const promises = [];

          // Busca informações do diretor (se existir)
          if (movieData.director) {
            promises.push(
              BaseService.get<DirectorInfo>(
                `/directors/${encodeURIComponent(movieData.director)}?tconst=${movieData.tconst}`,
                {},
                language
              ).then(response => ({ type: 'director', data: response }))
              .catch(error => {
                console.warn('Could not fetch director info:', error);
                return { type: 'director', data: null };
              })
            );
          }

          // Busca trilha sonora do filme
          promises.push(
            BaseService.get<SoundtrackInfo>(
              `/music/soundtrack?title=${encodeURIComponent(movieData.title)}&year=${movieData.year}&director=${encodeURIComponent(movieData.director || '')}`,
              {},
              language
            ).then(response => ({ type: 'soundtrack', data: response }))
            .catch(error => {
              console.warn('Could not fetch soundtrack info:', error);
              return { type: 'soundtrack', data: null };
            })
          );

          // Executa todas as requisições em paralelo
          console.log(`🚀 [FRONTEND] Executando ${promises.length} requisições em paralelo...`);
          const parallelStart = performance.now();
          const results = await Promise.all(promises);
          const parallelTime = performance.now() - parallelStart;
          console.log(`📊 [FRONTEND] Requisições paralelas: ${parallelTime.toFixed(2)}ms`);
          
          // Processa os resultados
          results.forEach(result => {
            if (result.type === 'director' && result.data) {
              setDirectorInfo(result.data);
            } else if (result.type === 'soundtrack' && result.data) {
              setSoundtrackInfo(result.data);
            }
          });
          
          const totalTime = performance.now() - totalStart;
          console.log(`✅ [FRONTEND] Total: ${totalTime.toFixed(2)}ms`);
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
  }, [movieId, language, t.notFound, t.error]);

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
      <Layout>
        <S.Container role="main" aria-label={t.loadingMovieDetails}>
          <S.LoadingContainer 
            role="status" 
            aria-live="polite"
            aria-label={t.loadingMovieInfo}
          >
            {t.loading}
          </S.LoadingContainer>
        </S.Container>
      </Layout>
    );
  }

  if (error || !movie) {
    return (
      <Layout>
        <S.Container role="main" aria-label={t.errorLoadingMovie}>
          <S.ErrorContainer 
            role="alert" 
            aria-live="assertive"
            aria-label={t.errorLoadingMovieInfo}
          >
            {error || t.notFound}
          </S.ErrorContainer>
        </S.Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <S.Container 
        role="main" 
        aria-label={t.movieDetails}
      >
        <S.Content>
        <S.MovieSection>
          <S.MoviePoster 
            $imageUrl={getThumbnailUrl(movie)}
            role="img"
            aria-label={`${t.moviePoster} ${movie.title}`}
          >
            {!getThumbnailUrl(movie) && t.noImage}
          </S.MoviePoster>
          
          <S.MovieInfo>
            <S.MovieTitle id="movie-title">{movie.title}</S.MovieTitle>
            
            <S.MovieMeta role="list" aria-label={t.movieDetails}>
              <S.MetaItem role="listitem">
                <S.MetaLabel>{t.year}</S.MetaLabel>
                <S.MetaValue aria-label={`${t.releaseYear}: ${movie.year}`}>{movie.year}</S.MetaValue>
              </S.MetaItem>
              
              <S.MetaItem role="listitem">
                <S.MetaLabel>{t.rating}</S.MetaLabel>
                <S.MetaValue aria-label={`${t.imdbRating}: ${movie.imdb_rating} de 10`}>{movie.imdb_rating}/10</S.MetaValue>
              </S.MetaItem>
              
              <S.MetaItem role="listitem">
                <S.MetaLabel>{t.runtime}</S.MetaLabel>
                <S.MetaValue aria-label={`${t.duration}: ${movie.runtime} minutos`}>{movie.runtime} min</S.MetaValue>
              </S.MetaItem>
              
              <S.MetaItem role="listitem">
                <S.MetaLabel>{t.genres}</S.MetaLabel>
                <S.MetaValue aria-label={`${t.movieGenres}: ${movie.genres}`}>{movie.genres}</S.MetaValue>
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
            <S.DirectorTitle id="director-title">
              {directorInfo.directors && directorInfo.directors.length > 1 ? t.directors : t.director}
            </S.DirectorTitle>
            
            {directorInfo.directors && directorInfo.directors.length > 1 ? (
              // Exibe múltiplos diretores
              <div>
                {directorInfo.directors.map((director, index) => (
                  <S.DirectorInfo key={index} style={{ marginBottom: index < directorInfo.directors!.length - 1 ? '24px' : '0' }}>
                    <S.DirectorPhoto 
                      $imageUrl={director.photo}
                      role="img"
                      aria-label={director.photo ? `${t.directorPhoto} ${director.name}` : `${t.noPhoto} ${director.name}`}
                    >
                      {!director.photo && t.noPhoto}
                    </S.DirectorPhoto>
                    
                    <S.DirectorDetails>
                      <S.DirectorName id={`director-name-${index}`}>{director.name}</S.DirectorName>
                      <S.DirectorBio 
                        aria-label={`${t.directorBio} ${director.name}`}
                        aria-describedby={`director-name-${index}`}
                      >
                        {director.bio}
                      </S.DirectorBio>
                    </S.DirectorDetails>
                  </S.DirectorInfo>
                ))}
              </div>
            ) : (
              // Exibe um único diretor
              <S.DirectorInfo>
                <S.DirectorPhoto 
                  $imageUrl={directorInfo.photo}
                  role="img"
                  aria-label={directorInfo.photo ? `${t.directorPhoto} ${directorInfo.name}` : `${t.noPhoto} ${directorInfo.name}`}
                >
                  {!directorInfo.photo && t.noPhoto}
                </S.DirectorPhoto>
                
                <S.DirectorDetails>
                  <S.DirectorName id="director-name">{directorInfo.name}</S.DirectorName>
                  <S.DirectorBio 
                    aria-label={`${t.directorBio} ${directorInfo.name}`}
                    aria-describedby="director-name"
                  >
                    {directorInfo.bio}
                  </S.DirectorBio>
                </S.DirectorDetails>
              </S.DirectorInfo>
            )}
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
    </Layout>
  );
}
