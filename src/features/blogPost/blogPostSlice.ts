import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import BaseService from '../../api/service';
import { formatDate } from '../../utils/dateUtils';
import { BlogPostEntry } from './types';

interface BlogPostState {
  data: BlogPostEntry | null;
  error: string | null;
  status: 'failed' | 'idle' | 'loading' | 'succeeded';
}

const initialState: BlogPostState = {
  data: null,
  error: null,
  status: 'idle',
};

export const fetchBlogPost = createAsyncThunk<BlogPostEntry, string>(
  'blogPost/fetchById',
  async movieId => {
    try {
      const response = await BaseService.get<BlogPostEntry>(
        `/generate-blogpost/${movieId}`
      );
      // console.log('API Response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      throw error;
    }
  }
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
    builder
      .addCase(fetchBlogPost.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBlogPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.data = {
            ...action.payload,
            created_at: formatDate(action.payload.created_at),
          };
        } else {
          console.error('Payload is undefined');
        }
      })
      .addCase(fetchBlogPost.rejected, state => {
        state.status = 'failed';
        state.error =
          'Falha ao carregar o post do blog. Por favor, tente novamente mais tarde.';
      });
  },
});

export const { clearBlogPostState } = blogPostSlice.actions;
export default blogPostSlice.reducer;
