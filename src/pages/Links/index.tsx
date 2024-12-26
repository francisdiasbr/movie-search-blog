import { Layout } from '../../components/Layout';

export default function Links() {
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
        <h1>Links</h1>
        <p>Essa é uma pequena lista de sites que visito recorrentemente.</p>
        <ul>
          <li>
            <a
              href="https://www.asharperfocus.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              A Sharper Focus
            </a>
          </li>
          <li>
            <a
              href="https://imdb.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              IMDb
            </a>
          </li>
          <li>
            <a
              href="https://www.filmsite.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Filmsite
            </a>
          </li>
        </ul>
      </div>
    </Layout>
  );
}
