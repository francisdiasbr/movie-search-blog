import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../components/Card';
import SkeletonCard from '../../components/Card/Skeleton';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Layout } from '../../components/Layout';
import ReviewSearch from '../../components/ReviewSearch';
import { searchBlogPosts } from '../../features/blogPost/searchBlogPostSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/types';
import * as S from './styles';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, error, loading } = useAppSelector(
    (state: RootState) => state.searchBlogPost
  );
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

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
        <ReviewSearch
          query={query}
          onInputChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onSearch={handleSearch}
        />
        {loading && (
          <S.GridContainer>
            {[...Array(3)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </S.GridContainer>
        )}
        {!loading && !hasEntries && (
          <p style={{ textAlign: 'center', color: '#666' }}>
            Nenhum post encontrado.
          </p>
        )}
        {!loading && hasEntries && (
          <S.GridContainer>
            {entries.map(post => (
              // eslint-disable-next-line prettier/prettier
              <Card
                key={post.tconst}
                post={post}
                onClick={handleCardClick}
              />
            ))}
          </S.GridContainer>
        )}
      </div>
    </Layout>
  );
}
