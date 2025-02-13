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
  total_pages: number;
  current_page: number;
  page_size: number;
}

export const searchFavorites = createAsyncThunk<SearchResponse, SearchParams>(
  'favorites/search',
  async (params = { filters: {}, page: 1, page_size: 10 }) => {
    try {
      const firstResponse = await BaseService.post('/favorites/search', {
        ...params,
        page: 1,
        page_size: 10
      }) as SearchResponse;

      const totalPages = firstResponse.total_pages;
      let allEntries = [...firstResponse.entries];

      const remainingPages = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);
      const remainingRequests = remainingPages.map(page =>
        BaseService.post('/favorites/search', {
          ...params,
          page,
          page_size: 10
        })
      );

      const remainingResponses = await Promise.all(remainingRequests);
      
      remainingResponses.forEach(response => {
        allEntries = [...allEntries, ...(response as SearchResponse).entries];
      });

      return {
        entries: allEntries,
        total_documents: firstResponse.total_documents,
        total_pages: totalPages,
        current_page: 1,
        page_size: allEntries.length
      };
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
