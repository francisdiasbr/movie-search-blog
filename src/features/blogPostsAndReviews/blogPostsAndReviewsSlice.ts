import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import BaseService from '../../api/service';
import { fetchAllAuthoralReviews } from '../writeReviews/writeReviewsSlice';
import { CombinedResponse, SearchParams, BlogPostCardsResponse } from './types';

interface CombinedState {
  data: CombinedResponse | null;
  cardsData: BlogPostCardsResponse | null; // Dados otimizados para cards
  error: string | null;
  status: 'failed' | 'idle' | 'loading' | 'succeeded';
}

const initialState: CombinedState = {
  data: {
    blogPosts: { entries: [] },
    reviews: { entries: [] }
  },
  cardsData: null,
  error: null,
  status: 'idle',
};

const formatDateFromISO = (dateString: string) => {
  if (!dateString) return 'Data não disponível';
  
  try {
    const date = parseISO(dateString);
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  } catch (error) {
    return 'Data inválida';
  }
};

// Action otimizada para buscar apenas dados dos cards
export const fetchBlogPostCards = createAsyncThunk<BlogPostCardsResponse, SearchParams>(
  'blogPosts/fetchBlogPostCards',
  async (params = { filters: {}, page: 1, pageSize: 10 }) => {
    const response = await BaseService.post<BlogPostCardsResponse>(
      '/home/cards',
      {
        filters: params.filters || {},
        page: params.page || 1,
        page_size: params.pageSize || 10,
      }
    );
    
    // Formata data ISO para formato brasileiro
    return {
      ...response,
      entries: response.entries.map(card => ({
        ...card,
        created_at: formatDateFromISO(card.created_at),
      })),
    };
  }
);

export const fetchBlogPostsAndReviews = createAsyncThunk<CombinedResponse, SearchParams>(
  'blogPosts/fetchBlogPostsAndReviews',
  async (params, { dispatch }) => {
    // Usa o mesmo endpoint otimizado /home/cards para garantir imageUrl do S3
    const [blogPostsResponse, reviewsResponse] = await Promise.all([
      dispatch(fetchBlogPostCards({
        filters: params.filters || {},
        page: params.page || 1,
        pageSize: params.pageSize || 10,
      })).unwrap(),
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Reducers para fetchBlogPostCards (endpoint otimizado)
      .addCase(fetchBlogPostCards.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBlogPostCards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cardsData = action.payload;
      })
      .addCase(fetchBlogPostCards.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Falha ao carregar cards. Por favor, tente novamente mais tarde.';
      })
      // Reducers para fetchBlogPostsAndReviews (endpoint completo - mantido para compatibilidade)
      .addCase(fetchBlogPostsAndReviews.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBlogPostsAndReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = {
          blogPosts: {
            // blogPosts já vêm formatados com imageUrl do S3 do fetchBlogPostCards
            entries: action.payload.blogPosts.entries
          },
          reviews: {
            entries: action.payload.reviews.entries.map(review => ({
              ...review,
              created_at: formatDateFromISO(review.created_at),
            })),
          },
        };
      })
      .addCase(fetchBlogPostsAndReviews.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Falha ao carregar posts e reviews. Por favor, tente novamente mais tarde.';
      });
  },
});

export default blogPostsAndReviewsSlice.reducer; 