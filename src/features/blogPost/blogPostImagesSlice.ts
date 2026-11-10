import { createSlice } from '@reduxjs/toolkit';

import { addStatusCases, createApiThunk } from '../../lib/api/thunk';
import type { AsyncStatus } from '../../lib/api/types';
import ImagesService from './service/ImagesService';

interface UploadImageState {
  status: AsyncStatus;
  error: string | null;
  imageUrls: string[];
  subtitles: { en: string; pt: string; }[];
  coverImages: Record<string, string>;
}

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
  } catch {
    // Cache API não disponível ou erro ao salvar - continua sem cache
  }
};

const initialState: UploadImageState = {
  status: 'idle',
  error: null,
  coverImages: {},
  imageUrls: [],
  subtitles: [],
};

export const fetchAllImageUrls = createApiThunk(
  '/uploadImages/fetchAllImageUrls',
  async ({ tconst }: { tconst: string }) => {
    const { images } = await ImagesService.list(tconst);
    return {
      urls: images.map(image => image.url),
      subtitles: images.map(image => ({
        en: image.subtitle_en || 'Movie scene',
        pt: image.subtitle_pt || 'Cena do filme'
      })),
    };
  },
  'Error fetching images'
);

export const fetchCoverImage = createApiThunk(
  'uploadImages/fetchCoverImage',
  async ({ tconst }: { tconst: string }) => {
    // Tenta carregar do cache primeiro
    const cachedUrl = await loadFromCache(tconst);
    if (cachedUrl) {
      return { tconst, coverUrl: cachedUrl };
    }

    const response = await ImagesService.list(tconst);
    await saveToCache(tconst, new Response(JSON.stringify(response)));
    return { tconst, coverUrl: response.images[0]?.url };
  },
  'Error fetching cover image'
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
    addStatusCases(builder, fetchAllImageUrls, 'status', (state, action) => {
      state.imageUrls = action.payload.urls;
      state.subtitles = action.payload.subtitles;
    }).addCase(fetchCoverImage.fulfilled, (state, action) => {
      if (action.payload.coverUrl) {
        state.coverImages[action.payload.tconst] = action.payload.coverUrl;
      }
    });
  },
});

export const { clearImageState } = uploadImagesSlice.actions;
export default uploadImagesSlice.reducer;
