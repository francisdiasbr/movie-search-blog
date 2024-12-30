import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLanguage } from '../contexts/LanguageContext';
import { fetchAllImageUrls } from '../features/blogPost/blogPostImagesSlice';
import { searchBlogPosts } from '../features/blogPost/searchBlogPostSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store/types';

export const useBlogPosts = (initialQuery = '') => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, error, loading } = useAppSelector(
    (state: RootState) => state.searchBlogPost
  );
  const [query, setQuery] = useState(initialQuery);
  const { language } = useLanguage();
  const [postImages, setPostImages] = useState<Record<string, string[]>>({});

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

  const parseDate = (dateString: string) => {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  const formatDate = (date: Date) => {
    return language === 'en'
      ? date.toLocaleDateString('en-US')
      : date.toLocaleDateString('pt-BR');
  };

  const handleCardClick = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  const entries = data?.entries || [];
  const hasEntries = entries.length > 0;

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  useEffect(() => {
    const fetchImages = async () => {
      for (const post of entries) {
        const result = await dispatch(fetchAllImageUrls({ tconst: post.tconst }));
        if (fetchAllImageUrls.fulfilled.match(result)) {
          setPostImages(prev => ({
            ...prev,
            [post.tconst]: result.payload.urls
          }));
        }
      }
    };

    if (hasEntries) {
      fetchImages();
    }
  }, [entries, dispatch, hasEntries]);

  return {
    query,
    setQuery,
    error,
    loading,
    entries,
    hasEntries,
    postImages,
    handleSearch,
    handleCardClick,
    parseDate,
    formatDate,
  };
}; 