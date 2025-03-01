import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: localStorage.getItem('theme') || 
         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      document.documentElement.setAttribute('data-theme', action.payload);
    }
  }
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;