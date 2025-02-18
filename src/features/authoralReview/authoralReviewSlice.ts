import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import BaseService from '../../api/service';
import { formatDate } from '../../utils/dateUtils';
import { AuthoralReview } from './types';


interface AuthoralReviewState {
  data: AuthoralReview | null;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: AuthoralReviewState = {
  data: null,
  error: null,
  status: 'idle',
};

export const fetchAuthoralReview = createAsyncThunk(
  'authoralReview/fetchById',
  async (tconst: string) => {
    try {
      const url = `/write-review/${tconst}`;
      const response = await BaseService.get(url) as { data: AuthoralReview };
      return response.data;
    } catch (error: any) {
      // Se for 404, retornamos null em vez de lançar erro
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }
);

const authoralReviewSlice = createSlice({
  name: 'authoralReview',
  initialState,
  reducers: {
    clearAuthoralReviewState: (state) => {
      state.data = null;
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthoralReview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuthoralReview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload ? {
          ...action.payload,
          created_at: formatDate(action.payload.created_at),
        } : null;
        state.error = null;
      })
      .addCase(fetchAuthoralReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { clearAuthoralReviewState } = authoralReviewSlice.actions;
export default authoralReviewSlice.reducer;
