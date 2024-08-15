import {StyleSheet, Text, View, Image, FlatList, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import NavigationStrings from '../../../constants/NavigationStrings';

interface CategorySliderProps {
  category: {
    id: string;
    title: string;
    movies: [];
  }[];
}

const CategorySlider = (props: CategorySliderProps) => {
  const {title, movies} = props.category;
  const navigation = useNavigation();

  const handlePress = item => {
    if (item?.stream_id) {
      // navigation.navigate(NavigationStrings.DETAILS, {...item});
      navigation.navigate(NavigationStrings.MOVIE_STACK, {
        screen: NavigationStrings.DETAILS,
        params: {...item},
      });
    }
    if (item?.series_id) {
      navigation.navigate(NavigationStrings.SERIES_STACK, {
        screen: NavigationStrings.SERIES_DETAILS,
        params: {...item},
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <FlatList
        data={movies}
        renderItem={({item}) => (
          <Pressable
            style={styles.imageContainer}
            onPress={() => handlePress(item)}>
            <Image
              style={styles.image}
              source={{uri: item.stream_icon || item.cover}}
            />
          </Pressable>
        )}
        horizontal
        keyExtractor={item => item?.stream_id || item?.series_id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CategorySlider;

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
    marginBottom: 30,
  },

  imageContainer: {
    height: 250,
    justifyContent: 'flex-start',
  },
  image: {
    height: 250,
    width: 150,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 15,
  },
  title: {
    height: 50,
    width: '100%',
    backgroundColor: '#000',
    justifyContent: 'flex-start',
  },
  titleText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
