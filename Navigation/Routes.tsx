import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTypedSelector} from '../Store/MainStore';
import {selectUserData} from '../Store/Slices/AuthSlice';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const user = useTypedSelector(selectUserData);
  console.log('🚀 ~ Routes ~ user:', user?.activationKey);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {user?.activationKey ? MainStack(Stack) : AuthStack()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
