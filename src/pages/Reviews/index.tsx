import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/types';
import { searchBlogPosts } from '../../features/blogPost/searchBlogPostSlice';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Layout } from '../../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state: RootState) => state.searchBlogPost);
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(async () => {
    console.log('Texto digitado:', query);
    console.log('Texto após trim:', query.trim());
    
    const params = {
      filters: query.trim() ? {
        $or: [
          { title: { $regex: query.trim(), $options: "i" } },
          { primaryTitle: { $regex: query.trim(), $options: "i" } },
          { introduction: { $regex: query.trim(), $options: "i" } }
        ]
      } : {}
    };
    console.log('Parâmetros enviados para API:', params);
    
    await dispatch(searchBlogPosts(params));
  }, [query, dispatch]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Mudança no input:', e.target.value);
    setQuery(e.target.value);
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
              <Card 
                key={`${post.tconst}-${post.title}`}
                onClick={() => handleCardClick(post.tconst)}
                className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors w-full"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/francisdiasbr.png" alt="Francis Dias" />
                      <AvatarFallback>FD</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl font-semibold">{post.title}</CardTitle>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-right">
                    {post.created_at}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}