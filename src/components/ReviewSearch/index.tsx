import React from 'react';

import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

interface ReviewSearchProps {
  query: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const ReviewSearch: React.FC<ReviewSearchProps> = ({ query, onInputChange, onKeyPress, onSearch }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center border-b border-gray-300 py-2">
        <Input
          type="text"
          value={query}
          onChange={onInputChange}
          onKeyPress={onKeyPress}
          placeholder="Pesquisar por título do post ou nome do filme"
        />
        <Button onClick={onSearch} className="ml-2 px-4 py-1 bg-slate-800 text-white rounded-r hover:bg-slate-700">
          Buscar
        </Button>
      </div>
    </div>
  );
};

export default ReviewSearch;
