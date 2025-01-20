import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import BaseService from '../../api/service';
import { formatDate } from '../../utils/dateUtils';
interface ReviewContent {
  pt: {
    text: string;
  };
}

export interface AuthoralReview {
  _id: string;
  tconst: string;
  primaryTitle: string;
  content: ReviewContent;
  created_at: string;
  isAiGenerated: boolean;
  references: string[];
  images: string[];
}

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
    const url = `/write-review/${tconst}`;
    const response = await BaseService.get(url) as { data: AuthoralReview };
    return response.data;
  }
);

const authoralReviewSlice = createSlice({
  name: 'authoralReview',
  initialState,
  reducers: {
    clearState: (state) => {
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
        state.data = {
          ...action.payload,
          created_at: formatDate(action.payload.created_at),
        };
      })
      .addCase(fetchAuthoralReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default authoralReviewSlice.reducer;
