/**
 * Redux slice that manages the visibility state of modals
 * Controls showing/hiding modals on the screen
 */
import { createSlice } from '@reduxjs/toolkit';
const modalVisibilitySlice = createSlice({
  name: 'modalVisibility',
  initialState: false,
  reducers: {
    toggleModal: state => !state,
  },
});

export const { toggleModal } = modalVisibilitySlice.actions;

export default modalVisibilitySlice.reducer;
