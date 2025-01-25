import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  typeView: 'project',
};

const typeViewSlice = createSlice({
  name: 'typeView',
  initialState,
  reducers: {
    changeTypeView(state, action) {
      state.typeView = action.payload;
    },
  },
});

export const { changeTypeView } = typeViewSlice.actions;
export default typeViewSlice.reducer;
