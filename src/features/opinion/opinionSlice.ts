import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BaseService from '../../api/service';

import { OpinionEntry, OpinionState } from './types';


const initialState: OpinionState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchOpinion = createAsyncThunk<OpinionEntry, string>(
  'opinion/fetchById',
  async (movieId) => {
    const response = await BaseService.get<{data: OpinionEntry}>(`/personal-opinion/${movieId}`);
    return response.data;
  }
);

const opinionSlice = createSlice({
  name: 'opinion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOpinion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOpinion.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log('action.payload', action.payload)
      })
      .addCase(fetchOpinion.rejected, (state) => {
        state.loading = false;
        state.error = 'Falha ao carregar a opinião. Por favor, tente novamente mais tarde.';
      });
  },
});

export default opinionSlice.reducer;