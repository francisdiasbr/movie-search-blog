import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import BaseService from '../../api/service';
import { formatDate } from '../../utils/dateUtils';

export interface BlogPostEntry {
  _id: string;
  tconst: string;
  primaryTitle: string;
  content: {
    en: {
      title: string;
      introduction: string;
      conclusion: string;
      cultural_importance: string;
      historical_context: string;
      stars_and_characters: string;
      technical_analysis: string;
    };
    pt: {
      title: string;
      introduction: string;
      conclusion: string;
      cultural_importance: string;
      historical_context: string;
      stars_and_characters: string;
      technical_analysis: string;
    };
  };
  created_at: string;
  images: string[];
  original_movie_soundtrack: string;
  poster_url: string;
  references: string[];
  soundtrack_video_url: string;
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
  async movieId => {
    try {
      const response = await BaseService.get<BlogPostEntry>(
        `/generate-blogpost/${movieId}`
      );
      console.log('API Response:', response);
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
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBlogPost.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPost.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.data = {
            ...action.payload,
            created_at: formatDate(action.payload.created_at),
          };
          console.log('action.payload', action.payload);
        } else {
          console.error('Payload is undefined');
        }
      })
      .addCase(fetchBlogPost.rejected, state => {
        state.loading = false;
        state.error =
          'Falha ao carregar o post do blog. Por favor, tente novamente mais tarde.';
      });
  },
});

export const { clearBlogPostState } = blogPostSlice.actions;
export default blogPostSlice.reducer;
