import { useMemo } from 'react';
import { useTheme } from 'styled-components';


import Card from '../../components/Card';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Layout } from '../../components/Layout';
import LoadingModal from '../../components/LoadingModal';
import { NoPostsMessage } from '../../components/NoPostsMessage';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { Theme } from '../../styles/theme';
import * as S from './styles';

export default function Home() {
  const {
    error,
    status,
    entries,
    hasEntries,
    handleCardClick,
    parseDate,
    formatDate,
    isServerStarting
  } = useBlogPosts();
  
  const theme = useTheme() as Theme;
  const isMobile = window.innerWidth < parseInt(theme.breakpoints.sm);
  
  const memoizedCards = useMemo(() => {
    if (!hasEntries || status !== 'succeeded') return null;

    const sortedEntries = [...entries].sort((a, b) => {
      const dateA = parseDate(a.created_at).getTime();
      const dateB = parseDate(b.created_at).getTime();
      return dateB - dateA;
    });

    return sortedEntries.map(post => (
      <Card
        key={`${post.tconst}-${post.primaryTitle}`}
        post={{
          ...post,
          title: post.primaryTitle,
          created_at: formatDate(parseDate(post.created_at)),
          imageUrl: post.imageUrl
        }}
        onClick={() => handleCardClick(post)}
        // isMobile={isMobile}
      />
    ));
  }, [entries, handleCardClick, hasEntries, status, isMobile]);

  if (error) return <ErrorMessage message={error} />;

  return (
    <Layout>
      <LoadingModal isOpen={isServerStarting} />
      {status === 'loading' && (
        <S.LoadingContainer>
          <S.ActivityIndicator>
            <span />
          </S.ActivityIndicator>
        </S.LoadingContainer>
      )}
      {status === 'succeeded' && !hasEntries && <NoPostsMessage />}
      {status === 'succeeded' && hasEntries && (
        <S.GridContainer>
          {memoizedCards}
        </S.GridContainer>
      )}
    </Layout>
  );
}
