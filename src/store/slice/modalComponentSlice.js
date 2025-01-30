/**
 * Redux slice for managing modal component state.
 * Controls which component is rendered within the modal.
 */
import { createSlice } from '@reduxjs/toolkit';
const modalComponentSlice = createSlice({
  name: 'modalComponent',
  initialState: null,
  reducers: {
    setModalComponent: (state, action) => action.payload,
  },
});

export const { setModalComponent } = modalComponentSlice.actions;
export default modalComponentSlice.reducer;
