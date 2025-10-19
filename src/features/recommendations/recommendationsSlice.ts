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
  async ({ count = 6, language = 'pt' }: { count?: number; language?: string } = {}) => {
    const response = await BaseService.get<{ data: any[]; total: number }>(
      `/recommendations/random?count=${count}`,
      {},
      language
    );
    return response;
  }
);

const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    resetRecommendations: (state) => {
      state.data = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomRecommendations.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRandomRecommendations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Acumula os dados ao invés de substituir
        const newMovies = action.payload.data.filter(
          (movie: any) => !state.data.some((existing: any) => existing.tconst === movie.tconst)
        );
        state.data = [...state.data, ...newMovies];
        state.total = action.payload.total;
      })
      .addCase(fetchRandomRecommendations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch recommendations';
      });
  },
});

export const { resetRecommendations } = recommendationsSlice.actions;

export default recommendationsSlice.reducer;

