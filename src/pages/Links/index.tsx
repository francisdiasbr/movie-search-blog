import { Layout } from '../../components/Layout';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from './translations';

export default function Links() {
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
