import { useNavigate } from 'react-router-dom';

import { useLanguage } from '../../contexts/LanguageContext';
import Button from '../Button';

export function GoBack() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <Button onClick={() => navigate(-1)}>
      {language === 'pt' ? 'Voltar' : 'Back'}
    </Button>
  );
}
