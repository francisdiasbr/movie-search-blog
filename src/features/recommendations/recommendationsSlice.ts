import { createSlice } from '@reduxjs/toolkit';

import { Language } from '../../contexts/LanguageContext';
import { addStatusCases, createApiThunk } from '../../lib/api/thunk';
import RecommendationsService from './service/RecommendationsService';
import { RecommendationsState } from './types';

const initialState: RecommendationsState = {
  data: [],
  total: 0,
  status: 'idle',
  error: null,
};

export const fetchRandomRecommendations = createApiThunk(
  'recommendations/fetchRandom',
  ({ language = 'pt' }: { language?: Language } = {}) => RecommendationsService.random(language),
  'Falha ao carregar recomendações.'
);

const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {},
  extraReducers: builder => {
    addStatusCases(builder, fetchRandomRecommendations, 'status', (state, action) => {
      // Acumula os dados ao invés de substituir
      const newMovies = action.payload.data.filter(
        movie => !state.data.some(existing => existing.tconst === movie.tconst)
      );
      state.data = [...state.data, ...newMovies];
      state.total = action.payload.total;
    });
  },
});

export default recommendationsSlice.reducer;
