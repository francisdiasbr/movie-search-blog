import Card from '../../components/Card';
import SkeletonCard from '../../components/Card/Skeleton';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Layout } from '../../components/Layout';
import { NoPostsMessage } from '../../components/NoPostsMessage';
import { useLanguage } from '../../contexts/LanguageContext';
import { CombinedEntry } from '../../features/blogPostsAndReviews/types';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import * as S from './styles';


export default function Home() {
  const { language } = useLanguage();
  const {
    error,
    status,
    entries,
    hasEntries,
    postImages,
    parseDate,
    formatDate,
    handleCardClick,
  } = useBlogPosts();

  if (error) return <ErrorMessage message={error} />;

  const sortedEntries = [...entries].sort((a, b) => {
    const dateA = parseDate(a.created_at).getTime();
    const dateB = parseDate(b.created_at).getTime();
    return dateB - dateA;
  });

  const getPostTitle = (post: CombinedEntry) => {
    if ('content' in post && post.content.pt && post.content.en) {
      return post.content[language].title;
    }
    return post.primaryTitle;
  };


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
          {sortedEntries.map(post => (
            <Card
              key={`${post.tconst}-${getPostTitle(post)}`}
              post={{
                ...post,
                title: getPostTitle(post),
                created_at: formatDate(parseDate(post.created_at)),
                imageUrl: postImages[post.tconst]?.[0] ? encodeURI(postImages[post.tconst][0]) : undefined,
              }}
              onClick={() => handleCardClick(post)}
            />
          ))}
        </S.GridContainer>
      )}
    </Layout>
  );
}
