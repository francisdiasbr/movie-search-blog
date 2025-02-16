import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import baseService from '../../api/service';

interface UploadImageState {
  error: string | null;
  imageUrls: string[];
  isCoverImage: boolean[];
  subtitles: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UploadImageState = {
  status: 'idle',
  error: null,
  imageUrls: [],
  subtitles: [],
  isCoverImage: [],
};

interface ImageResponse {
  images: { 
    url: string; 
    filename: string;
    subtitle?: string;
    isCoverImage: boolean;
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
        isCoverImage: response.images.map(image => image.isCoverImage),
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
      state.isCoverImage = [];
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
        state.isCoverImage = action.payload.isCoverImage;
      })
      .addCase(fetchAllImageUrls.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearImageState } = uploadImagesSlice.actions;
export default uploadImagesSlice.reducer;
