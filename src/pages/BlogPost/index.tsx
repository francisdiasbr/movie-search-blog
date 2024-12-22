import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchBlogPost } from '../../features/blogPost/blogPostSlice';
// import { fetchAllImageUrls } from '../../features/blogPost/blogPostImagesSlice';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import { RootState } from '../../store/types';
import { Layout } from '../../components/Layout';
// import { AvatarCard } from '../../components/AvatarCard';
import { Separator } from "@/components/ui/separator";
import * as S from './styles';

function BlogPost() {
  const { movieId } = useParams();
  const dispatch = useAppDispatch();

  const { data, loading, error } = useAppSelector((state: RootState) => state.blogPost);
  const { imageUrls } = useAppSelector((state: RootState) => state.blogPostImages);

  console.log('imageUrls', imageUrls);
  useEffect(() => {
    if (movieId) {
      // dispatch(fetchAllImageUrls({ tconst: movieId }));
      dispatch(fetchBlogPost(movieId));
    }
  }, [dispatch, movieId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return null;

  return (
    <Layout>
      <div>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontWeight: '600' }}>{data.title}</h2>
          {/* <p>{data.created_at}</p> */}
        </div>
        {/* <AvatarCard
          name="Francis Dias"
          imageUrl="https://github.com/francisdiasbr.png"
          fallback="FD"
        /> */}
        <S.Container style={{ display: 'flex', flexDirection: 'row' }}>
          <S.ContentColumn>
            <Section title="Introdução" content={data.introduction} />
            <Section title="Elenco e Personagens" content={data.stars_and_characters} />
            <Section title="Contexto Histórico" content={data.historical_context} />
            <Section title="Importância Cultural" content={data.cultural_importance} />
            <Section title="Análise Técnica" content={data.technical_analysis} />
            <Section title="Trilha Sonora Original" content={data.original_movie_soundtrack} />
            <Section title="Conclusão" content={data.conclusion} />
          </S.ContentColumn>
          <S.ImageColumn>
            <ImageGallery images={imageUrls ?? []} />
          </S.ImageColumn>
        </S.Container>
      </div>
      {data.poster_url && (
        <div style={{ width: '25%', margin: '0 auto', aspectRatio: 2 / 3, backgroundColor: '#f9fafb', borderRadius: '8px', overflow: 'hidden' }}>
          <img
            src={data.poster_url}
            alt={data.primaryTitle}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </Layout>
  );
}

// Componente auxiliar para as seções
function Section({ title, content }: { title: string; content: string }) {
  if (!content) return null;

  return (
    <div style={{ marginBottom: '16px' }}>
      <div>
        <h2>{title}</h2>
        <Separator className="mb-4" />
        <p>{content}</p>
      </div>
    </div>
  );
}

// Componente auxiliar para exibir imagens
function ImageGallery({ images }: { images: string[] }) {
  if (!images || images.length === 0) return null;

  return (
    <div>
      {images.map((url, index) => (
        <div key={index}>
          <img src={url} alt={`Imagem ${index + 1}`} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}

export default BlogPost; 