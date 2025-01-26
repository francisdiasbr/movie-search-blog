import React from 'react';

import Card from '../../components/Card';
import SkeletonCard from '../../components/Card/Skeleton';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Layout } from '../../components/Layout';
import { NoPostsMessage } from '../../components/NoPostsMessage';
import ReviewSearch from '../../components/ReviewSearch';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import * as S from './styles';

export default function Reviews() {
  const {
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
  } = useBlogPosts();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (error) return <ErrorMessage message={error} />;

  const sortedEntries = [...entries].sort((a, b) => {
    const dateA = parseDate(a.created_at).getTime();
    const dateB = parseDate(b.created_at).getTime();
    return dateB - dateA;
  });

  
  return (
    <Layout>
      <S.Container>
        <ReviewSearch
          query={query}
          onInputChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onSearch={handleSearch}
        />
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
            {sortedEntries.map(post => (
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
            ))}
          </S.GridContainer>
        )}
      </S.Container>
    </Layout>
  );
}
