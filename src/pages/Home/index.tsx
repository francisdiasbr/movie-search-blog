import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../components/Card';
import SkeletonCard from '../../components/Card/Skeleton';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Layout } from '../../components/Layout';
import { NoPostsMessage } from '../../components/NoPostsMessage';
import { useLanguage } from '../../contexts/LanguageContext';
import { searchBlogPosts } from '../../features/blogPost/searchBlogPostSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/types';
import * as S from './styles';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, error, loading } = useAppSelector((state: RootState) => state.searchBlogPost);
  const [query, setQuery] = useState('');
  const { language } = useLanguage();

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

  const parseDate = (dateString: string) => {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  const sortedEntries = [...entries].sort((a, b) => {
    const dateA = parseDate(a.created_at).getTime();
    const dateB = parseDate(b.created_at).getTime();
    return dateB - dateA;
  });

  console.log('sortedEntries', sortedEntries);

  const formatDate = (date: Date) => {
    return language === 'en'
      ? date.toLocaleDateString('en-US')
      : date.toLocaleDateString('pt-BR');
  };

  return (
    <Layout>
      {loading && (
        <S.GridContainer>
          {[...Array(3)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </S.GridContainer>
      )}
      {!loading && !hasEntries && <NoPostsMessage />}
      {!loading && hasEntries && (
        <S.GridContainer>
          {sortedEntries.map(post => (
            <Card
              key={`${post.tconst}-${post.content[language].title}`}
              post={{
                ...post,
                title: post.content[language].title,
                created_at: formatDate(parseDate(post.created_at)),
              }}
              onClick={handleCardClick}
            />
          ))}
        </S.GridContainer>
      )}
    </Layout>
  );
}
