import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isDarkMode: false,
};

const slice = createSlice({
  name: 'Loader',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const {setIsLoading, setIsDarkMode} = slice.actions;

export default slice.reducer;

export const selectIsLoading = state => state.Loader.isLoading;
export const selectIsDarkTheme = state => state.Loader.isDarkMode;
