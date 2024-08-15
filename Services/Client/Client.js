import axios from 'axios';
import {LocalStorage} from '../../Utils/Resource';

const client = axios.create({
  baseURL: 'http://iboxx.us:8080',
});

client.interceptors.request.use(
  async config => {
    // store.dispatch(setIsLoading(true));
    return config;
  },
  function (error) {
    // store.dispatch(setIsLoading(false));

    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  res => {
    // store.dispatch(setIsLoading(false));

    if (res.status !== 200) {
      throw res.data;
    }

    return res;
  },
  async error => {
    // store.dispatch(setIsLoading(false));

    if (error.message === 'Network Error') {
      if (error?.response?.status === 504) {
        throw {
          error,
          message: 'Something went wrong. Please try again later.',
        };
      } else {
        throw {
          error,
          message:
            'You are not connected to the internet. Verify your connection and then try again.',
        };
      }
    }
    if (error.response) {
      if (error.response.status === 500) {
        throw {
          message: 'Something went wrong. Please try again later.',
        };
      }
      if (error.response.status === 401) {
        // logout loginStore.logout();logic
        // loginStore.logout();
        await LocalStorage.LocalStorageLogOut();
      }
      if (error.response.status === 403) {
        // redirect user to some home page since that action is not allowed
      }
      throw {
        ...error.response.data,
        statusCode: error.response.status,
      };
    }
    throw {
      message: 'Something went wrong. Please try again later.',
    };
  },
);

export default client;
