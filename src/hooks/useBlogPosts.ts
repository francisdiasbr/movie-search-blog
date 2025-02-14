import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchBlogPostsAndReviews } from '../features/blogPostsAndReviews/blogPostsAndReviewsSlice';
import { CombinedEntry, CombinedResponse } from '../features/blogPostsAndReviews/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store/types';

export const useBlogPosts = (initialQuery = '') => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, error, status } = useAppSelector((state: RootState) => state.blogPostsAndReviews) as {
    data: CombinedResponse | null;
    error: string | null;
    status: string;
  };

  const [query, setQuery] = useState(initialQuery);
  const [isServerStarting, setIsServerStarting] = useState(false);

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
    await dispatch(fetchBlogPostsAndReviews({
      filters: params.filters || {},
      page: 1,
      pageSize: 10,
    }));
  }, [query]);

  const parseDate = (dateString: string) => {
    if (!dateString) return new Date();
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  const formatDate = (date: Date) => {
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  };

  const handleCardClick = (post: CombinedEntry) => {
    if ('isAiGenerated' in post && post.isAiGenerated) {
      navigate(`/movie/${post.tconst}`);
    } else {
      navigate(`/review/${post.tconst}`);
    }
  };

  const entries: CombinedEntry[] = useMemo(() => {
    return [
      ...(data?.blogPosts?.entries || []),
      ...(data?.reviews?.entries || [])
    ];
  }, [data]);
  const hasEntries = entries.length > 0;

  useEffect(() => {
    if (!data || (!entries.length && status !== 'loading')) {
      handleSearch();
    }
  }, [status]);

  useEffect(() => {
    if (!entries.length) return;

  }, [entries]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchBlogPostsAndReviews({ page: 1, pageSize: 100 })).unwrap();
        setIsServerStarting(false);
      } catch (error: any) {
        if (error.message === 'Failed to fetch' || error.response?.status === 503) {
          setIsServerStarting(true);
          setTimeout(() => {
            fetchData();
          }, 3000);
        }
      }
    };

    fetchData();
  }, [dispatch]);

  return {
    query,
    setQuery,
    error,
    status,
    entries,
    hasEntries,
    // postImages,
    handleSearch,
    handleCardClick,
    parseDate,
    formatDate,
    isServerStarting,
  };
}; 