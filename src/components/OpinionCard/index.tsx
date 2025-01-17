import * as S from './styles';

interface OpinionCardProps {
  enjoying_1: string;
  githubUsername?: string;
}

export default function OpinionCard({ enjoying_1, githubUsername = 'francisdiasbr' }: OpinionCardProps) {
  return (
    <S.OpinionCard>
      <S.AvatarContainer>
        <S.Avatar 
          src={`https://github.com/${githubUsername}.png`} 
          alt={`${githubUsername}'s avatar`}
        />
      </S.AvatarContainer>
      <S.OpinionText>{enjoying_1}</S.OpinionText>
    </S.OpinionCard>
  );
}
