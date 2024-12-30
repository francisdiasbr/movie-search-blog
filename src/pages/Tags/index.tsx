import { useEffect } from 'react';

import Chip from '../../components/Chip';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Layout } from '../../components/Layout';
import { useLanguage } from '../../contexts/LanguageContext';
import { searchFavorites } from '../../features/favorites/favoritesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/types';

const translations = {
  pt: {
    title: 'Filmes por Tags',
    description: 'Essa é'
  },
  en: {
    title: 'Movies by Tags',
    description: 'This is a small list of movies I like. Some of them you can see the movie review in the reviews section.'
  }
};

export default function Tags() {
  const { language } = useLanguage();
  const dispatch = useAppDispatch();
  const { data, error } = useAppSelector(
    (state: RootState) => state.favorites
  );

  useEffect(() => {
    dispatch(searchFavorites({}));
  }, [dispatch]);

  const content = translations[language];

  if (error) return <ErrorMessage message={error} />;

  const entries = data?.entries || [];
  const hasEntries = entries.length > 0;

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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {Object.keys(groupedEntries).map(letter => (
              groupedEntries[letter].map(item => (
                item.plot_keywords.slice(0, 10).map((tag, index) => (
                  <Chip key={`${item.tconst}-${index}`} label={tag} />
                ))
              ))
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}