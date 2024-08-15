import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {getMovies} from '../../Services/AuthServices/AuthServices';
import {useTypedSelector} from '../../Store/MainStore';
import {selectMovies} from '../../Store/Slices/AuthSlice';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {selectIsLoading} from '../../Store/Slices/LoaderSlice';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import NavigationStrings from '../../constants/NavigationStrings';

const MoviesScreen = ({route}) => {
  const navigation = useNavigation();
  const movies = useTypedSelector(selectMovies);
  const loading = useTypedSelector(selectIsLoading);
  useEffect(() => {
    const init = async () => {
      await getMovies(route?.params?.category_id);
    };
    init();
  }, [route?.params?.category_id]);

  const handlePress = item => {
    navigation.navigate(NavigationStrings.DETAILS, {...item});
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  const PlaceholderLoader = () => {
    return (
      <SkeletonPlaceholder
        borderRadius={4}
        backgroundColor={'#C8C8C8'}
        highlightColor="#909090"
        speed={2000}>
        <SkeletonPlaceholder.Item
          paddingHorizontal={20}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-evenly"
          marginBottom={10}>
          <SkeletonPlaceholder.Item marginTop={6} width={'46%'} height={250} />
          <SkeletonPlaceholder.Item marginTop={6} width={'46%'} height={250} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          paddingHorizontal={20}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-evenly"
          marginBottom={10}>
          <SkeletonPlaceholder.Item marginTop={6} width={'46%'} height={250} />
          <SkeletonPlaceholder.Item marginTop={6} width={'46%'} height={250} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          paddingHorizontal={20}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-evenly"
          marginBottom={10}>
          <SkeletonPlaceholder.Item marginTop={6} width={'46%'} height={250} />
          <SkeletonPlaceholder.Item marginTop={6} width={'46%'} height={250} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    );
  };

  return (
    <View style={styles.main}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={30} />
        </TouchableOpacity>
        <Text style={styles.headingText}>Movies</Text>
        <View />
      </View>
      {loading && <PlaceholderLoader />}
      <FlatList
        data={movies}
        numColumns={2}
        contentContainerStyle={{padding: 20, paddingBottom: 100}}
        columnWrapperStyle={styles.columnWrapperStyle}
        renderItem={({item}) => (
          <Pressable
            style={styles.imageContainer}
            onPress={() => handlePress(item)}
            key={item.stream_id}>
            <FastImage style={styles.image} source={{uri: item?.stream_icon}} />
            <LinearGradient
              colors={['#00000000', '#0000001A', '#000000D6']}
              style={styles.gradient}>
              <View style={{padding: 10}}>
                <Text style={{color: '#fff'}} numberOfLines={2}>
                  {item?.name}
                </Text>
                <View style={styles.titleContainer}>
                  <Icon name="star" size={14} color={'#ebe428'} />
                  <Text style={styles.title} numberOfLines={2}>
                    {item?.rating_5based}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </Pressable>
        )}
        keyExtractor={item => item?.stream_id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default MoviesScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'black',
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headingText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: -30,
  },
  imageContainer: {
    height: 250,
    width: '46%',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  image: {
    height: 250,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 15,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00000033',
    justifyContent: 'flex-end',
  },
  columnWrapperStyle: {
    justifyContent: 'space-evenly',
    paddingVertical: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  title: {color: '#fff', marginLeft: 5},
});
