import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchCoverImage } from '../features/blogPost/blogPostImagesSlice';
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
  const coverImages = useAppSelector((state: RootState) => state.uploadImages.coverImages);

  const [query, setQuery] = useState(initialQuery);

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
    navigate(`/article/${post.tconst}`);
  };

  const entries: CombinedEntry[] = useMemo(() => {
    if (!data) return [];
    
    // Criar um Map usando tconst como chave para evitar duplicatas
    const uniqueEntries = new Map();
    
    // Adicionar blog posts
    data.blogPosts?.entries?.forEach(post => {
      uniqueEntries.set(post.tconst, post);
    });
    
    // Adicionar reviews apenas se não existir um blog post com o mesmo tconst
    data.reviews?.entries?.forEach(review => {
      if (!uniqueEntries.has(review.tconst)) {
        uniqueEntries.set(review.tconst, review);
      }
    });
    
    // Converter o Map de volta para array
    return Array.from(uniqueEntries.values());
  }, [data]);
  const hasEntries = entries.length > 0;

  useEffect(() => {
    if (!data || (!entries.length && status !== 'loading')) {
      handleSearch();
    }
  }, [status]);

  useEffect(() => {
    if (!entries.length) return;

    // Adicione logs para debug
    console.log('Entries:', entries);
    console.log('Cover Images:', coverImages);

    // Carrega apenas as imagens que não estão no cache
    entries
      .filter(post => !coverImages[post.tconst])
      .forEach(post => {
        console.log(`Fetching cover for ${post.tconst}`); // Log adicional
        dispatch(fetchCoverImage({ tconst: post.tconst }));
      });
  }, [entries]);

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
    coverImages,
  };
}; 