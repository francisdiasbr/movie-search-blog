import Card from '../../components/Card';
import SkeletonCard from '../../components/Card/Skeleton';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Layout } from '../../components/Layout';
import { NoPostsMessage } from '../../components/NoPostsMessage';
import { useLanguage } from '../../contexts/LanguageContext';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import * as S from './styles';

export default function Home() {
  const { language } = useLanguage();
  const {
    error,
    loading,
    entries,
    hasEntries,
    postImages,
    handleCardClick,
    parseDate,
    formatDate,
  } = useBlogPosts();

  if (error) return <ErrorMessage message={error} />;

  const sortedEntries = [...entries].sort((a, b) => {
    const dateA = parseDate(a.created_at).getTime();
    const dateB = parseDate(b.created_at).getTime();
    return dateB - dateA;
  });

  return (
    <Layout>
      {loading && (
        <S.GridContainer>
          {[...Array(3)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </S.GridContainer>
      )}
      {!loading && !hasEntries && <NoPostsMessage />}
      {!loading && hasEntries && (
        <S.GridContainer>
          {sortedEntries.map(post => (
            <Card
              key={`${post.tconst}-${post.content[language].title}`}
              post={{
                ...post,
                title: post.content[language].title,
                created_at: formatDate(parseDate(post.created_at)),
                imageUrl: postImages[post.tconst]?.[0] ? encodeURI(postImages[post.tconst][0]) : undefined,
              }}
              onClick={handleCardClick}
            />
          ))}
        </S.GridContainer>
      )}
    </Layout>
  );
}
