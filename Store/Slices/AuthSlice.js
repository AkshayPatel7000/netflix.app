import {createSlice} from '@reduxjs/toolkit';
import {removeIndianLanguages} from '../../Utils/Resource/array';

const initialState = {
  authToken: '',
  userData: {},
  movieCategories: [],
  movies: [],
  mediaDetails: {},
  seriesCategories: [],
  series: [],
  seriesDetails: {},
};

const slice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userData = action.payload;
    },
    setMovieCategories: (state, action) => {
      state.movieCategories = removeIndianLanguages(
        action.payload,
        'category_name',
      );
    },
    setMovie: (state, action) => {
      const data = action.payload.reverse();
      state.movies = data?.sort(
        (a, b) => parseInt(b?.added) - parseInt(a?.added),
      );
    },
    setMediaDetails: (state, action) => {
      state.mediaDetails = action.payload;
    },
    setSeriesCategories: (state, action) => {
      state.seriesCategories = removeIndianLanguages(
        action.payload,
        'category_name',
      );
    },
    setSeries: (state, action) => {
      const data = action.payload.reverse();
      state.series = data?.sort(
        (a, b) => parseInt(b?.added) - parseInt(a?.added),
      );
    },
    setSeriesDetails: (state, action) => {
      state.seriesDetails = action.payload;
    },
    logoutUser: (state, action) => {
      state = {
        authToken: '',
        userData: {},
      };
    },
  },
});

export const {
  setAuthToken,
  setUserProfile,
  logoutUser,
  setMovieCategories,
  setMovie,
  setMediaDetails,
  setSeriesCategories,
  setSeries,
  setSeriesDetails,
} = slice.actions;

export default slice.reducer;

export const selectAuthToken = state => state.AuthSlice.authToken;
export const selectUserData = state => state.AuthSlice.userData;
export const selectSetMovieCategories = state =>
  state.AuthSlice.movieCategories;
export const selectMovies = state => state.AuthSlice.movies;
export const selectMediaDetails = state => state.AuthSlice.mediaDetails;
export const selectSeriesCategories = state => state.AuthSlice.seriesCategories;
export const selectSeries = state => state.AuthSlice.series;
export const selectSeriesDetails = state => state.AuthSlice.seriesDetails;
