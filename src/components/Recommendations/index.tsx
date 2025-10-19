import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLanguage } from '../../contexts/LanguageContext';
import { fetchRandomRecommendations } from '../../features/recommendations/recommendationsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import * as S from './styles';

const translations = {
  pt: {
    title: 'Recomendações',
    subtitle: 'Da minha watchlist do IMDb',
    loading: 'Carregando recomendações...',
    error: 'Erro ao carregar recomendações',
    noImage: 'Sem imagem'
  },
  en: {
    title: 'Recommendations',
    subtitle: 'From my IMDb watchlist',
    loading: 'Loading recommendations...',
    error: 'Error loading recommendations',
    noImage: 'No image'
  }
};

export default function Recommendations() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { data, status, error, total } = useAppSelector((state) => state.recommendations);
  
  const t = translations[language];

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRandomRecommendations({ count: 103, language })); // Busca todos
    }
  }, [dispatch, status, language]);

  const getThumbnailUrl = (movie: any) => {
    // Usa image_url do banco se disponível
    if (movie.image_url) {
      // Aumenta a resolução da imagem do IMDb substituindo os parâmetros
      return movie.image_url.replace(/\._V1_.*?\.jpg/, '._V1_UX180_CR0,0,180,267_AL_.jpg');
    }
    // Fallback com resolução maior
    return `https://m.media-amazon.com/images/M/${movie.tconst}_V1_UX180_CR0,0,180,267_AL_.jpg`;
  };

  const handleCardClick = (movie: any) => {
    navigate(`/movie/${movie.tconst}`);
  };

  if (status === 'loading') {
    return (
      <S.Container>
        <S.Header>
          <div>
            <S.Title>{t.title}</S.Title>
            <S.Subtitle>{t.subtitle}</S.Subtitle>
          </div>
        </S.Header>
        <S.LoadingContainer>
          {t.loading}
        </S.LoadingContainer>
      </S.Container>
    );
  }

  if (status === 'failed') {
    return (
      <S.Container>
        <S.Header>
          <div>
            <S.Title>{t.title}</S.Title>
            <S.Subtitle>{t.subtitle}</S.Subtitle>
          </div>
        </S.Header>
        <S.ErrorContainer>
          {error || t.error}
        </S.ErrorContainer>
      </S.Container>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <S.Container>
      <S.Header>
        <div>
          <S.Title>{t.title}</S.Title>
          <S.Subtitle>{t.subtitle}</S.Subtitle>
        </div>
      </S.Header>
      <S.ScrollContainer>
        <S.CardsWrapper>
          {data.map((movie) => (
            <S.MovieCard 
              key={movie.tconst}
              onClick={() => handleCardClick(movie)}
            >
              <S.Thumbnail $imageUrl={getThumbnailUrl(movie)}>
                {!getThumbnailUrl(movie) && t.noImage}
              </S.Thumbnail>
              <S.Info>
                <S.MovieTitle title={movie.title}>
                  {movie.title}
                </S.MovieTitle>
                <S.MovieMeta>
                  <S.Year>{movie.year}</S.Year>
                  <S.Rating>{movie.imdb_rating}</S.Rating>
                </S.MovieMeta>
              </S.Info>
            </S.MovieCard>
          ))}
        </S.CardsWrapper>
      </S.ScrollContainer>
    </S.Container>
  );
}

