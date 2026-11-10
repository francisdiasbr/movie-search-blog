export interface FavoritesEntry {
  _id: string;
  originalTitle: string;
  primaryTitle: string;
  startYear: string;
  tconst: string;
  wiki: string;
  soundtrack?: string;
  plot: string;
  stars: string[];
  country: string;
  plot_keywords: string[];
  genres: string[];
  writers: string[];
  trivia: string[];
  quote: string;
  rating: number;
  director: string;
}
export interface FavoritesSearchParams {
  filters?: unknown;
  page?: number;
  pageSize?: number;
  searchTerm?: string;
}

export interface FavoritesSearchResponse {
  countries: string[];
  entries: FavoritesEntry[];
  total_documents: number;
  years: number[];
}
