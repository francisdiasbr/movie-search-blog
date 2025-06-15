import * as S from './styles';
import { useLanguage } from '../../contexts/LanguageContext';

export function Section({ title, content }: { title?: string; content: string }) {
  if (!content) return null;

  return (
    <S.Section>
      <h2>{title}</h2>
      <p>{content}</p>
    </S.Section>
  );
}

export function SpotifyEmbed({ url }: { url: string }) {
  if (!url) return null;
  const match = url.match(/spotify\.com\/(album|artist|playlist|episode|show|track)\/([^/?]+)/);
  if (!match) {
    console.warn('URL do Spotify inválida:', url);
    return null;
  }
  const [, type, id] = match;
  return (
    <div style={{ margin: '20px 0', width: '100%', borderRadius: 12, overflow: 'hidden' }}>
      <iframe
        src={`https://open.spotify.com/embed/${type}/${id}`}
        width="100%"
        height="250"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}

export function ImageGallery({ images, subtitles }: { 
  images: string[]; 
  subtitles?: { en: string; pt: string; }[] 
}) {
  const { language } = useLanguage();
  
  if (!images || images.length === 0) return null;

  return (
    <>
      {images.map((url, index) => (
        <div key={index}>
          <S.ImageWrapper>
            <img src={url} alt={`Imagem ${index + 1}`} />
          </S.ImageWrapper>
          <p>{subtitles?.[index]?.[language] || ''}</p>
        </div>
      ))}
    </>
  );
} 