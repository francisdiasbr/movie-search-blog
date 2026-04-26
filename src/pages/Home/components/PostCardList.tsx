import { useMemo } from 'react';

import Card from '../../../components/Card';
import { BlogPostCard } from '../../../features/blogPostsAndReviews/types';

interface PostCardListProps {
  posts: BlogPostCard[];
  onCardClick: (post: BlogPostCard) => void;
}

export const PostCardList = ({ posts, onCardClick }: PostCardListProps) => {
  const cards = useMemo(() => {
    const cardElements = posts.map((post, index) => (
      <Card
        key={post.tconst}
        post={{
          tconst: post.tconst,
          primaryTitle: post.primaryTitle,
          created_at: post.created_at,
          imageUrl: post.imageUrl ? encodeURI(post.imageUrl) : undefined,
        }}
        onClick={() => onCardClick(post)}
        isFirst={index === 0}
      />
    ));

    if (cardElements.length > 1) {
      cardElements.splice(1, 0, <div key="break" className="card-break" />);
    }

    return cardElements;
  }, [posts, onCardClick]);

  return <>{cards}</>;
};

