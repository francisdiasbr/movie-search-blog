import React from 'react';

import * as S from './styles';

interface CardProps {
  post: {
    _id: string;
    tconst: string;
    title: string;
    primaryTitle: string;
    created_at: string;
    imageUrl?: string;
    isAiGenerated?: boolean;
    content: {
      pt: any;
      en: any;
    };
  };
  onClick: (movieId: string) => void;
  isFirst?: boolean;
}

const Card: React.FC<CardProps> = ({ post, onClick, isFirst }) => {
  return (
    <S.CardContainer onClick={() => onClick(post.tconst)} imageUrl={post.imageUrl} isFirst={isFirst}>
      <S.CardHeader>
        <S.CardTitle>{post.primaryTitle}</S.CardTitle>
      </S.CardHeader>
      <S.CardDate>{post.created_at}</S.CardDate>
    </S.CardContainer>
  );
};

export default Card;
