import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import baseService from '../../api/service';

interface UploadImageState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  imageUrls: string[];
  subtitles: string[];
  coverImages: Record<string, string>;
}

const CACHE_KEY = 'coverImagesCache';

const CACHE_NAME = 'movie-images-cache';

const loadFromCache = async (tconst: string): Promise<string | null> => {
  try {
    const cache = await caches.open(CACHE_NAME);
    const response = await cache.match(`/images/${tconst}`);
    if (response) {
      const data = await response.json();
      return data.images[0]?.url;
    }
    return null;
  } catch {
    return null;
  }
};

const saveToCache = async (tconst: string, response: Response) => {
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(`/images/${tconst}`, response.clone());
  } catch (error) {
    console.warn('Erro ao salvar no cache:', error);
  }
};

const initialState: UploadImageState = {
  status: 'idle',
  error: null,
  coverImages: {},
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
      // console.log('API Response:', response);

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

export const fetchCoverImage = createAsyncThunk(
  'uploadImages/fetchCoverImage',
  async ({ tconst }: { tconst: string }, { rejectWithValue }) => {
    try {
      // Tenta carregar do cache primeiro
      const cachedUrl = await loadFromCache(tconst);
      if (cachedUrl) {
        return { tconst, coverUrl: cachedUrl };
      }

      const response = await baseService.get(`/images/${tconst}`) as ImageResponse;
      await saveToCache(tconst, new Response(JSON.stringify(response)));
      
      return {
        tconst,
        coverUrl: response.images[0]?.url
      };
    } catch (error) {
      return rejectWithValue('Error fetching cover image');
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
      })
      .addCase(fetchCoverImage.fulfilled, (state, action) => {
        if (action.payload.coverUrl) {
          state.coverImages[action.payload.tconst] = action.payload.coverUrl;
          // Atualiza o cache
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
              timestamp: Date.now(),
              data: state.coverImages
            }));
          } catch (error) {
            console.warn('Erro ao salvar cache:', error);
          }
        }
      });
  },
});

export const { clearImageState } = uploadImagesSlice.actions;
export default uploadImagesSlice.reducer;
