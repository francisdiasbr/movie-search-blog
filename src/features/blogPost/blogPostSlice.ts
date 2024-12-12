import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BaseService from '../../api/service';

export interface BlogPostEntry {
  tconst: string;
  primaryTitle: string;
  title: string;
  introduction: string;
  stars_and_characters: string;
  historical_context: string;
  cultural_importance: string;
  technical_analysis: string;
  original_movie_soundtrack: string;
  conclusion: string;
  poster_url: string;
}

interface BlogPostState {
  data: BlogPostEntry | null;
  loading: boolean;
  error: string | null;
}

const initialState: BlogPostState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchBlogPost = createAsyncThunk<BlogPostEntry, string>(
  'blogPost/fetchById',
  async (movieId) => {
    try {
      const response = await BaseService.get<{data: BlogPostEntry}>(`/generate-blogpost/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      throw error;
    }
  }
);

const blogPostSlice = createSlice({
  name: 'blogPost',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPost.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log('action.payload', action.payload)
      })
      .addCase(fetchBlogPost.rejected, (state) => {
        state.loading = false;
        state.error = 'Falha ao carregar o post do blog. Por favor, tente novamente mais tarde.';
      });
  },
});

export default blogPostSlice.reducer; 