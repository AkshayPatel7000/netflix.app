import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import NavigationStrings from '../constants/NavigationStrings';
import {Login, MainLogin} from '../screens/';
const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <>
      <Stack.Screen name={NavigationStrings.LOGIN} component={Login} />
      <Stack.Screen name={NavigationStrings.MAIN} component={MainLogin} />
    </>
  );
};

export default AuthStack;
