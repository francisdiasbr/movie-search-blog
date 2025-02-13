import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import BaseService from '../../api/service';
import { MovieReviewResponse } from './types';


interface MovieReviewState {
  data: MovieReviewResponse | null;
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
      console.log('response fetchAllAuthoralReviews', response);
      if (response) {
        return response;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching all Authoral reviews:', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

const allAuthoralReviewsSlice = createSlice({
  initialState,
  name: 'reviews',
  reducers: {
    clearAuthoralReviewStatus(state) {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAuthoralReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllAuthoralReviews.fulfilled, (state, action) => {
        const payload = action.payload as MovieReviewResponse;
        state.status = 'succeeded';
        state.data = payload;
      })
      .addCase(fetchAllAuthoralReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearAuthoralReviewStatus } = allAuthoralReviewsSlice.actions;

export default allAuthoralReviewsSlice.reducer;
