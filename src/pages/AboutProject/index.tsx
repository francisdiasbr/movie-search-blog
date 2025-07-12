import { Layout } from '../../components/Layout';
import { useLanguage } from '../../contexts/LanguageContext';
import * as S from './styles';


const translations = {
  pt: {
    title: 'Oi! Seja bem-vindo(a) ao Cinema & Thoughts!',
    about: 'Aqui eu conjugo a inteção de catalogar os filmes que eu assisti e compartilhar minha empolgação com o que assisto.',
  },
  en: {
    title: 'Hi! Welcome to Cinema & Thoughts!',
    about: 'Here I combine the intention to catalog the movies I watched and share my excitement about what I watch.',
  }
};

const AboutProject = () => {
  const { language } = useLanguage();
  const content = translations[language];

  return (
    <Layout>
      <S.Container>
        <S.Content>
          <h1>{content.title}</h1>
          <p>{content.about}</p>
          <p></p>
        </S.Content>
      </S.Container>
    </Layout>
  );
}

export default AboutProject;