import { createSlice } from '@reduxjs/toolkit';

export const benchmarkDataReducerSlice = createSlice({
  name: 'Collection',
  initialState: {
    benchmark: null,
  },
  reducers: {
    setBenchmark: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.benchmark = action.payload.benchmark;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBenchmark } = benchmarkDataReducerSlice.actions;

export default benchmarkDataReducerSlice.reducer;
