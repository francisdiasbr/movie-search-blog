import { FaSun, FaMoon } from 'react-icons/fa';

import { useTheme } from '../../contexts/useTheme';
import * as S from './styles';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <S.Container
      onClick={toggleTheme}
      onKeyDown={(e) => e.key === 'Enter' && toggleTheme()}
      role="button"
      tabIndex={0}
      title={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
    </S.Container>
  );
} 