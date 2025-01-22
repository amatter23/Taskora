import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalStatus: false,
};

const modalStatusSlice = createSlice({
  name: 'modalStatus',
  initialState,
  reducers: {
    changeModalStatus(state) {
      state.modalStatus = !state.modalStatus;
    },
  },
});

export const { changeModalStatus } = modalStatusSlice.actions;
export default modalStatusSlice.reducer;
