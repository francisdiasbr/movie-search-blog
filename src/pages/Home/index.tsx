import { useMemo } from 'react';

import Card from '../../components/Card';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Layout } from '../../components/Layout';
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
    coverImages
  } = useBlogPosts();
  
  const memoizedCards = useMemo(() => {
    if (!hasEntries || status !== 'succeeded') return null;

    const cards = entries.map((post, index) => {
      return (
        <Card
          key={post.tconst}
          post={{
            ...post,
            title: post.primaryTitle,
            created_at: formatDate(parseDate(post.created_at)),
            imageUrl: coverImages[post.tconst]
              ? encodeURI(coverImages[post.tconst])
              : (post.imageUrl ? encodeURI(post.imageUrl) : undefined)
          }}
          onClick={() => handleCardClick(post)}
          isFirst={index === 0}
        />
      );
    });

    if (cards.length > 1) {
      cards.splice(1, 0, <div key="break" className="card-break" />);
    }

    return cards;
  }, [entries, status, coverImages]);

  if (error) return <ErrorMessage message={error} />;

  return (
    <Layout>
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
