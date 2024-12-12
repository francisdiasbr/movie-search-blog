import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/types';
import { searchBlogPosts } from '../../features/blogPost/searchBlogPostSlice';
import { Card, CardTitle, CardContent } from '../../styles/Card.styles';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';

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
    <div>
      {data.entries.map((post) => (
        <Card 
          key={`${post.tconst}-${post.title}`}
          onClick={() => handleCardClick(post.tconst)}
          style={{ cursor: 'pointer' }}
        >
          <CardTitle>{post.title}</CardTitle>
          <CardContent>Filme: {post.primaryTitle}</CardContent>
        </Card>
      ))}
    </div>
  );
}