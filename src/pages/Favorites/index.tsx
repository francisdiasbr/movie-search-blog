/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ErrorMessage } from '../../components/ErrorMessage';
import { Layout } from '../../components/Layout';
import { useLanguage } from '../../contexts/LanguageContext';
import { fetchBlogPostsAndReviews } from '../../features/blogPostsAndReviews/blogPostsAndReviewsSlice';
import { searchFavorites } from '../../features/favorites/favoritesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/types';

const translations = {
  pt: {
    title: 'Filmes de A a Z',
    description: 'Essa é uma pequena lista de filmes que eu gosto. Alguns deles você pode ver a resenha do filme na seção de reviews.'
  },
  en: {
    title: 'Movies from A to Z',
    description: 'This is a small list of movies I like. Some of them you can see the movie review in the reviews section.'
  }
};

export default function Favorites() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const dispatch = useAppDispatch();
  const { data, error } = useAppSelector(
    (state: RootState) => state.favorites
  );
  const { data: postsAndReviews } = useAppSelector((state: RootState) => state.blogPostsAndReviews);

  useEffect(() => {
    dispatch(searchFavorites({}));
    dispatch(fetchBlogPostsAndReviews({ page: 1, pageSize: 100 }));
  }, [dispatch]);

  const content = translations[language];

  if (error) return <ErrorMessage message={error} />;

  const entries = data?.entries || [];
  const hasEntries = entries.length > 0;

  const moviesWithContent = new Set([
    ...(postsAndReviews?.blogPosts.entries || []).map(post => post.tconst),
    ...(postsAndReviews?.reviews.entries || []).map(review => review.tconst)
  ]);

  const handleMovieClick = (tconst: string) => {
    if (moviesWithContent.has(tconst)) {
      const isBlogPost = postsAndReviews?.blogPosts.entries.some(post => post.tconst === tconst);
      navigate(isBlogPost ? `/movie/${tconst}` : `/review/${tconst}`);
    }
  };

  const sortedEntries = [...entries].sort((a, b) => a.primaryTitle.localeCompare(b.primaryTitle));

  const groupedEntries = sortedEntries.reduce((acc, item) => {
    const firstLetter = item.primaryTitle[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {} as Record<string, typeof entries>);

  return (
    <Layout>
      <div
        style={{
          margin: '16px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          textAlign: 'center',
        }}
      >
        <h1>{content.title}</h1>
        <p>{content.description}</p>
        {hasEntries && (
          Object.keys(groupedEntries).map(letter => (
            <div key={letter} style={{ marginBottom: '28px' }}>
              <h2>{letter}</h2>
              {groupedEntries[letter].map(item => (
                <p key={item.tconst}>
                  <span 
                    style={{ 
                      textDecoration: moviesWithContent.has(item.tconst) ? 'underline' : 'none',
                      cursor: moviesWithContent.has(item.tconst) ? 'pointer' : 'default',
                      color: moviesWithContent.has(item.tconst) ? '#4A7200' : 'inherit'
                    }}
                    onClick={() => handleMovieClick(item.tconst)}
                  >
                    <em><strong>{item.primaryTitle}</strong></em>
                  </span>
                  {` - ${item.director}, ${item.startYear}`}
                </p>
              ))}
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}