import * as S from './styles';

interface OpinionCardProps {
  opinion: string;
  githubUsername?: string;
}

export default function OpinionCard({ opinion, githubUsername = 'augustolimads' }: OpinionCardProps) {
  return (
    <S.OpinionCard>
      <S.AvatarContainer>
        <S.Avatar 
          src={`https://github.com/${githubUsername}.png`} 
          alt={`${githubUsername}'s avatar`}
        />
      </S.AvatarContainer>
      <S.OpinionText>{opinion}</S.OpinionText>
    </S.OpinionCard>
  );
}
