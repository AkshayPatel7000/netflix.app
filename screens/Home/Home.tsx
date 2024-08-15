import {View, StyleSheet, FlatList, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import categories from '../../data/categories';
import CategorySlider from './components/CategorySlider';
import Header from '../../common/Header';
import {LocalStorage} from '../../Utils/Resource';
import {useFocusEffect} from '@react-navigation/native';

const Home = props => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchMovies = async () => {
        const recentlyWatched = await LocalStorage.getRecentlyWatchedMovie();
        if (recentlyWatched) {
          setMovies(recentlyWatched);
        }
      };
      const fetchSeries = async () => {
        const recentlyWatchedSeries =
          await LocalStorage.getRecentlyWatchedSeries();
        if (recentlyWatchedSeries) {
          setSeries(recentlyWatchedSeries);
        }
      };
      fetchMovies();
      fetchSeries();
    }, [props]),
  );

  return (
    <View style={styles.pageContainer}>
      <Header />
      {movies?.length === 0 && series?.length === 0 && (
        <View
          style={{
            flex: 1,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff', fontSize: 20, fontWeight: '600'}}>
            No recent activity
          </Text>
          <Text
            style={{
              color: '#D3D3D3',
              fontSize: 16,
              fontWeight: '500',
              textAlign: 'center',
              marginTop: 20,
              width: '80%',
            }}>
            We’re currently updating your recently watched list. Check back in a
            moment to see the latest movies you’ve enjoyed. Thank you for your
            patience as we refresh your viewing history.
          </Text>
        </View>
      )}
      {movies?.length > 0 && (
        <CategorySlider category={{movies, title: 'Recently watched movies'}} />
      )}
      {series?.length > 0 && (
        <CategorySlider
          category={{movies: series, title: 'Recently watched series'}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
});

export default Home;
