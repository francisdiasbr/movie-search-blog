import { createSlice } from '@reduxjs/toolkit';

import { nullIfNotFound } from '../../lib/api/errors';
import { addStatusCases, createApiThunk } from '../../lib/api/thunk';
import type { AsyncStatus } from '../../lib/api/types';
import { formatDate } from '../../utils/dateUtils';
import BlogPostService from './service/BlogPostService';
import { BlogPostEntry } from './types';

interface BlogPostState {
  data: BlogPostEntry | null;
  error: string | null;
  status: AsyncStatus;
}

const initialState: BlogPostState = {
  data: null,
  error: null,
  status: 'idle',
};

export const fetchBlogPost = createApiThunk(
  'blogPost/fetchById',
  async (tconst: string) => (await nullIfNotFound(BlogPostService.getByTconst(tconst)))?.data ?? null,
  'Falha ao carregar o post do blog. Por favor, tente novamente mais tarde.'
);

const blogPostSlice = createSlice({
  name: 'blogPost',
  initialState,
  reducers: {
    clearBlogPostState: state => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    addStatusCases(builder, fetchBlogPost, 'status', (state, action) => {
      state.data = action.payload
        ? { ...action.payload, created_at: formatDate(action.payload.created_at) }
        : null;
    });
  },
});

export const { clearBlogPostState } = blogPostSlice.actions;
export default blogPostSlice.reducer;
