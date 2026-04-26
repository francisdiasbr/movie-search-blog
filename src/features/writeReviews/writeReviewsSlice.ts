import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import BaseService from '../../api/service';
import { MovieReviewResponse } from './types';


interface MovieReviewState {
  data: { entries: MovieReviewResponse[]; total_documents: number } | null;
  error: unknown;
  status: 'failed' | 'idle' | 'loading' | 'succeeded';
}

const initialState: MovieReviewState = {
  data: null,
  error: null,
  status: 'idle',
};

interface FetchAllAuthoralReviewsParams {
  filters?: any;
  page: number;
  pageSize?: number;
}

export const fetchAllAuthoralReviews = createAsyncThunk(
  'review/fetchAllAuthoral',
  async (params: FetchAllAuthoralReviewsParams, { rejectWithValue }) => {
    const url = '/write-review/search';
    try {
      const fetchBody = {
        filters: params.filters || {},
        page: params.page,
        page_size: params.pageSize,
      };
      const response = await BaseService.post(url, fetchBody);
      if (response) {
        return response;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const allAuthoralReviewsSlice = createSlice({
  initialState,
  name: 'reviews',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAuthoralReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllAuthoralReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload as { entries: MovieReviewResponse[]; total_documents: number };
      })
      .addCase(fetchAllAuthoralReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default allAuthoralReviewsSlice.reducer;
