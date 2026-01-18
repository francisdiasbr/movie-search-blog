import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchBlogPostCards } from '../features/blogPostsAndReviews/blogPostsAndReviewsSlice';
import { BlogPostCard } from '../features/blogPostsAndReviews/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store/types';

export const useBlogPosts = (initialQuery = '') => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cardsData, error, status } = useAppSelector((state: RootState) => state.blogPostsAndReviews) as {
    cardsData: { entries: BlogPostCard[]; total_documents: number } | null;
    error: string | null;
    status: string;
  };
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = useCallback(async () => {
    const params = {
      filters: query.trim()
        ? {
            $or: [
              { primaryTitle: { $regex: query.trim(), $options: 'i' } },
            ],
          }
        : {},
    };
    // Usa o endpoint otimizado /cards
    await dispatch(fetchBlogPostCards({
      filters: params.filters || {},
      page: 1,
      pageSize: 10,
    }));
  }, [query, dispatch]);

  const handleCardClick = useCallback((post: BlogPostCard) => {
    navigate(`/article/${post.tconst}`);
  }, [navigate]);

  // Entries agora são apenas os cards otimizados
  const entries: BlogPostCard[] = useMemo(() => {
    if (!cardsData) return [];
    return cardsData.entries || [];
  }, [cardsData]);
  
  const hasEntries = entries.length > 0;

  // Busca cards apenas quando status é 'idle' (primeira vez)
  useEffect(() => {
    if (status === 'idle') {
      handleSearch();
    }
  }, [status, handleSearch]);

  return {
    query,
    setQuery,
    error,
    status,
    entries,
    hasEntries,
    handleSearch,
    handleCardClick,
  };
}; 