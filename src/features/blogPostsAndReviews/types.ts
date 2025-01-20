import { BlogPostEntry } from '../blogPost/types';
import { MovieReviewResponse } from '../writeReviews/types';

export type CombinedEntry = BlogPostEntry | MovieReviewResponse;

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