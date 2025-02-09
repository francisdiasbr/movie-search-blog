import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import baseService from '../../api/service';

interface UploadImageState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  objectName: string | null;
  imageUrl: string | null;
  imageUrls: string[];
  imageNames: string[];
  imageCache: {
    [tconst: string]: {
      urls: string[];
      names: string[];
    };
  };
}

const initialState: UploadImageState = {
  status: 'idle',
  error: null,
  objectName: null,
  imageUrl: null,
  imageUrls: [],
  imageNames: [],
  imageCache: {},
};

interface ImageResponse {
  images: { url: string; filename: string }[];
}

export const fetchAllImageUrls = createAsyncThunk<
  { urls: string[]; names: string[] },
  { tconst: string }
>(
  '/uploadImages/fetchAllImageUrls',
  async ({ tconst }, { getState, rejectWithValue }) => {
    const state = getState() as { blogPostImages: UploadImageState };

    // Verifica cache
    const cachedData = state.blogPostImages.imageCache[tconst];
    if (cachedData?.urls.length > 0) {
      return {
        urls: cachedData.urls,
        names: cachedData.names,
      };
    }

    try {
      const response = (await baseService.get(`/images/${tconst}`)) as ImageResponse;
      return {
        urls: response.images.map(image => image.url),
        names: response.images.map(image => image.filename),
      };
    } catch (error) {
      return rejectWithValue('Error fetching images');
    }
  }
);

const uploadImagesSlice = createSlice({
  name: 'uploadImages',
  initialState,
  reducers: {
    clearImageCache: (state) => {
      state.imageCache = {};
    },
    clearImageState: (state) => {
      state.status = 'idle';
      state.error = null;
      state.objectName = null;
      state.imageUrl = null;
      state.imageUrls = [];
      state.imageNames = [];
      state.imageCache = {};
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllImageUrls.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllImageUrls.fulfilled, (state, action) => {
        const tconst = action.meta.arg.tconst;
        state.status = 'succeeded';
        state.imageUrls = action.payload.urls;
        state.imageNames = action.payload.names;
        
        // Adicionar ao cache
        state.imageCache[tconst] = {
          urls: action.payload.urls,
          names: action.payload.names,
        };
      })
      .addCase(fetchAllImageUrls.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearImageCache, clearImageState } = uploadImagesSlice.actions;
export default uploadImagesSlice.reducer;
