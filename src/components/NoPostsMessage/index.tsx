import { useLanguage } from '../../contexts/LanguageContext';
import * as S from './styles';

export function NoPostsMessage() {
  const { language } = useLanguage();

  return (
    <S.Message>
      {language === 'pt' ? 'Nenhum post encontrado.' : 'No posts found.'}
    </S.Message>
  );
} 