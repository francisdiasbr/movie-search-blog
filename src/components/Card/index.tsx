import React from 'react';

import { CardContainer, CardHeader, CardImage, CardTitle, CardDate } from './styles';

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
    <CardContainer onClick={() => onClick(post.tconst)}>
      <CardHeader>
        <CardImage src="https://github.com/francisdiasbr.png" alt="Francis Dias" />
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardDate>{post.created_at}</CardDate>
    </CardContainer>
  );
};

export default Card;
