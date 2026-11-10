import { createSlice } from '@reduxjs/toolkit';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { addStatusCases, createApiThunk } from '../../lib/api/thunk';
import type { AsyncStatus } from '../../lib/api/types';
import WriteReviewsService from '../writeReviews/service/WriteReviewsService';
import HomeService from './service/HomeService';
import { CombinedResponse, SearchParams, BlogPostCardsResponse } from './types';

interface CombinedState {
  cardsData: BlogPostCardsResponse | null; // Dados otimizados para cards
  data: CombinedResponse | null;
  error: string | null;
  postsAndReviewsStatus: AsyncStatus;
  status: AsyncStatus;
}

const initialState: CombinedState = {
  cardsData: null,
  data: {
    blogPosts: { entries: [] },
    reviews: { entries: [] }
  },
  error: null,
  postsAndReviewsStatus: 'idle',
  status: 'idle',
};

const formatDateFromISO = (dateString: string) => {
  if (!dateString) return 'Data não disponível';

  try {
    const date = parseISO(dateString);
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  } catch {
    return 'Data inválida';
  }
};

const fetchCards = async (params: SearchParams): Promise<BlogPostCardsResponse> => {
  const response = await HomeService.cards(params);
  // Formata data ISO para formato brasileiro
  return {
    ...response,
    entries: response.entries.map(card => ({
      ...card,
      created_at: formatDateFromISO(card.created_at),
    })),
  };
};

// Action otimizada para buscar apenas dados dos cards
export const fetchBlogPostCards = createApiThunk(
  'blogPosts/fetchBlogPostCards',
  fetchCards,
  'Falha ao carregar cards. Por favor, tente novamente mais tarde.'
);

// Chama os services direto (e não os outros thunks) para não sobrescrever
// os cards da home nem a lista de reviews com outro page size.
export const fetchBlogPostsAndReviews = createApiThunk(
  'blogPosts/fetchBlogPostsAndReviews',
  async (params: SearchParams): Promise<CombinedResponse> => {
    const [blogPosts, reviews] = await Promise.all([
      fetchCards(params),
      WriteReviewsService.search({ filters: params.filters, page: 1, pageSize: 10 }),
    ]);
    return {
      blogPosts: { entries: blogPosts.entries ?? [] },
      reviews: {
        entries: (reviews.entries ?? []).map(review => ({
          ...review,
          created_at: formatDateFromISO(review.created_at),
        })),
      },
    };
  },
  'Falha ao carregar posts e reviews. Por favor, tente novamente mais tarde.'
);

const blogPostsAndReviewsSlice = createSlice({
  name: 'blogPostsAndReviews',
  initialState,
  reducers: {},
  extraReducers: builder => {
    addStatusCases(builder, fetchBlogPostCards, 'status', (state, action) => {
      state.cardsData = action.payload;
    });
    addStatusCases(builder, fetchBlogPostsAndReviews, 'postsAndReviewsStatus', (state, action) => {
      state.data = action.payload;
    });
  },
});

export default blogPostsAndReviewsSlice.reducer;
