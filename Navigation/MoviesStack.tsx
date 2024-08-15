import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import NavigationStrings from '../constants/NavigationStrings';

import {Details, Movies, MoviesScreen} from '../screens';

const Stack = createNativeStackNavigator();

export default function MoviesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={NavigationStrings.MOVIES_CATEGORIES}
        component={Movies}
      />
      <Stack.Screen
        name={NavigationStrings.MOVIES_LIST}
        component={MoviesScreen}
      />
      <Stack.Screen name={NavigationStrings.DETAILS} component={Details} />
    </Stack.Navigator>
  );
}
