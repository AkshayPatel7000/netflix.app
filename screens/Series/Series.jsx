import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FONTSIZE} from '../../Utils/Resource';
import {
  getMoviesCategories,
  getSeriesCategories,
} from '../../Services/AuthServices/AuthServices';
import {useTypedSelector} from '../../Store/MainStore';
import {
  selectSeriesCategories,
  selectSetMovieCategories,
} from '../../Store/Slices/AuthSlice';
import {useNavigation} from '@react-navigation/native';
import NavigationStrings from '../../constants/NavigationStrings';
import {selectIsLoading} from '../../Store/Slices/LoaderSlice';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FAB from '../../common/FAB/FAB';

const Series = () => {
  const seriesCategories = useTypedSelector(selectSeriesCategories);
  const navigation = useNavigation();
  const loading = useTypedSelector(selectIsLoading);
  const [searchSeries, setSearchSeries] = useState([]);

  useEffect(() => {
    const init = async () => {
      await getSeriesCategories();
    };
    setSearchSeries(seriesCategories);

    if (seriesCategories?.length === 0) {
      init();
    }
  }, [seriesCategories?.length]);
  const moveTo = item => {
    navigation.navigate(NavigationStrings.SERIES_SCREEN, {...item});
  };
  const onSearch = value => {
    const tempSeries = seriesCategories.filter(ele => {
      const name = ele.category_name.toLowerCase();
      const newValue = value.toLowerCase();
      return name.includes(newValue);
    });
    setSearchSeries(tempSeries);
  };
  const PlaceholderLoader = () => {
    return (
      <SkeletonPlaceholder
        borderRadius={4}
        backgroundColor={'#C8C8C8'}
        highlightColor="#909090"
        speed={2000}>
        {[1, 2, 3, 4, 6, 7, 9, 8, 0].map(e => (
          <SkeletonPlaceholder.Item
            key={e}
            paddingHorizontal={20}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-evenly"
            marginBottom={10}>
            <SkeletonPlaceholder.Item marginTop={6} width={'46%'} height={80} />
            <SkeletonPlaceholder.Item marginTop={6} width={'46%'} height={80} />
          </SkeletonPlaceholder.Item>
        ))}
      </SkeletonPlaceholder>
    );
  };
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.headerText}>What Would you like to watch?</Text>
      </View>
      {loading ? (
        <PlaceholderLoader />
      ) : (
        <FlatList
          contentContainerStyle={{padding: 20, paddingBottom: 100}}
          data={searchSeries}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingBottom: 10,
          }}
          numColumns={2}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => moveTo(item)}>
                <Text style={styles.text} numberOfLines={2}>
                  {item?.category_name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
      <FAB onSubmitEditing={e => onSearch(e?.nativeEvent?.text)} />
    </View>
  );
};

export default Series;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'black',
  },
  card: {
    width: '48%',
    backgroundColor: '#cecece',
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 5,
  },
  text: {
    color: '#000',
    fontSize: FONTSIZE.Text14,
    textAlign: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: FONTSIZE.Text16,
  },
});
