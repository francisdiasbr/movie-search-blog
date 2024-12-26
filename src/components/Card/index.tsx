import React from 'react';

import * as S from './styles';

interface CardProps {
  post: {
    tconst: string;
    title: string;
    created_at: string;
  };
  onClick: (movieId: string) => void;
}

const Card: React.FC<CardProps> = ({ post, onClick }) => {
  return (
    <S.CardContainer onClick={() => onClick(post.tconst)}>
      <S.CardHeader>
        <S.CardTitle>{post.title}</S.CardTitle>
        {/* <S.CardImage src="https://github.com/francisdiasbr.png" alt="Francis Dias" /> */}
      </S.CardHeader>
      <S.CardDate>{post.created_at}</S.CardDate>
    </S.CardContainer>
  );
};

export default Card;
