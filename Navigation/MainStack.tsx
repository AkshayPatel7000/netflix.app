import React from 'react';
import NavigationStrings from '../constants/NavigationStrings';
import TabRoutes from './TabRoutes';
import {Player} from '../screens';

export default function (Stack: any) {
  return (
    <>
      <Stack.Screen
        name={NavigationStrings.BOTTOM_STACK}
        component={TabRoutes}
      />
      <Stack.Screen name={NavigationStrings.PLAYER} component={Player} />
    </>
  );
}
