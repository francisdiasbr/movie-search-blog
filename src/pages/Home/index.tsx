import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../components/Card';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Layout } from '../../components/Layout';
import { searchBlogPosts } from '../../features/blogPost/searchBlogPostSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/types';
import { GridContainer } from './styles';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, error } = useAppSelector((state: RootState) => state.searchBlogPost);
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(async () => {
    const params = {
      filters: query.trim()
        ? {
            $or: [
              { title: { $regex: query.trim(), $options: 'i' } },
              { primaryTitle: { $regex: query.trim(), $options: 'i' } },
              { introduction: { $regex: query.trim(), $options: 'i' } },
            ],
          }
        : {},
    };

    await dispatch(searchBlogPosts(params));
  }, [query, dispatch]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handleCardClick = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  if (error) return <ErrorMessage message={error} />;

  const entries = data?.entries || [];
  const hasEntries = entries.length > 0;

  return (
    <Layout>
      <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
        {!hasEntries && <p style={{ textAlign: 'center', color: '#666' }}>Nenhum post encontrado.</p>}
        {hasEntries && (
          <GridContainer>
            {entries.map(post => (
              <Card key={`${post.tconst}-${post.title}`} post={post} onClick={handleCardClick} />
            ))}
          </GridContainer>
        )}
      </div>
    </Layout>
  );
}
