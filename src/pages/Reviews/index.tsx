import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../components/Card';
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

  if (error) return <ErrorMessage message={error} />;

  const entries = data?.entries || [];
  const hasEntries = entries.length > 0;

  return (
    <Layout>
      <ReviewSearch query={query} onInputChange={handleInputChange} onKeyPress={handleKeyPress} onSearch={handleSearch} />
      {!hasEntries && <p style={{ textAlign: 'center', color: '#666' }}>Nenhum post encontrado.</p>}
      {hasEntries && (
        <S.GridContainer>
          {entries.map(post => (
            <Card key={post.tconst} post={post} onClick={handleCardClick} />
          ))}
        </S.GridContainer>
      )}
    </Layout>
  );
}
