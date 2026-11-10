import { createSlice } from '@reduxjs/toolkit';

import { nullIfNotFound } from '../../lib/api/errors';
import { addStatusCases, createApiThunk } from '../../lib/api/thunk';
import type { AsyncStatus } from '../../lib/api/types';
import { formatDate } from '../../utils/dateUtils';
import AuthoralReviewService from './service/AuthoralReviewService';
import { AuthoralReview } from './types';

interface AuthoralReviewState {
  data: AuthoralReview | null;
  error: string | null;
  status: AsyncStatus;
}

const initialState: AuthoralReviewState = {
  data: null,
  error: null,
  status: 'idle',
};

export const fetchAuthoralReview = createApiThunk(
  'authoralReview/fetchById',
  async (tconst: string) => (await nullIfNotFound(AuthoralReviewService.getByTconst(tconst)))?.data ?? null,
  'Falha ao carregar a review. Por favor, tente novamente mais tarde.'
);

const authoralReviewSlice = createSlice({
  name: 'authoralReview',
  initialState,
  reducers: {
    clearAuthoralReviewState: state => {
      state.data = null;
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: builder => {
    addStatusCases(builder, fetchAuthoralReview, 'status', (state, action) => {
      state.data = action.payload
        ? { ...action.payload, created_at: formatDate(action.payload.created_at) }
        : null;
    });
  },
});

export const { clearAuthoralReviewState } = authoralReviewSlice.actions;
export default authoralReviewSlice.reducer;
