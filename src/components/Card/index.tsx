import React from 'react';

import * as S from './styles';

interface CardProps {
  post: {
    tconst: string;
    primaryTitle: string;
    created_at: string;
    imageUrl?: string;
  };
  onClick: (movieId: string) => void;
  isFirst?: boolean;
}


const Card: React.FC<CardProps> = ({ post, onClick, isFirst }) => {
  return (
    <S.CardContainer
      onClick={() => onClick(post.tconst)}
      $imageUrl={post.imageUrl}
      $isFirst={isFirst}
    >
      <S.CardHeader>
        <S.CardTitle>{post.primaryTitle}</S.CardTitle>
        <S.CardDate>{post.created_at}</S.CardDate>
      </S.CardHeader>
    </S.CardContainer>
  );
}; 

export default Card;
