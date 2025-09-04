import { Layout } from '../../components/Layout';
import { useLanguage } from '../../contexts/LanguageContext';

const translations = {
  pt: {
    title: 'Blog do Cinema',
    description: 'Reflexões, análises e pensamentos sobre o mundo do cinema. Aqui compartilhamos nossa paixão pela sétima arte e exploramos as histórias que nos movem.',
    posts: [
      {
        id: 1,
        title: 'O Poder do Cinema Independente',
        content: 'O cinema independente tem o poder de contar histórias que o cinema comercial muitas vezes ignora. É através dessas produções que vemos narrativas únicas e perspectivas diferentes sobre o mundo que nos rodeia.',
        date: '15 de Setembro, 2025'
      },
      {
        id: 2,
        title: 'A Evolução dos Efeitos Especiais',
        content: 'Desde os primórdios do cinema até os dias de hoje, os efeitos especiais evoluíram de forma impressionante. Mas será que essa evolução técnica está realmente melhorando as histórias que contamos?',
        date: '12 de Setembro, 2025'
      },
      {
        id: 3,
        title: 'Clássicos que Envelheceram Bem',
        content: 'Alguns filmes clássicos continuam relevantes décadas após seu lançamento, enquanto outros não resistiram ao teste do tempo. Vamos explorar o que faz um filme envelhecer bem.',
        date: '10 de Setembro, 2025'
      },
      {
        id: 4,
        title: 'O Futuro do Streaming',
        content: 'Com tantas plataformas de streaming disponíveis, como isso está mudando a forma como consumimos cinema? E qual o impacto na indústria cinematográfica?',
        date: '8 de Setembro, 2025'
      },
      {
        id: 5,
        title: 'Cinema Nacional: Histórias que Precisam ser Contadas',
        content: 'O cinema brasileiro tem uma rica tradição de contar histórias únicas sobre nossa cultura e sociedade. Vamos celebrar os filmes que fazem parte da nossa identidade cinematográfica.',
        date: '5 de Setembro, 2025'
      },
      {
        id: 6,
        title: 'A Arte da Trilha Sonora',
        content: 'Uma boa trilha sonora pode transformar completamente a experiência de assistir um filme. Vamos explorar como a música e o som contribuem para a narrativa cinematográfica.',
        date: '3 de Setembro, 2025'
      }
    ]
  },
  en: {
    title: 'Cinema Blog',
    description: 'Reflections, analysis and thoughts about the world of cinema. Here we share our passion for the seventh art and explore the stories that move us.',
    posts: [
      {
        id: 1,
        title: 'The Power of Independent Cinema',
        content: 'Independent cinema has the power to tell stories that commercial cinema often ignores. It is through these productions that we see unique narratives and different perspectives on the world around us.',
        date: 'September 15, 2025'
      },
      {
        id: 2,
        title: 'The Evolution of Special Effects',
        content: 'From the early days of cinema to today, special effects have evolved impressively. But is this technical evolution really improving the stories we tell?',
        date: 'September 12, 2025'
      },
      {
        id: 3,
        title: 'Classics That Aged Well',
        content: 'Some classic films remain relevant decades after their release, while others did not withstand the test of time. Let\'s explore what makes a film age well.',
        date: 'September 10, 2025'
      },
      {
        id: 4,
        title: 'The Future of Streaming',
        content: 'With so many streaming platforms available, how is this changing the way we consume cinema? And what is the impact on the film industry?',
        date: 'September 8, 2025'
      },
      {
        id: 5,
        title: 'National Cinema: Stories That Need to be Told',
        content: 'Brazilian cinema has a rich tradition of telling unique stories about our culture and society. Let\'s celebrate the films that are part of our cinematic identity.',
        date: 'September 5, 2025'
      },
      {
        id: 6,
        title: 'The Art of Soundtrack',
        content: 'A good soundtrack can completely transform the experience of watching a film. Let\'s explore how music and sound contribute to cinematic narrative.',
        date: 'September 3, 2025'
      }
    ]
  }
};

export default function Blog() {
  const { language } = useLanguage();
  const content = translations[language];

  return (
    <Layout>
      <div
        style={{
          margin: '16px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          textAlign: 'center',
        }}
      >
        <h1>{content.title}</h1>
        <p>{content.description}</p>
        
        <div style={{ marginTop: '32px' }}>
          {content.posts.map((post) => (
            <div
              key={post.id}
              style={{
                background: 'var(--background-secondary)',
                padding: '20px',
                margin: '16px 0',
                borderRadius: '8px',
                textAlign: 'left',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <h3 style={{ margin: '0 0 12px 0', color: 'var(--text)' }}>
                {post.title}
              </h3>
              <p style={{ margin: '0 0 12px 0', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                {post.content}
              </p>
              <small style={{ color: 'var(--text-tertiary)' }}>
                {post.date}
              </small>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
