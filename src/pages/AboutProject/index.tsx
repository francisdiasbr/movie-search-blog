import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Layout } from '../../components/Layout';
import { useLanguage } from '../../contexts/LanguageContext';
import * as S from './styles';

const translations = {
  pt: {
    title: 'Bem-vindo(a) ao The Movie Blog!',
    about: 'The Movie Blog é uma iniciativa autoral que surgiu da necessidade de catalogar os filmes que eu assisti e compartilhar minha paixão por cinema.',
    description: 'O blog é feito com muito carinho e dedicação em um trabalho que envolve a curadoria de filmes, catalogação e criação de conteúdo, mirando temáticas e diretores específicos (✨ MORE COMING SOON ✨).',
    categories: 'No momento, o blog conta com a categoria de reviews de filmes. Em breve serão adicionadas novas categorias e novas postagens.',
    contact: 'Para contribuições, críticas e sugestões entre em contato comigo:',
    thanks: 'Obrigada pela visita!',
    signature: 'Francis Dias - Dezembro de 2024'
  },
  en: {
    title: 'Welcome to The Movie Blog!',
    about: 'The Movie Blog is an authorial initiative that arose from the need to catalog the movies I watched and share my passion for cinema.',
    description: 'The blog is made with great care and dedication in a work that involves movie curation, cataloging, and content creation, targeting specific themes and directors (✨ MORE COMING SOON ✨).',
    categories: 'Currently, the blog features the movie reviews category. New categories and posts will be added soon.',
    contact: 'For contributions, feedback, and suggestions, please contact me at:',
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
          <p style={{ marginBottom: '30px' }}>{content.description}</p>
          <p>{content.categories}</p>
          <S.ContactContainer>
            <p>{content.contact}</p>
            <S.ContactLink href="mailto:francisdiasbr@gmail.com">
              francisdiasbr@gmail.com
            </S.ContactLink>
          </S.ContactContainer>
          <p>{content.thanks}</p>
          <p>{content.signature}</p>
          <S.GitHubButton
            href="https://github.com/francisdiasbr/movie-search-blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
            {language === 'pt' ? 'Leia mais sobre este projeto no GitHub' : 'Read more about this project on GitHub'}
          </S.GitHubButton>
        </S.Content>
      </S.Container>
    </Layout>
  );
}

export default AboutProject;