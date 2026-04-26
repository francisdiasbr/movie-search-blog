import { BlogPostEntry } from '../blogPost/types';
import { MovieReviewResponse } from '../writeReviews/types';

export interface CombinedResponse {
  blogPosts: {
    entries: BlogPostEntry[];
  };
  reviews: {
    entries: MovieReviewResponse[];
  };
}

export interface SearchParams {
  filters?: {
    $or?: Array<{
      title?: { $regex: string; $options: string };
      primaryTitle?: { $regex: string; $options: string };
      introduction?: { $regex: string; $options: string };
    }>;
  };
  page: number;
  pageSize: number;
}

// Interface para cards otimizados
export interface BlogPostCard {
  tconst: string;
  primaryTitle: string;
  created_at: string;
  imageUrl?: string;
  _id?: string; // Opcional para compatibilidade
}

export interface BlogPostCardsResponse {
  entries: BlogPostCard[];
  total_documents: number;
} 