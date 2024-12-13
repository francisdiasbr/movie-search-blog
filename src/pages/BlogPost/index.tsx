import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchBlogPost } from '../../features/blogPost/blogPostSlice';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import { RootState } from '../../store/types';
import { Layout } from '../../components/Layout';
import { AvatarCard } from '../../components/AvatarCard';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    <Layout>
      <div className="container mx-auto p-4 max-w-4xl">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-4 mb-4">
              <div>
                <CardTitle className="text-2xl font-bold">{data.title}</CardTitle>
                <p className="text-slate-500">{data.created_at}</p>
              </div>
            </div>
            {data.poster_url && (
              <div className="w-1/4 mx-auto aspect-[2/3] bg-slate-100 rounded-lg overflow-hidden">
                <img 
                  src={data.poster_url} 
                  alt={data.primaryTitle}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-8">
            <AvatarCard 
              name="Francis Dias" 
              imageUrl="https://github.com/francisdiasbr.png" 
              fallback="FD" 
            />
            <Section title="Introdução" content={data.introduction} />
            <Section title="Elenco e Personagens" content={data.stars_and_characters} />
            <Section title="Contexto Histórico" content={data.historical_context} />
            <Section title="Importância Cultural" content={data.cultural_importance} />
            <Section title="Análise Técnica" content={data.technical_analysis} />
            <Section title="Trilha Sonora Original" content={data.original_movie_soundtrack} />
            <Section title="Conclusão" content={data.conclusion} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

// Componente auxiliar para as seções
function Section({ title, content }: { title: string; content: string }) {
  if (!content) return null;
  
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <Separator className="mb-4" />
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
}

export default BlogPost; 