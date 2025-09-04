import { useLanguage } from '../../contexts/LanguageContext';
import * as S from './styles';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <S.Container
      onClick={toggleLanguage}
      onKeyDown={(e) => e.key === 'Enter' && toggleLanguage()}
      role="button"
      tabIndex={0}
      title={language === 'pt' ? 'Mudar para inglês' : 'Change to Portuguese'}
    >
      <S.FlagWrapper $isActive={language === 'pt'}>
        🇧🇷
      </S.FlagWrapper>
      <S.FlagWrapper $isActive={language === 'en'}>
        🇺🇸
      </S.FlagWrapper>
    </S.Container>
  );
} 