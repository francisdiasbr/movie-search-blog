import type { AsyncStatus } from '../../lib/api/types';

export interface Recommendation {
  _id: string;
  position: number;
  tconst: string;
  title: string;
  original_title: string;
  year: string;
  director: string;
  genres: string;
  imdb_rating: string;
  runtime: string;
  url: string;
  title_type: string;
  image_url?: string;
}

export interface RecommendationsState {
  data: Recommendation[];
  total: number;
  status: AsyncStatus;
  error: string | null;
}

export interface RandomRecommendationsResponse {
  data: Recommendation[];
  total: number;
}
