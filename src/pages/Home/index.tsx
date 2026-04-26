import { ErrorMessage } from '../../components/ErrorMessage';
import { Layout } from '../../components/Layout';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { NoPostsMessage } from '../../components/NoPostsMessage';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { PostCardList } from './components/PostCardList';
import * as S from './styles';

export default function Home() {
  const {
    error,
    status,
    entries,
    hasEntries,
    handleCardClick,
  } = useBlogPosts();

  if (error) return <ErrorMessage message={error} />;

  return (
    <Layout>
      {status === 'loading' && <LoadingSpinner />}
      {status === 'succeeded' && !hasEntries && <NoPostsMessage />}
      {status === 'succeeded' && hasEntries && (
        <S.GridContainer>
          <PostCardList
            posts={entries}
            onCardClick={handleCardClick}
          />
        </S.GridContainer>
      )}
    </Layout>
  );
}
