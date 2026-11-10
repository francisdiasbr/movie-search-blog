import { createSlice } from '@reduxjs/toolkit';

import { addStatusCases, createApiThunk } from '../../lib/api/thunk';
import type { AsyncStatus } from '../../lib/api/types';
import WriteReviewsService from './service/WriteReviewsService';
import { ReviewsSearchParams, ReviewsSearchResponse } from './types';

interface MovieReviewState {
  data: ReviewsSearchResponse | null;
  error: string | null;
  status: AsyncStatus;
}

const initialState: MovieReviewState = {
  data: null,
  error: null,
  status: 'idle',
};

export const fetchAllAuthoralReviews = createApiThunk(
  'review/fetchAllAuthoral',
  (params: ReviewsSearchParams) => WriteReviewsService.search(params),
  'Falha ao carregar as reviews. Por favor, tente novamente mais tarde.'
);

const allAuthoralReviewsSlice = createSlice({
  initialState,
  name: 'reviews',
  reducers: {},
  extraReducers: builder => {
    addStatusCases(builder, fetchAllAuthoralReviews, 'status', (state, action) => {
      state.data = action.payload;
    });
  },
});

export default allAuthoralReviewsSlice.reducer;
