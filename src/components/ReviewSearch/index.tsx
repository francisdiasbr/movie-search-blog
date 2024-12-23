import React from 'react';

import Button from '../Button';
import Input from '../Input';
import * as S from './styles';
interface ReviewSearchProps {
  query: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const ReviewSearch: React.FC<ReviewSearchProps> = ({ query, onInputChange, onKeyPress, onSearch }) => {
  return (
      <S.ReviewSearchContainer>
        <Input
          type="text"
          value={query}
          onChange={onInputChange}
          onKeyPress={onKeyPress}
          placeholder="Pesquisar por título do post ou nome do filme"
        />
        <Button onClick={onSearch}>Buscar</Button>
      </S.ReviewSearchContainer>
  );
};

export default ReviewSearch;
