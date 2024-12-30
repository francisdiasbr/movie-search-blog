import React from 'react';

import * as S from './styles';

interface CardProps {
  post: {
    tconst: string;
    title: string;
    created_at: string;
    imageUrl?: string;
  };
  onClick: (movieId: string) => void;
}

const Card: React.FC<CardProps> = ({ post, onClick }) => {
  console.log('Card imageUrl:', post.imageUrl);
  return (
    <S.CardContainer onClick={() => onClick(post.tconst)} imageUrl={post.imageUrl}>
      <S.CardHeader>
        <S.CardTitle>{post.title}</S.CardTitle>
      </S.CardHeader>
      <S.CardDate>{post.created_at}</S.CardDate>
    </S.CardContainer>
  );
};

export default Card;
