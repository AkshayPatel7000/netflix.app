import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icons from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationStrings from '../constants/NavigationStrings';
import {Home, Profile} from '../screens';
import MoviesStack from './MoviesStack';
import SeriesStack from './SeriesStack';

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  return (
    <Tab.Navigator
      initialRouteName={NavigationStrings.HOME}
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          color: 'grey',
        },
        tabBarStyle: {
          backgroundColor: 'rgba(0,0,0,0.8)',
          position: 'absolute',
          height: 70,
          borderTopWidth: 0,
          elevation: 10,
          paddingRight: 10,
        },
      }}>
      <Tab.Screen
        name={NavigationStrings.HOME}
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Icons name="home" size={25} color={focused ? 'red' : 'grey'} />
            );
          },
        }}
      />
      <Tab.Screen
        name={NavigationStrings.MOVIE_STACK}
        component={MoviesStack}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <MaterialCommunityIcons
                name="movie-open-outline"
                size={25}
                color={focused ? 'red' : 'grey'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={NavigationStrings.SERIES_STACK}
        component={SeriesStack}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <MaterialCommunityIcons
                name="play-box-multiple-outline"
                size={25}
                color={focused ? 'red' : 'grey'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={NavigationStrings.PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Icons name="user" size={25} color={focused ? 'red' : 'grey'} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
