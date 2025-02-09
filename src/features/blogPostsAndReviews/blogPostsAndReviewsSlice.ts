import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { RootState } from '../../store/types';
import { searchBlogPosts } from '../blogPost/searchBlogPostSlice';
import { fetchAllAuthoralReviews } from '../writeReviews/writeReviewsSlice';
import { CombinedResponse, SearchParams } from './types';

interface CombinedState {
  data: CombinedResponse | null;
  error: string | null;
  status: 'failed' | 'idle' | 'loading' | 'succeeded';
  lastFetched: number | null;
}

const initialState: CombinedState = {
  data: {
    blogPosts: { entries: [] },
    reviews: { entries: [] }
  },
  error: null,
  status: 'idle',
  lastFetched: null,
};

const formatDateFromISO = (dateString: string) => {
  try {
    return format(parseISO(dateString), 'dd/MM/yyyy', { locale: ptBR });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

export const fetchBlogPostsAndReviews = createAsyncThunk<CombinedResponse, SearchParams>(
  'blogPosts/fetchBlogPostsAndReviews',
  async (params, { dispatch, getState }) => {
    const state = getState() as RootState;
    const lastFetched = state.blogPostsAndReviews.lastFetched;
    const cacheTimeout = 50 * 60 * 1000; // 5 minutos

    // Verifica se os dados em cache ainda são válidos
    if (lastFetched && Date.now() - lastFetched < cacheTimeout) {
      return state.blogPostsAndReviews.data as CombinedResponse;
    }

    const [blogPostsResponse, reviewsResponse] = await Promise.all([
      dispatch(searchBlogPosts(params)).unwrap(),
      dispatch(fetchAllAuthoralReviews({
        filters: params.filters || {},
        page: 1,
        pageSize: 10,
      })).unwrap()
    ]);

    return {
      blogPosts: {
        entries: blogPostsResponse.entries || []
      },
      reviews: {
        entries: (reviewsResponse as any)?.entries || []
      }
    };
  }
);

const blogPostsAndReviewsSlice = createSlice({
  name: 'blogPostsAndReviews',
  initialState,
  reducers: {
    clearState: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPostsAndReviews.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBlogPostsAndReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = {
          blogPosts: {
            entries: action.payload.blogPosts.entries.map(post => ({
              ...post,
              created_at: formatDateFromISO(post.created_at),
            })),
          },
          reviews: {
            entries: action.payload.reviews.entries.map(review => ({
              ...review,
              created_at: formatDateFromISO(review.created_at),
            })),
          },
        };
        state.lastFetched = Date.now();
      })
      .addCase(fetchBlogPostsAndReviews.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Falha ao carregar posts e reviews. Por favor, tente novamente mais tarde.';
      });
  },
});

export const { clearState } = blogPostsAndReviewsSlice.actions;
export default blogPostsAndReviewsSlice.reducer; 