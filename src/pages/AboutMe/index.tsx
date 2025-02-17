import { Layout } from '../../components/Layout';
import { useLanguage } from '../../contexts/LanguageContext';
import * as S from './styles';

const AboutMe = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <S.Container>
        <S.Content>
          <S.Title>{language === 'pt' ? 'Quem escreve' : 'The author'}</S.Title>
          <S.FlexContainer>
            <S.Avatar
              src="https://github.com/francisdiasbr.png"
              alt="Francis Dias"
            />
            <S.Content>
              Hi, I'm Francis Dias. I'm happy to have the honor of your visit here. Here I can share some of the contents I've been consuming.
            </S.Content>
          </S.FlexContainer>
        </S.Content>
      </S.Container>
    </Layout>
  );
}

export default AboutMe;
