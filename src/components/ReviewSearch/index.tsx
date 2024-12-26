import React from 'react';

import { useLanguage } from '../../contexts/LanguageContext';
import Button from '../Button';
import Input from '../Input';
import * as S from './styles';

interface ReviewSearchProps {
  query: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const ReviewSearch: React.FC<ReviewSearchProps> = ({
  query,
  onInputChange,
  onKeyPress,
  onSearch,
}) => {
  const { language } = useLanguage();

  return (
    <S.ReviewSearchContainer>
      <Input
        type="text"
        value={query}
        onChange={onInputChange}
        onKeyPress={onKeyPress}
        placeholder={language === 'pt' ? 'Pesquisar por título do post ou nome do filme' : 'Search by post title or movie name'}
      />
      <Button hasMarginLeft onClick={onSearch}>
        {language === 'pt' ? 'Buscar' : 'Search'}
      </Button>
    </S.ReviewSearchContainer>
  );
};

export default ReviewSearch;
