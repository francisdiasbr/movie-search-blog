import { Layout } from '../../components/Layout';
import { useLanguage } from '../../contexts/LanguageContext';
import * as S from './styles';

const translations = {
  pt: {
    title: 'Bem-vindo(a) ao The Movie Blog!',
    intro: 'Este blog é um antigo projeto que aguardava há muito para sair da caixa.',
    about: 'The Movie Blog é uma iniciativa autoral que surgiu da necessidade de catalogar os filmes que eu assisti e compartilhar minha paixão por cinema.',
    description: 'O blog é feito com muito carinho e dedicação em um trabalho que envolve a curadoria de filmes, catalogação e criação de conteúdo, mirando temáticas e diretores específicos (✨ MORE COMING SOON ✨).',
    welcome: 'Seja bem-vindo(a) e aproveite as postagens e a curadoria de filmes.',
    categories: 'No momento, o blog conta com a categoria de reviews de filmes. Em breve serão adicionadas novas categorias e novas postagens.',
    contact: 'Para contribuições, críticas e sugestões entre em contato comigo:',
    thanks: 'Obrigada pela visita!',
    signature: 'Francis Dias - Dezembro de 2024'
  },
  en: {
    title: 'Welcome to The Movie Blog!',
    intro: 'This blog is an old project that had been waiting a long time to come out of the box.',
    about: 'The Movie Blog is an authorial initiative that arose from the need to catalog the movies I watched and share my passion for cinema.',
    description: 'The blog is made with great care and dedication in a work that involves movie curation, cataloging, and content creation, targeting specific themes and directors (✨ MORE COMING SOON ✨).',
    welcome: 'Welcome and enjoy the posts and movie curation.',
    categories: 'Currently, the blog features the movie reviews category. New categories and posts will be added soon.',
    contact: 'For contributions, feedback, and suggestions, please contact me at:',
    thanks: 'Thank you for visiting!',
    signature: 'Francis Dias - December 2024'
  }
};

export default function About() {
  const { language } = useLanguage();
  const content = translations[language];

  return (
    <Layout>
      <S.Container>
        <S.FlexContainer>
          <S.Avatar
            src="https://github.com/francisdiasbr.png"
            alt="Francis Dias"
          />
          <S.Content>
            <h1>{content.title}</h1>
            <p>{content.intro}</p>
            <p>{content.about}</p>
            <p style={{ marginBottom: '30px' }}>{content.description}</p>
            <p>{content.welcome}</p>
            <p>{content.categories}</p>
            <S.ContactContainer>
              <p>{content.contact}</p>
              <S.ContactLink href="mailto:francisdiasbr@gmail.com">
                francisdiasbr@gmail.com
              </S.ContactLink>
            </S.ContactContainer>
            <p>{content.thanks}</p>
            <p>{content.signature}</p>
          </S.Content>
        </S.FlexContainer>
      </S.Container>
    </Layout>
  );
}
