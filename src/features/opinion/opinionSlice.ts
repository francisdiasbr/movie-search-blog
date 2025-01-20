import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import BaseService from '../../api/service';
import { OpinionEntry } from './types';

interface OpinionState {
  data: OpinionEntry | null;
  loading: boolean;
  error: string | null;
}

const initialState: OpinionState = {
  data: null,
  loading: false,
  error: null,
};

interface OpinionResponse {
  data: OpinionEntry;
}

export const fetchOpinion = createAsyncThunk<OpinionState['data'], string>(
  'opinion/fetchOpinion',
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await BaseService.get<OpinionResponse>(
        `/personal-opinion/${movieId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching opinion for movieId ${movieId}:`, error);
      return rejectWithValue('Falha ao buscar a opinião');
    }
  }
);

const opinionSlice = createSlice({
  name: 'opinion',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOpinion.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOpinion.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOpinion.rejected, state => {
        state.loading = false;
        state.error =
          'Falha ao buscar a opinião. Por favor, tente novamente mais tarde.';
        state.data = {
          enjoying_1: 'Enjoy this movie!',
          enjoying_2: 'Enjoy this movie!',
          opinion: 'Enjoy this movie is a glory!',
        };
      });
  },
});

export default opinionSlice.reducer;
