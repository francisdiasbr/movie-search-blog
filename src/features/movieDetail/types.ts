import { Recommendation } from '../recommendations/types';

export interface DirectorInfo {
  _id?: string;
  name: string;
  bio: string;
  photo: string | null;
  directors?: DirectorInfo[]; // Para múltiplos diretores
}

export interface Track {
  title: string;
  artist: string;
  spotify_id: string | null;
  preview_url: string | null;
  external_urls: {
    spotify?: string;
  };
  album: {
    name: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
  } | null;
  duration_ms: number | null;
  description: string;
}

export interface SoundtrackInfo {
  _id?: string;
  movie_title: string;
  movie_year: number | null;
  movie_director: string | null;
  tracks: Track[];
  description: string;
  source: string;
}

export interface MovieDetailCache {
  director?: DirectorInfo | null;
  movie?: Recommendation;
  soundtrack?: SoundtrackInfo | null;
}

export interface SoundtrackQuery {
  director?: string;
  title: string;
  year: string;
}
