
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    finished: false,
};
const eidSlice = createSlice({
  name: 'eid',
  initialState,
  reducers: {
    finish: (state) => {
      state.finished = true;
    },
  },
});

export const { finish } = eidSlice.actions;
export default eidSlice.reducer;
