import { Layout } from '../../components/Layout';
import { useLanguage } from '../../contexts/LanguageContext';

const translations = {
  pt: {
    title: 'Blogroll',
    description: 'Essa é uma pequena lista de sites que visito recorrentemente.',
    sites: [
      {
        name: 'A Sharper Focus',
        url: 'https://www.asharperfocus.com/'
      },
      {
        name: 'IMDb',
        url: 'https://imdb.com'
      },
      {
        name: 'Filmsite',
        url: 'https://www.filmsite.org/'
      }
    ]
  },
  en: {
    title: 'Blogroll',
    description: 'This is a small list of websites I frequently visit.',
    sites: [
      {
        name: 'A Sharper Focus',
        url: 'https://www.asharperfocus.com/'
      },
      {
        name: 'IMDb',
        url: 'https://imdb.com'
      },
      {
        name: 'Filmsite',
        url: 'https://www.filmsite.org/'
      }
    ]
  }
};

export default function Blogroll() {
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
        <ul>
          {content.sites.map((site) => (
            <li key={site.url}>
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
