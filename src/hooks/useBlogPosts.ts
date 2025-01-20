import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLanguage } from '../contexts/LanguageContext';
import { fetchAllImageUrls } from '../features/blogPost/blogPostImagesSlice';
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
    await dispatch(fetchBlogPostsAndReviews({
      filters: params.filters || {},
      page: 1,
      pageSize: 10,
    }));
  }, [query]);

  const parseDate = (dateString: string) => {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  const formatDate = (date: Date) => {
    return language === 'en'
      ? date.toLocaleDateString('en-US')
      : date.toLocaleDateString('pt-BR');
  };

  const handleCardClick = (post: CombinedEntry) => {
    if ('isAiGenerated' in post && post.isAiGenerated) {
      navigate(`/movie/${post.tconst}`);
    } else {
      navigate(`/review/${post.tconst}`);
    }
  };

  const entries: CombinedEntry[] = [
    ...(data?.blogPosts?.entries || []),
    ...(data?.reviews?.entries || [])
  ];
  const hasEntries = entries.length > 0;

  useEffect(() => {
    handleSearch();

    return () => {
      setPostImages({});
    };
  }, []);

  useEffect(() => {
    if (!entries.length) return;

    const loadedTconsts = Object.keys(postImages);
    const unloadedPosts = entries.filter(post => !loadedTconsts.includes(post.tconst));
    
    if (unloadedPosts.length === 0) return;

    const fetchImages = async () => {
      const promises = unloadedPosts.map(post => 
        dispatch(fetchAllImageUrls({ tconst: post.tconst }))
      );

      const results = await Promise.all(promises);
      
      const newImages = results.reduce((acc, result, index) => {
        if (fetchAllImageUrls.fulfilled.match(result)) {
          acc[unloadedPosts[index].tconst] = result.payload.urls;
        }
        return acc;
      }, {} as Record<string, string[]>);

      setPostImages(prev => ({
        ...prev,
        ...newImages
      }));
    };

    fetchImages();
  }, [entries]);

  return {
    query,
    setQuery,
    error,
    status,
    entries,
    hasEntries,
    postImages,
    handleSearch,
    handleCardClick,
    parseDate,
    formatDate,
  };
}; 