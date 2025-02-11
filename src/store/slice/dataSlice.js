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
  },
});

export const { setInitialFetchDone } = dataSlice.actions;
export default dataSlice.reducer;
