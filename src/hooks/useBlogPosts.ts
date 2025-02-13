import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// import { fetchAllImageUrls } from '../features/blogPost/blogPostImagesSlice';
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
  // const [postImages, setPostImages] = useState<Record<string, string[]>>({});

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

    // const loadedTconsts = Object.keys(postImages);
    // const unloadedPosts = entries.filter(post => !loadedTconsts.includes(post.tconst));
    
    // if (unloadedPosts.length === 0) return;

    // const fetchImages = async () => {
    //   const promises = unloadedPosts.map(post => 
    //     dispatch(fetchAllImageUrls({ tconst: post.tconst }))
    //       .then(result => {
    //         if (fetchAllImageUrls.fulfilled.match(result)) {
    //           return { tconst: post.tconst, urls: result.payload.urls };
    //         }
    //         return null;
    //       })
    //   );

    //   const results = await Promise.all(promises);
      
    //   const newImages = results.reduce((acc, result) => {
    //     if (result) {
    //       acc[result.tconst] = result.urls;
    //     }
    //     return acc;
    //   }, {} as Record<string, string[]>);

    //   setPostImages(prev => ({
    //     ...prev,
    //     ...newImages
    //   }));
    // };

    // fetchImages();
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
  };
}; 