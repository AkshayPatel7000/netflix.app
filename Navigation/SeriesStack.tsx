import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import NavigationStrings from '../constants/NavigationStrings';

import {Series, SeriesDetails, SeriesScreen} from '../screens';

const Stack = createNativeStackNavigator();

export default function SeriesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={NavigationStrings.SERIES} component={Series} />
      <Stack.Screen
        name={NavigationStrings.SERIES_SCREEN}
        component={SeriesScreen}
      />
      <Stack.Screen
        name={NavigationStrings.SERIES_DETAILS}
        component={SeriesDetails}
      />
    </Stack.Navigator>
  );
}
