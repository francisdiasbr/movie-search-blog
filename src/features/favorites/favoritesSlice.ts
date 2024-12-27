import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import BaseService from '../../api/service';

interface SearchFavoritesState {
  data: {
    entries: FavoritesEntry[];
    total_documents: number;
  } | null;
  loading: boolean;
  error: string | null;
}

export interface FavoritesEntry {
  _id: string;
  tconst: string;
  primaryTitle: string;
  startYear: string;
  director: string;
}

const initialState: SearchFavoritesState = {
  data: null,
  loading: false,
  error: null,
};

interface SearchParams {
  filters?: unknown;
  page?: number;
  page_size?: number;
}

interface SearchResponse {
  entries: FavoritesEntry[];
  total_documents: number;
}

export const searchFavorites = createAsyncThunk<SearchResponse, SearchParams>(
  'favorites/search',
  async (
    params = {
      filters: {},
      page: 1,
      page_size: 50,
    }
  ) => {
    try {
      const response = await BaseService.post('/favorites/search', params);
      return response as SearchResponse;
    } catch (error) {
      console.error('Error searching favorites:', error);
      throw error;
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(searchFavorites.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(searchFavorites.rejected, state => {
        state.loading = false;
        state.error =
          'Falha ao buscar filmes favoritos. Por favor, tente novamente mais tarde.';
      });
  },
});

export default favoritesSlice.reducer;
