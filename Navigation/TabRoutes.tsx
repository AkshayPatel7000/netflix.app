import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useRef} from 'react';
import Icons from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationStrings from '../constants/NavigationStrings';
import {Home, Profile} from '../screens';
import MoviesStack from './MoviesStack';
import SeriesStack from './SeriesStack';
import {
  Animated,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const AnimatedTabBar = ({state, descriptors, navigation}) => {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const Subs = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Subs.remove();
    };
  }, []);
  const _keyboardDidShow = () => {
    Animated.timing(translateY, {
      toValue: 100, // Hide tab bar
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const _keyboardDidHide = () => {
    Animated.timing(translateY, {
      toValue: 0, // Show tab bar
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Animated.View
      style={[
        styles.container,
        {transform: [{translateY}]},
        {paddingBottom: insets.bottom},
      ]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.tabBarLabel || route.name;
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={() => navigation.navigate(route.name)}>
            {options?.tabBarIcon({focused: isFocused})}
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 12,
                textTransform: 'none',
                marginTop: 5,
                color: 'gray',
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
};

const TabRoutes = () => {
  return (
    <Tab.Navigator
      tabBar={props => <AnimatedTabBar {...props} />}
      initialRouteName={NavigationStrings.HOME}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name={NavigationStrings.HOME}
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            console.log('🚀 ~ TabRoutes ~ focused:', focused);
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
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0,0,0,0.8)',
    position: 'absolute',
    // height: 70,
    borderTopWidth: 0,
    elevation: 10,
    paddingRight: 10,
    bottom: 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
});

export default TabRoutes;
