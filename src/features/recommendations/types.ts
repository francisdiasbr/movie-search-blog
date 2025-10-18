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
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

