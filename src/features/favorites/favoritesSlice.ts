import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import BaseService from '../../api/service';
import { FavoritesEntry } from './types';

interface SearchFavoritesState {
  data: {
    entries: FavoritesEntry[];
    total_documents: number;
  } | null;
  loading: boolean;
  error: string | null;
  currentFavorite: FavoritesEntry | null;
  initialFetchDone: boolean;
}

const initialState: SearchFavoritesState = {
  data: null,
  loading: false,
  error: null,
  currentFavorite: null,
  initialFetchDone: false,
};

interface SearchParams {
  filters?: unknown;
  search_term?: string;
}

interface SearchResponse {
  entries: FavoritesEntry[];
  total_documents: number;
  countries: string[];
  years: number[];
}

interface GetFavoriteByIdResponse {
  entry: FavoritesEntry | null;
}

export const searchFavorites = createAsyncThunk<SearchResponse, SearchParams>(
  'favorites/search',
  async (params = { filters: {}, search_term: '' }) => {
    const response = await BaseService.post('/favorites/search', {
      filters: params.filters || {},
      search_term: params.search_term || '',
    }) as SearchResponse;

    return {
      entries: response.entries,
      total_documents: response.total_documents,
      countries: response.countries,
      years: response.years,
    };
  }
);

export const getFavoriteById = createAsyncThunk<GetFavoriteByIdResponse, string>(
  'favorites/getById',
  async (tconst) => {
    const response = await BaseService.post('/favorites/search', {
      filters: {
        tconst: {
          $eq: tconst
        }
      },
      search_term: '',
    }) as SearchResponse;

    return {
      entry: response.entries.length > 0 ? response.entries[0] : null
    };
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavoriteState: (state) => {
      state.currentFavorite = null;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(searchFavorites.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.initialFetchDone = true;
      })
      .addCase(searchFavorites.rejected, state => {
        state.loading = false;
        state.error =
          'Falha ao buscar filmes favoritos. Por favor, tente novamente mais tarde.';
      })
      .addCase(getFavoriteById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFavoriteById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentFavorite = action.payload.entry;
      })
      .addCase(getFavoriteById.rejected, state => {
        state.loading = false;
        state.error = 'Falha ao buscar favorito.';
      });
  },
});

export const { clearFavoriteState } = favoritesSlice.actions;

export default favoritesSlice.reducer;
