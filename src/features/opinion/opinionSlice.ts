import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import BaseService from '../../api/service';

interface OpinionState {
  data: {
    opinion: string;
    rate: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: OpinionState = {
  data: null,
  loading: false,
  error: null,
};

interface OpinionResponse {
  data: {
    opinion: string;
    rate: string;
  };
}

export const fetchOpinion = createAsyncThunk<OpinionState['data'], string>(
  'opinion/fetchOpinion',
  async movieId => {
    try {
      const response = await BaseService.get<OpinionResponse>(
        `/api/personal-opinion/${movieId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching opinion for movieId ${movieId}:`, error);
      return {
        opinion: 'Esse filme é um verdadeiro achado. Uma lufada de ar fresco.',
        rate: '10.0',
      };
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
      });
  },
});

export default opinionSlice.reducer;
