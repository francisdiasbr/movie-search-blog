import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/types';
import { searchBlogPosts } from '../../features/blogPost/searchBlogPostSlice';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Layout } from '../../components/Layout';

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

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handleCardClick = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const entries = data?.entries || [];
  const hasEntries = entries.length > 0;

  return (
    <Layout>
      <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
        {!hasEntries && (
          <p style={{ textAlign: 'center', color: '#666' }}>Nenhum post encontrado.</p>
        )}
        {hasEntries && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {entries.map((post) => (
              <div 
                key={`${post.tconst}-${post.title}`}
                onClick={() => handleCardClick(post.tconst)}
                style={{
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  padding: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <img 
                    src="https://github.com/francisdiasbr.png" 
                    alt="Francis Dias" 
                    style={{ borderRadius: '50%', width: '40px', height: '40px', marginRight: '8px' }} 
                  />
                  <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{post.title}</h3>
                </div>
                <p style={{ color: '#999', fontSize: '0.875rem' }}>{post.created_at}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
