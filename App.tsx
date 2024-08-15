import React, {useEffect, useState} from 'react';
import SplashScreen from './common/SplashScreen';
import Routes from './Navigation/Routes';
import {useAppDispatch} from './Store/MainStore';
import {setAuthToken, setUserProfile} from './Store/Slices/AuthSlice';
import {LocalStorage} from './Utils/Resource';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';
import Orientation from 'react-native-orientation-locker';
const App = () => {
  Orientation.lockToPortrait();
  const [showSplash, setShowSplash] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const init = async () => {
      const LocalData = await LocalStorage.getUser();

      const LocalToken = await LocalStorage.getToken();
      if (LocalData) {
        dispatch(setAuthToken(LocalToken));
        dispatch(setUserProfile(LocalData));
      }
    };
    init();

    let timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return showSplash ? (
    <SplashScreen />
  ) : (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: 'black'}}>
      <Routes />
      <FlashMessage duration={3000} />
    </GestureHandlerRootView>
  );
};

export default App;
