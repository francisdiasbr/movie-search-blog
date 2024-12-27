import { useEffect } from 'react';

import { ErrorMessage } from '../../components/ErrorMessage';
import { Layout } from '../../components/Layout';
import { useLanguage } from '../../contexts/LanguageContext';
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

  // Ordenar os filmes por título
  const sortedEntries = [...entries].sort((a, b) => a.primaryTitle.localeCompare(b.primaryTitle));

  // Agrupar os filmes por letra inicial
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
                <p key={item.tconst}><em><strong>{item.primaryTitle}</strong></em> - {item.director}, {item.startYear}</p>
              ))}
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}