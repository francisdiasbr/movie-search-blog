import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/types';
import { searchBlogPosts } from '../../features/blogPost/searchBlogPostSlice';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state: RootState) => state.searchBlogPost);

  useEffect(() => {
    const params = {
      filters: {},
    };
    dispatch(searchBlogPosts(params));
  }, [dispatch]);

  const handleCardClick = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data?.entries?.length) return null;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.entries.map((post) => (
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
              <p className="text-slate-500 dark:text-slate-400">
                {post.primaryTitle}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}