import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    isInitialFetchDone: false,
  },
  reducers: {
    setInitialFetchDone: state => {
      state.isInitialFetchDone = true;
    },
    resetData: state => {
      state.isInitialFetchDone = false;
    },
  },
});

export const { setInitialFetchDone, resetData } = dataSlice.actions;
export default dataSlice.reducer;
