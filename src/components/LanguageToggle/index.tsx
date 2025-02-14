import { useLanguage } from '../../contexts/LanguageContext';
import * as S from './styles';

const FLAGS = {
  pt: '🇧🇷',
  en: '🇺🇸',
  it: '🇮🇹',
  de: '🇩🇪'
};

const TITLES = {
  pt: {
    pt: 'Português',
    en: 'Mudar para inglês',
    it: 'Mudar para italiano',
    de: 'Mudar para alemão'
  },
  en: {
    pt: 'Change to Portuguese',
    en: 'English',
    it: 'Change to Italian',
    de: 'Change to German'
  },
  it: {
    pt: 'Cambia in portoghese',
    en: 'Cambia in inglese',
    it: 'Italiano',
    de: 'Cambia in tedesco'
  },
  de: {
    pt: 'Zu Portugiesisch wechseln',
    en: 'Zu Englisch wechseln',
    it: 'Zu Italienisch wechseln',
    de: 'Deutsch'
  }
};

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <S.Container
      onClick={toggleLanguage}
      onKeyDown={(e) => e.key === 'Enter' && toggleLanguage()}
      role="button"
      tabIndex={0}
      title={TITLES[language][language]}
    >
      {Object.entries(FLAGS).map(([lang, flag]) => (
        <S.FlagWrapper key={lang} isActive={language === lang}>
          {flag}
        </S.FlagWrapper>
      ))}
    </S.Container>
  );
} 