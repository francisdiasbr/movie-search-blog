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

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const isLoading = status === 'loading';
  const showNoPosts = status === 'succeeded' && !hasEntries;
  const showGrid = status === 'succeeded' && hasEntries;

  return (
    <Layout>
      {isLoading && <LoadingSpinner />}
      {showNoPosts && <NoPostsMessage />}
      {showGrid && (
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
