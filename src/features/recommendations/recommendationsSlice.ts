import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BaseService from '../../api/service';
import { RecommendationsState } from './types';

const initialState: RecommendationsState = {
  data: [],
  total: 0,
  status: 'idle',
  error: null,
};

export const fetchRandomRecommendations = createAsyncThunk(
  'recommendations/fetchRandom',
  async (count: number = 6) => {
    const response = await BaseService.get<{ data: any[]; total: number }>(
      `/recommendations/random?count=${count}`
    );
    return response;
  }
);

const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomRecommendations.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRandomRecommendations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchRandomRecommendations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch recommendations';
      });
  },
});

export default recommendationsSlice.reducer;

