import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/types';
import { searchBlogPosts } from '../../features/blogPost/searchBlogPostSlice';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Layout } from '../../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { ReviewCard } from '@/components/ReviewCard/ReviewCard';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state: RootState) => state.searchBlogPost);
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(async () => {
    const params = {
      filters: query.trim() ? {
        $or: [
          { title: { $regex: query.trim(), $options: "i" } },
          { primaryTitle: { $regex: query.trim(), $options: "i" } },
          { introduction: { $regex: query.trim(), $options: "i" } }
        ]
      } : {}
    };
    await dispatch(searchBlogPosts(params));
  }, [query, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCardClick = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  const entries = data?.entries || [];
  const hasEntries = entries.length > 0;

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex items-center border-b border-gray-300 py-2">
          <Input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Pesquisar por título do post ou nome do filme"
          />
          <Button 
            onClick={handleSearch}
            className="ml-2 px-4 py-1 bg-slate-800 text-white rounded-r hover:bg-slate-700"
          >
            Buscar
          </Button>
        </div>
        {!hasEntries && (
          <p className="text-center text-gray-500 mt-4">Nenhum post encontrado.</p>
        )}
        {hasEntries && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            {entries.map((post) => (
              <ReviewCard 
                key={post.tconst}
                post={post}
                onClick={handleCardClick}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}