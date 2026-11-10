import { Link } from 'react-router-dom';

import { Layout } from '../../components/Layout';
import { useLanguage } from '../../contexts/LanguageContext';
import * as S from './styles';

const translations = {
  pt: {
    title: 'Página não encontrada',
    description: 'O endereço que você abriu não existe ou foi removido.',
    backHome: 'Voltar para a página inicial',
  },
  en: {
    title: 'Page not found',
    description: 'The address you opened does not exist or was removed.',
    backHome: 'Back to the home page',
  },
};

function NotFound() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <Layout>
      <S.Container>
        <S.Code>404</S.Code>
        <S.Title>{t.title}</S.Title>
        <S.Description>{t.description}</S.Description>
        <Link to="/">{t.backHome}</Link>
      </S.Container>
    </Layout>
  );
}

export default NotFound;
