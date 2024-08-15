import {store} from '../../Store/MainStore';
import {
  setMediaDetails,
  setMovie,
  setMovieCategories,
  setSeries,
  setSeriesCategories,
  setSeriesDetails,
} from '../../Store/Slices/AuthSlice';
import {showError} from '../../Utils/helperFunction';

import {setIsLoading} from '../../Store/Slices/LoaderSlice';
import {default as Client} from '../Client/Client';
import URLS from '../Client/Endpoints';

export const getMoviesCategories = async body => {
  try {
    const user = store.getState(store => store.AuthSlice.userData);
    const {username = '', password = ''} = user?.AuthSlice?.userData;

    const payload = {
      username,
      password,
      action: 'get_vod_categories',
    };
    store.dispatch(setIsLoading(true));
    const {data} = await Client.get(URLS.GET_CATEGORIES(payload));
    store.dispatch(setMovieCategories(data));
    // store.dispatch(setAuthToken(data.acces_Token));
    store.dispatch(setIsLoading(false));
    return data;
  } catch (error) {
    store.dispatch(setIsLoading(false));

    console.log('🚀 ~ file: AuthServices.js:16 ~ login ~ error:', error);
    showError(error?.message);
  }
};
export const getMovies = async id => {
  try {
    const user = store.getState(store => store.AuthSlice.userData);
    const {username = '', password = ''} = user?.AuthSlice?.userData;

    const payload = {
      username,
      password,
      action: 'get_vod_streams',
      category_id: id,
    };
    store.dispatch(setIsLoading(true));
    const {data} = await Client.get(URLS.GET_MOVIES_SERIES(payload));
    store.dispatch(setMovie(data));
    store.dispatch(setIsLoading(false));
    return data;
  } catch (error) {
    store.dispatch(setIsLoading(false));

    console.log('🚀 ~ file: AuthServices.js:16 ~ login ~ error:', error);
    showError(error?.message);
  }
};
export const getMediaDetails = async media => {
  try {
    const user = store.getState(store => store.AuthSlice.userData);
    const {username = '', password = ''} = user?.AuthSlice?.userData;

    const payload = {
      username,
      password,
      vod_id: media?.stream_id,
    };
    console.log('🚀 ~ getMediaDetails ~ payload:', payload);
    store.dispatch(setIsLoading(true));
    const {data} = await Client.get(URLS.GET_MOVIE_DETAILS(payload));

    store.dispatch(setMediaDetails(data));
    store.dispatch(setIsLoading(false));
    return data;
  } catch (error) {
    store.dispatch(setIsLoading(false));

    console.log('🚀 ~ file: AuthServices.js:16 ~ login ~ error:', error);
    showError(error?.message);
  }
};

export const getSeriesCategories = async body => {
  try {
    const user = store.getState(store => store.AuthSlice.userData);
    const {username = '', password = ''} = user?.AuthSlice?.userData;

    const payload = {
      username,
      password,
      action: 'get_series_categories',
    };
    store.dispatch(setIsLoading(true));
    const {data} = await Client.get(URLS.GET_CATEGORIES(payload));
    store.dispatch(setSeriesCategories(data));
    // store.dispatch(setAuthToken(data.acces_Token));
    store.dispatch(setIsLoading(false));
    return data;
  } catch (error) {
    store.dispatch(setIsLoading(false));

    console.log('🚀 ~ file: getSeriesCategories.js:16 ~ login ~ error:', error);
    showError(error?.message);
  }
};
export const getSeries = async id => {
  try {
    const user = store.getState(store => store.AuthSlice.userData);
    const {username = '', password = ''} = user?.AuthSlice?.userData;

    const payload = {
      username,
      password,
      action: 'get_series',
      category_id: id,
    };
    store.dispatch(setIsLoading(true));
    const {data} = await Client.get(URLS.GET_MOVIES_SERIES(payload));
    store.dispatch(setSeries(data));
    store.dispatch(setIsLoading(false));
    return data;
  } catch (error) {
    store.dispatch(setIsLoading(false));

    console.log('🚀 ~ file: getSeries ~ login ~ error:', error);
    showError(error?.message);
  }
};
export const getSeriesApiDetails = async media => {
  try {
    const user = store.getState(store => store.AuthSlice.userData);
    const {username = '', password = ''} = user?.AuthSlice?.userData;

    const payload = {
      username,
      password,
      series_id: media?.series_id,
    };

    store.dispatch(setIsLoading(true));
    const {data} = await Client.get(URLS.GET_SERIES_DETAILS(payload));

    store.dispatch(setSeriesDetails(data));
    store.dispatch(setIsLoading(false));
    return data;
  } catch (error) {
    store.dispatch(setIsLoading(false));

    console.log('🚀 ~ file: getSeriesApiDetails ~ login ~ error:', error);
    showError(error?.message);
  }
};
