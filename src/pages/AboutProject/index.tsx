import { Layout } from '../../components/Layout';
import { useLanguage } from '../../contexts/LanguageContext';
import * as S from './styles';

const translations = {
  pt: {
    title: 'Bem-vindo(a) ao The Movie Blog!',
    about: 'The Movie Blog é uma iniciativa autoral que surgiu da necessidade de catalogar os filmes que eu assisti e compartilhar minha paixão por cinema.',
    categories: 'No momento, o blog conta com a categoria de reviews de filmes. Em breve serão adicionadas novas categorias e novas postagens.',
    contact: 'Para parcerias, entre em contato: ',
    thanks: 'Obrigada pela visita!',
    signature: 'Francis Dias - Dezembro de 2024'
  },
  en: {
    title: 'Welcome to The Movie Blog!',
    about: 'The Movie Blog is an authorial initiative that arose from the need to catalog the movies I watched and share my passion for cinema.',
    categories: 'Currently, the blog features the movie reviews category. New categories and posts will be added soon.',
    contact: 'For partnerships, please contact:',
    thanks: 'Thank you for visiting!',
    signature: 'Francis Dias - December 2024'
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
          <p>{content.categories}</p>
          <S.ContactContainer>
            <p>
              {content.contact} 
              <S.ContactLink href="mailto:francisdiasbr@gmail.com">
                francisdiasbr@gmail.com
              </S.ContactLink>
            </p>
          </S.ContactContainer>
          <p>{content.thanks}</p>
          <p>{content.signature}</p>
        </S.Content>
      </S.Container>
    </Layout>
  );
}

export default AboutProject;