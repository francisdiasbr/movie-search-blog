import { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../components/Card';
import { useLanguage } from '../../contexts/LanguageContext';
import { fetchCoverImage } from '../../features/blogPost/blogPostImagesSlice';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { RootState } from '../../store/store';
import * as S from './styles';

export function Section({ title, content }: { title?: string; content: string }) {
  if (!content) return null;

  return (
    <S.Section>
      <h2>{title}</h2>
      <p>{content}</p>
    </S.Section>
  );
}

export function SpotifyEmbed({ url }: { url: string }) {
  if (!url) return null;
  const match = url.match(/spotify\.com\/(album|artist|playlist|episode|show|track)\/([^/?]+)/);
  if (!match) {
    return null;
  }
  const [, type, id] = match;
  return (
    <div style={{ margin: '0', width: '100%', borderRadius: 12, overflow: 'hidden' }}>
      <iframe
        src={`https://open.spotify.com/embed/${type}/${id}`}
        width="100%"
        height="250"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}

export function ImageGallery({ images, subtitles }: { 
  images: string[]; 
  subtitles?: { en: string; pt: string; }[] 
}) {
  const { language } = useLanguage();
  
  if (!images || images.length === 0) return null;

  return (
    <>
      {images.map((url, index) => (
        <div key={index}>
          <S.ImageWrapper>
            <img src={url} alt={`Imagem ${index + 1}`} />
          </S.ImageWrapper>
          <p>{subtitles?.[index]?.[language] || ''}</p>
        </div>
      ))}
    </>
  );
}

export function RecommendedArticles({ currentMovieId }: { currentMovieId?: string }) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { data } = useAppSelector((state: RootState) => state.blogPostsAndReviews);
  const coverImages = useAppSelector((state: RootState) => state.blogPostImages.coverImages);

  const recommendedArticles = useMemo(() => {
    if (!data) return [];

    // Combinar todos os artigos (blog posts e reviews)
    const allArticles = [
      ...(data.blogPosts?.entries || []),
      ...(data.reviews?.entries || [])
    ];

    // Filtrar o artigo atual e embaralhar
    const filteredArticles = allArticles
      .filter(article => article.tconst !== currentMovieId)
      .sort(() => Math.random() - 0.5);

    // Retornar apenas 3
    return filteredArticles.slice(0, 3);
  }, [data, currentMovieId]);

  // Não precisa mais buscar imagens - elas já vêm do /home/cards (mesma lógica da Home)
  // Mantido apenas para reviews que não têm imageUrl do S3
  useEffect(() => {
    if (recommendedArticles.length > 0) {
      recommendedArticles.forEach(article => {
        // Só busca para reviews que não têm imageUrl (blog posts já vêm com imageUrl do S3)
        if (!article.imageUrl && !coverImages[article.tconst]) {
          dispatch(fetchCoverImage({ tconst: article.tconst }));
        }
      });
    }
  }, [recommendedArticles, coverImages, dispatch]);

  const parseDate = (dateString: string) => {
    if (!dateString) return new Date();
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR');
  };

  const handleCardClick = (article: any) => {
    navigate(`/article/${article.tconst}`);
  };

  if (recommendedArticles.length === 0) return null;

  return (
    <S.RecommendedSection>
      <S.RecommendedTitle>
        {language === 'pt' ? 'Você também poderá gostar de:' : 'You might also like:'}
      </S.RecommendedTitle>
      <S.RecommendedGrid>
        {recommendedArticles.map((article) => {
          // Prioridade: 1) imageUrl dos dados, 2) coverImages do Redux, 3) undefined
          const imageUrl = article.imageUrl 
            ? encodeURI(article.imageUrl)
            : (coverImages[article.tconst] 
              ? encodeURI(coverImages[article.tconst]) 
              : undefined);
          
          return (
            <Card
              key={article.tconst}
              post={{
                tconst: article.tconst,
                primaryTitle: article.primaryTitle,
                created_at: formatDate(parseDate(article.created_at)),
                imageUrl,
              }}
              onClick={() => handleCardClick(article)}
            />
          );
        })}
      </S.RecommendedGrid>
    </S.RecommendedSection>
  );
} 