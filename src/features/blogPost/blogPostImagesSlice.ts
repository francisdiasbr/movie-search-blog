import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import baseService from '../../api/service';

interface UploadImageState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  objectName: string | null;
  imageUrl: string | null;
  imageUrls: string[];
  imageNames: string[];
}

const initialState: UploadImageState = {
  status: 'idle',
  error: null,
  objectName: null,
  imageUrl: null,
  imageUrls: [],
  imageNames: [],
};

interface ImageResponse {
  images: { url: string; filename: string }[];
}

export const fetchAllImageUrls = createAsyncThunk<
  { urls: string[]; names: string[] },
  { tconst: string }
>(
  '/uploadImages/fetchAllImageUrls',
  async ({ tconst }, { rejectWithValue }) => {
    try {
      const response = (await baseService.get(
        `/personal-opinion/get-all-image-urls/${tconst}`
      )) as ImageResponse;

      const urls = response.images.map((image: { url: string }) => image.url);
      const names = response.images.map(
        (image: { filename: string }) => image.filename
      );

      return { urls, names };
    } catch (error) {
      console.error('Error fetching all image URLs:', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

const uploadImagesSlice = createSlice({
  name: 'uploadImages',
  initialState,
  reducers: {
    clearImageState: state => {
      state.status = 'idle';
      state.error = null;
      state.objectName = null;
      state.imageUrl = null;
      state.imageUrls = [];
      state.imageNames = [];
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
        state.imageNames = action.payload.names;
        console.log('Nomes das imagens no slice:', action.payload.names);
      })
      .addCase(fetchAllImageUrls.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearImageState } = uploadImagesSlice.actions;
export default uploadImagesSlice.reducer;
