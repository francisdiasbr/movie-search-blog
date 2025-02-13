import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import baseService from '../../api/service';

interface UploadImageState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  imageUrls: string[];
  subtitles: string[];
}

const initialState: UploadImageState = {
  status: 'idle',
  error: null,
  imageUrls: [],
  subtitles: [],
};

interface ImageResponse {
  images: { 
    url: string; 
    filename: string;
    subtitle?: string;
  }[];
}

export const fetchAllImageUrls = createAsyncThunk(
  '/uploadImages/fetchAllImageUrls',
  async ({ tconst }: { tconst: string }, { rejectWithValue }) => {
    try {
      const response = (await baseService.get(`/images/${tconst}`)) as ImageResponse;
      console.log('API Response:', response);

      return {
        urls: response.images.map(image => image.url),
        subtitles: response.images.map(image => image.subtitle || 'Cena do filme'),
      };
    } catch (error) {
      console.error('Error in fetchAllImageUrls:', error);
      return rejectWithValue('Error fetching images');
    }
  }
);

const uploadImagesSlice = createSlice({
  name: 'uploadImages',
  initialState,
  reducers: {
    clearImageState: (state) => {
      state.status = 'idle';
      state.error = null;
      state.imageUrls = [];
      state.subtitles = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllImageUrls.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllImageUrls.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.imageUrls = action.payload.urls;
        state.subtitles = action.payload.subtitles;
      })
      .addCase(fetchAllImageUrls.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearImageState } = uploadImagesSlice.actions;
export default uploadImagesSlice.reducer;
