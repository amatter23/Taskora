import { createSlice } from '@reduxjs/toolkit';
const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    visibility: false,
    title: '',
    fullScreen: false,
  },
  reducers: {
    toggleModal: state => {
      state.visibility = !state.visibility;
    },
    setModalTitle: (state, action) => {
      state.title = action.payload;
    },
    setModalFullScreen: (state, action) => {
      state.fullScreen = action.payload;
    },
  },
});

export const { toggleModal, setModalTitle, setModalFullScreen } =
  modalSlice.actions;

export default modalSlice.reducer;
