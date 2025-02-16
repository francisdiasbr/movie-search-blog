import { Layout } from '../../components/Layout';
import { useLanguage } from '../../contexts/LanguageContext';
import * as S from './styles';

const AboutMe = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <S.Container>
        <S.FlexContainer>
          <S.Avatar
            src="https://github.com/francisdiasbr.png"
            alt="Francis Dias"
          />
          <S.Content>
            <S.Title>{language === 'pt' ? 'Quem escreve' : 'About me'}</S.Title>
            <S.Content>
            </S.Content>
          </S.Content>
        </S.FlexContainer>
      </S.Container>
    </Layout>
  );
}

export default AboutMe;
