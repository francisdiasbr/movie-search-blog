import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import BaseService from '../../api/service';
import { formatDate } from '../../utils/dateUtils';
import { BlogPostEntry } from './types';

interface SearchBlogPostState {
  data: {
    entries: BlogPostEntry[];
    total_documents: number;
  } | null;
  status: 'failed' | 'idle' | 'loading' | 'succeeded';
  error: string | null;
}

interface SearchResponse {
  entries: BlogPostEntry[];
  total_documents: number;
}

interface SearchParams {
  filters?: unknown;
  page?: number;
  page_size?: number;
}

const initialState: SearchBlogPostState = {
  data: null,
  status: 'idle',
  error: null,
};

export const searchBlogPosts = createAsyncThunk<SearchResponse, SearchParams>(
  'blogPost/search',
  async (
    params = {
      filters: {},
      page: 1,
      page_size: 50,
    }
  ) => {
    try {
      const response = await BaseService.post(
        '/generate-blogpost/search',
        params
      );
      return response as SearchResponse;
    } catch (error) {
      console.error('Error searching blog posts:', error);
      throw error;
    }
  }
);

const searchBlogPostSlice = createSlice({
  name: 'searchBlogPost',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(searchBlogPosts.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(searchBlogPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = {
          entries: action.payload.entries.map(entry => ({
            ...entry,
            created_at: formatDate(entry.created_at),
          })),
          total_documents: action.payload.total_documents,
        };
      })
      .addCase(searchBlogPosts.rejected, state => {
        state.status = 'failed';
        state.error =
          'Falha ao buscar posts do blog. Por favor, tente novamente mais tarde.';
      });
  },
});

export default searchBlogPostSlice.reducer;
