import { useMemo } from 'react';

import Card from '../../components/Card';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Layout } from '../../components/Layout';
import LoadingModal from '../../components/LoadingModal';
import { NoPostsMessage } from '../../components/NoPostsMessage';
import { useBlogPosts } from '../../hooks/useBlogPosts';
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
    isServerStarting,
    coverImages
  } = useBlogPosts();
  
  
  const memoizedCards = useMemo(() => {
    if (!hasEntries || status !== 'succeeded') return null;

    return entries.map(post => (
      <Card
        key={post.tconst}
        post={{
          ...post,
          title: post.primaryTitle,
          created_at: formatDate(parseDate(post.created_at)),
          imageUrl: coverImages[post.tconst] || post.imageUrl
        }}
        onClick={() => handleCardClick(post)}
      />
    ));
  }, [entries, status, coverImages]);

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
