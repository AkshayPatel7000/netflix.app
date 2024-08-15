import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCAL_STORAGE_TOKEN = {
  USER: 'USER',
  ISAUTHENTICATED: 'ISAUTHENTICATED',
  TOKEN: 'TOKEN',
  USERDATA: 'USERDATA',
  THEME: 'THEME',
  LOGIN: 'LOGIN',
  USER_CRED: 'USER_CRED',
  SKIP_ON_BOARDING: 'SKIP_ON_BOARDING',
  FCM: 'FCM',
  RECENT_WATCHED: 'RECENT_WATCHED',
  RECENT_WATCHED_SERIES: 'RECENT_WATCHED_SERIES',
};

class LocalStorage {
  //USER CRED
  static storeUserCred = async value => {
    await AsyncStorage.setItem(
      LOCAL_STORAGE_TOKEN.USER_CRED,
      JSON.stringify(value),
    );
  };
  static getUserCred = async value => {
    return await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN.USER_CRED)
      .then(res => {
        return JSON.parse(res);
      })
      .catch(err => console.log('err'));
  };

  // USER DETAILS
  static storeUser = async value => {
    var data = JSON.stringify(value);
    await AsyncStorage.setItem(LOCAL_STORAGE_TOKEN.USERDATA, data);
  };
  static getUser = async () => {
    return await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN.USERDATA)
      .then(res => JSON.parse(res))
      .catch(err => console.log('getUser err', err));
  };
  //  IS LOGIN FLAG
  static storeIsLoggedIn = async value => {
    var data = JSON.stringify(value);
    await AsyncStorage.setItem(LOCAL_STORAGE_TOKEN.LOGIN, data);
  };
  static getIsLoggedIn = async () => {
    return await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN.LOGIN)
      .then(res => JSON.parse(res))
      .catch(err => console.log('getIsLoggedIn err', err));
  };

  //  USER TOKEN
  static getToken = async () => {
    return await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN.USER);
  };
  static storeToken = async token => {
    await AsyncStorage.setItem(LOCAL_STORAGE_TOKEN.USER, token);
  };
  static clearToken = async () => {
    await AsyncStorage.clear();
  };
  // FCM
  static getFCMToken = async () => {
    const res = await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN.FCM);

    if (res !== null) {
      return JSON.parse(res);
    } else {
      return null;
    }
  };
  static storeFCMToken = async token => {
    await AsyncStorage.setItem(LOCAL_STORAGE_TOKEN.FCM, JSON.stringify(token));
  };
  static clearFCMToken = async () => {
    await AsyncStorage.clear(LOCAL_STORAGE_TOKEN.FCM);
  };
  static onSignUp = async (token, userDetails) => {
    const items = [
      [LOCAL_STORAGE_TOKEN.ISAUTHENTICATED, 'true'],
      [LOCAL_STORAGE_TOKEN.TOKEN, token],
      [LOCAL_STORAGE_TOKEN.USERDATA, userDetails],
    ];
    return await AsyncStorage.multiSet(items, () => {});
  };

  //  THEME
  static setIsDarkTheme = async themeValue => {
    try {
      const setTheme = await AsyncStorage.setItem(
        LOCAL_STORAGE_TOKEN.THEME,
        JSON.stringify(themeValue),
      );
      return Promise.resolve(true);
    } catch (error) {
      console.log('setTheme_Error - ', error);
      return Promise.reject(error);
    }
  };

  static getIsDarkTheme = async () => {
    try {
      const themeType = await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN.THEME);
      if (themeType == undefined || themeType == null) {
        return Promise.resolve(false);
      }
      return Promise.resolve(JSON.parse(themeType));
    } catch (error) {
      return Promise.reject(error);
    }
  };

  //AsyncStorage setItem
  static storeAsyncData = async (key, data) => {
    try {
      await AsyncStorage.setItem(`@${key}`, JSON.stringify(data));
    } catch (e) {
      console.log('AsyncStorage SETITEM Error ==>>', e);
    }
  };

  //AsyncStorage getItem
  static getAsyncData = async key => {
    try {
      let data = await AsyncStorage.getItem(`@${key}`);
      if (data !== null) {
        var result = JSON.parse(data);
        return Promise.resolve(result);
      }
    } catch (e) {
      console.log('AsyncStorage GETITEM Error==>>', e);
    }
  };

  static setSkipOnBoarding = async () => {
    try {
      await AsyncStorage.setItem(
        `@${LOCAL_STORAGE_TOKEN.SKIP_ON_BOARDING}`,
        JSON.stringify(true),
      );
    } catch (e) {
      console.log('AsyncStorage SETITEM Error ==>>', e);
    }
  };
  static getSkipOnBoarding = async () => {
    try {
      let data = await AsyncStorage.getItem(
        `@${LOCAL_STORAGE_TOKEN.SKIP_ON_BOARDING}`,
      );
      if (data !== null) {
        var result = JSON.parse(data);
        return Promise.resolve(result);
      }
    } catch (e) {
      console.log('AsyncStorage GETITEM Error==>>', e);
    }
  };

  //Clear AysncStorage
  static clearLocalStorage = async () => {
    try {
      console.log('---ASYNC DATA IS CLEAR-->>');
      await AsyncStorage.clear();
    } catch (e) {
      console.log('AsyncStorage Clear', e);
    }
  };
  static LocalStorageLogOut = async () => {
    try {
      const keys = ['TOKEN', 'USERDATA', 'LOGIN', 'USER', 'ISAUTHENTICATED'];
      console.log('---ASYNC DATA IS LOGOUT-->>', keys);
      await AsyncStorage.multiRemove(keys);
    } catch (e) {
      console.log('AsyncStorage Clear', e);
    }
  };
  static addRecentlyWatchedMovie = async movie => {
    try {
      // Get the existing list from AsyncStorage
      const existingMovies = await AsyncStorage.getItem(
        `@${LOCAL_STORAGE_TOKEN.RECENT_WATCHED}`,
      );
      let movies = existingMovies ? JSON.parse(existingMovies) : [];

      // Check if the movie already exists in the list
      const movieExists = movies.some(
        existingMovie => existingMovie.stream_id === movie.stream_id,
      );

      if (!movieExists) {
        // Add the new movie to the list
        movies = [movie, ...movies];

        // Ensure the list length does not exceed 10 items
        if (movies.length > 10) {
          movies.pop(); // Remove the oldest movie (last item in the array)
        }

        // Store the updated list back to AsyncStorage
        await AsyncStorage.setItem(
          `@${LOCAL_STORAGE_TOKEN.RECENT_WATCHED}`,
          JSON.stringify(movies),
        );
      }
    } catch (error) {
      console.error('Error adding movie to recently watched list:', error);
    }
  };
  static getRecentlyWatchedMovie = async () => {
    try {
      let data = await AsyncStorage.getItem(
        `@${LOCAL_STORAGE_TOKEN.RECENT_WATCHED}`,
      );
      if (data !== null) {
        var result = JSON.parse(data);
        return Promise.resolve(result);
      }
    } catch (e) {
      console.log('AsyncStorage GETITEM Error==>>', e);
    }
  };
  static addRecentlyWatchedSeries = async movie => {
    try {
      // Get the existing list from AsyncStorage
      const existingMovies = await AsyncStorage.getItem(
        `@${LOCAL_STORAGE_TOKEN.RECENT_WATCHED_SERIES}`,
      );
      let movies = existingMovies ? JSON.parse(existingMovies) : [];

      // Check if the movie already exists in the list
      const movieExists = movies.some(
        existingMovie => existingMovie.series_id === movie.series_id,
      );

      if (!movieExists) {
        // Add the new movie to the list
        movies = [movie, ...movies];

        // Ensure the list length does not exceed 10 items
        if (movies.length > 10) {
          movies.pop(); // Remove the oldest movie (last item in the array)
        }

        // Store the updated list back to AsyncStorage
        await AsyncStorage.setItem(
          `@${LOCAL_STORAGE_TOKEN.RECENT_WATCHED_SERIES}`,
          JSON.stringify(movies),
        );
      }
    } catch (error) {
      console.error('Error adding movie to recently watched list:', error);
    }
  };
  static getRecentlyWatchedSeries = async () => {
    try {
      let data = await AsyncStorage.getItem(
        `@${LOCAL_STORAGE_TOKEN.RECENT_WATCHED_SERIES}`,
      );
      if (data !== null) {
        var result = JSON.parse(data);
        return Promise.resolve(result);
      }
    } catch (e) {
      console.log('AsyncStorage GETITEM Error==>>', e);
    }
  };
  static clearRecent = async () => {
    try {
      console.log('---ASYNC DATA IS CLEAR-->>');
      await AsyncStorage.removeItem(`@${LOCAL_STORAGE_TOKEN.RECENT_WATCHED}`);
    } catch (e) {
      console.log('AsyncStorage Clear', e);
    }
  };
}

export {LocalStorage};
