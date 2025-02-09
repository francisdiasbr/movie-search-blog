import { useMemo } from 'react';

import Card from '../../components/Card';
import SkeletonCard from '../../components/Card/Skeleton';
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
    postImages,
    handleCardClick,
    parseDate,
    formatDate,
  } = useBlogPosts();
  
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
          imageUrl: postImages[post.tconst]?.[0] ? encodeURI(postImages[post.tconst][0]) : undefined,
        }}
        onClick={() => handleCardClick(post)}
      />
    ));
  }, [entries, postImages, handleCardClick, hasEntries, status]);

  if (error) return <ErrorMessage message={error} />;

  return (
    <Layout>
      {status === 'loading' && (
        <S.GridContainer>
          {[...Array(3)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </S.GridContainer>
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
