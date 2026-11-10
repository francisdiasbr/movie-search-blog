import { createSlice } from '@reduxjs/toolkit';

import { addStatusCases, createApiThunk } from '../../lib/api/thunk';
import type { AsyncStatus } from '../../lib/api/types';
import FavoritesService from './service/FavoritesService';
import { FavoritesEntry, FavoritesSearchParams, FavoritesSearchResponse } from './types';

interface SearchFavoritesState {
  currentFavorite: FavoritesEntry | null;
  data: FavoritesSearchResponse | null;
  error: string | null;
  initialFetchDone: boolean;
  status: AsyncStatus;
}

const initialState: SearchFavoritesState = {
  currentFavorite: null,
  data: null,
  error: null,
  initialFetchDone: false,
  status: 'idle',
};

export const searchFavorites = createApiThunk(
  'favorites/search',
  (params: FavoritesSearchParams) => FavoritesService.search(params),
  'Falha ao buscar filmes favoritos. Por favor, tente novamente mais tarde.'
);

export const getFavoriteById = createApiThunk(
  'favorites/getById',
  (tconst: string) => FavoritesService.getByTconst(tconst),
  'Falha ao buscar favorito.'
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavoriteState: state => {
      state.currentFavorite = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    addStatusCases(builder, searchFavorites, 'status', (state, action) => {
      state.data = action.payload;
      state.initialFetchDone = true;
    });
    addStatusCases(builder, getFavoriteById, 'status', (state, action) => {
      state.currentFavorite = action.payload;
    });
  },
});

export const { clearFavoriteState } = favoritesSlice.actions;

export default favoritesSlice.reducer;
