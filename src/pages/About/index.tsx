import { Layout } from '../../components/Layout';
import * as S from './styles';

export default function About() {
  return (
    <Layout>
      <S.Container>
        <S.FlexContainer>
          <S.Avatar
            src="https://github.com/francisdiasbr.png"
            alt="Francis Dias"
          />
          <S.Content>
            <h1>Bem-vindo(a) ao The Movie Blog!</h1>
            <p>
              Este blog é um antigo projeto que aguardava há muito para sair da
              caixa.
            </p>
            <p>
              The Movie Blog é uma iniciativa autoral que surgiu da necessidade
              de catalogar os filmes que eu assisti e compartilhar minha paixão
              por cinema.
            </p>
            <p style={{ marginBottom: '30px' }}>
              O blog é feito com muito carinho e dedicação em um trabalho que
              envolve a curadoria de filmes, catalogação e criação de conteúdo,
              mirando temáticas e diretores específicos (✨ MORE COMING SOON
              ✨).
            </p>
            <p>
              Seja bem-vindo(a) e aproveite as postagens e a curadoria de
              filmes.
            </p>
            <p>
              No momento, o blog conta com a categoria de reviews de filmes. Em
              breve serão adicionadas novas categorias e novas postagens.
            </p>
            <S.ContactContainer>
              <p>
                Para contribuições, críticas e sugestões entre em contato
                comigo:
              </p>
              <S.ContactLink href="mailto:francisdiasbr@gmail.com">
                francisdiasbr@gmail.com
              </S.ContactLink>
            </S.ContactContainer>
            <p>Obrigada pela visita!</p>
            <p>Francis Dias - Dezembro de 2024</p>
          </S.Content>
        </S.FlexContainer>
      </S.Container>
    </Layout>
  );
}
