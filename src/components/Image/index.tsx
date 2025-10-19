import React, { useState } from 'react';
import * as S from './styles';

interface ImageProps {
  src?: string;
  alt?: string;
  fallbackText?: string;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ 
  src, 
  alt = '', 
  fallbackText = 'Sem imagem',
  className 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (!src || imageError) {
    return (
      <S.ImageContainer className={className}>
        <S.FallbackText>{fallbackText}</S.FallbackText>
      </S.ImageContainer>
    );
  }

  return (
    <S.ImageContainer className={className}>
      <S.Image
        src={src}
        alt={alt}
        onError={handleImageError}
        onLoad={handleImageLoad}
        $loaded={imageLoaded}
      />
      {!imageLoaded && !imageError && (
        <S.LoadingText>Carregando...</S.LoadingText>
      )}
    </S.ImageContainer>
  );
};

export default Image;
