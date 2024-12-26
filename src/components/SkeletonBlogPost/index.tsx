import * as S from './styles';

export default function SkeletonBlogPost() {
  return (
    <S.SkeletonContainer>
      <S.SkeletonTitle />
      <S.SkeletonContent />
      <S.SkeletonImage />
    </S.SkeletonContainer>
  );
}
