import {
  FlatList,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTypedSelector} from '../../Store/MainStore';
import {
  selectSeriesDetails,
  selectUserData,
} from '../../Store/Slices/AuthSlice';
import {getSeriesApiDetails} from '../../Services/AuthServices/AuthServices';
import Icon from 'react-native-vector-icons/Feather';
import Ionicon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import data from '../../data/movie';
import {Picker} from '@react-native-picker/picker';
import EpisodeCard from '../Details/Components/EpisodeCard';
import {height, LocalStorage} from '../../Utils/Resource';
import NavigationStrings from '../../constants/NavigationStrings';
import {selectIsLoading} from '../../Store/Slices/LoaderSlice';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SeriesDetails = ({navigation, route}) => {
  const user = useTypedSelector(selectUserData);
  const seriesDetails = useTypedSelector(selectSeriesDetails);
  const loading = useTypedSelector(selectIsLoading);

  const [season, setSeason] = useState(1);
  useEffect(() => {
    const init = async () => {
      await getSeriesApiDetails(route?.params);
    };
    if (seriesDetails?.seasons?.length > 0) {
      setSeason(seriesDetails?.seasons[0]?.season_number);
    }
    init();
  }, [route?.params]);
  const openYouTubeVideo = () => {
    const url = `https://www.youtube.com/watch?v=${seriesDetails?.info?.youtube_trailer}`;
    const alternateUrl = `https://www.youtube.com/results?search_query=${
      seriesDetails?.info?.name + ' ' + 'trailer'
    }`;
    if (seriesDetails?.info?.youtube_trailer) {
      Linking.openURL(url);
    } else {
      Linking.openURL(alternateUrl);
    }
  };

  const playEpisode = async item => {
    await LocalStorage.addRecentlyWatchedSeries(route?.params);
    const url = `${user.servers[0]}/series/${user?.username}/${user?.password}/${item?.id}.${item?.container_extension}`;
    navigation.navigate(NavigationStrings.PLAYER, {
      url,
    });
  };

  const PlaceholderLoader = () => {
    return (
      <SkeletonPlaceholder
        borderRadius={4}
        backgroundColor={'#C8C8C8'}
        highlightColor="#909090"
        speed={2000}>
        <SkeletonPlaceholder.Item
          justifyContent="space-evenly"
          marginBottom={10}>
          <SkeletonPlaceholder.Item marginTop={6} width={'100%'} height={300} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginBottom={10} paddingHorizontal={20}>
          <SkeletonPlaceholder.Item
            marginVertical={6}
            width={'50%'}
            height={30}
          />
          <SkeletonPlaceholder.Item marginBottom={10} flexDirection="row">
            <SkeletonPlaceholder.Item
              marginVertical={6}
              width={'20%'}
              height={20}
              marginRight={20}
            />
            <SkeletonPlaceholder.Item
              marginVertical={6}
              width={'15%'}
              height={20}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            marginVertical={6}
            width={'10%'}
            height={20}
          />
          <SkeletonPlaceholder.Item marginBottom={10} flexDirection="row">
            <SkeletonPlaceholder.Item
              width={'20%'}
              height={30}
              borderRadius={40}
            />
            <SkeletonPlaceholder.Item
              marginHorizontal={5}
              width={'20%'}
              height={30}
              borderRadius={40}
            />
            <SkeletonPlaceholder.Item
              width={'20%'}
              height={30}
              borderRadius={40}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={40}
            borderRadius={8}
            marginVertical={10}
          />
          <SkeletonPlaceholder.Item width={'100%'} height={80} />
          <SkeletonPlaceholder.Item marginVertical={10} flexDirection="row">
            <SkeletonPlaceholder.Item width={'5%'} height={10} />
            <SkeletonPlaceholder.Item
              marginHorizontal={5}
              width={'6%'}
              height={10}
            />
            <SkeletonPlaceholder.Item
              width={'8%'}
              marginRight={5}
              height={10}
            />
            <SkeletonPlaceholder.Item width={'5%'} height={10} />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item marginVertical={10} flexDirection="row">
            <SkeletonPlaceholder.Item width={'5%'} height={10} />
            <SkeletonPlaceholder.Item
              marginHorizontal={5}
              width={'6%'}
              height={10}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    );
  };

  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      contentContainerStyle={{paddingBottom: 100}}
      style={styles.pageContainer}
      showsVerticalScrollIndicator={false}>
      <View>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={30} color="white" />
          </Pressable>
          {/* <Icon name="cast" size={30} color="white" /> */}
        </View>
      </View>
      {loading ? (
        <PlaceholderLoader />
      ) : (
        <>
          <View style={styles.trailerContainer}>
            <Image
              source={{uri: seriesDetails?.info?.cover}}
              style={styles.trailer}
            />
            {/* <Pressable style={styles.playBtn}>
          <Ionicon name="play-sharp" size={30} color="white" />
        </Pressable>
        <Pressable
          style={styles.audioBtn}
          onPress={() => {
            setIsMute(!isMute);
          }}>
          {isMute ? (
            <Octicons name="mute" size={20} color="white" />
          ) : (
            <Octicons name="unmute" size={20} color="white" />
          )}
        </Pressable> */}
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.showName}>{seriesDetails?.info?.name}</Text>
            <View style={styles.stats}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name={'star'} size={18} />
                <Text style={styles.match}>
                  {seriesDetails?.info?.rating}/IMDb
                </Text>
              </View>

              <Text style={styles.year}>
                {moment(seriesDetails?.info?.releasedate).format('YYYY')}
              </Text>
              {seriesDetails?.info?.age && (
                <Text style={styles.age}>{seriesDetails?.info?.age}</Text>
              )}
              {/* <Text style={styles.seasons}>{data.numberOfSeasons} Seasons</Text>
          <MaterialIcons name="hd" size={30} color="white" /> */}
            </View>
            <View style={{marginVertical: 2}}>
              <Text style={styles.match}>Genre</Text>
              <ScrollView
                style={{flexDirection: 'row', marginTop: 10}}
                horizontal
                showsHorizontalScrollIndicator={false}>
                {seriesDetails?.info?.genre?.split(',')?.map(e => (
                  <View
                    style={{
                      borderRadius: 50,
                      backgroundColor: '#DBE3FF',
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      marginLeft: 5,
                    }}>
                    <Text style={{color: '#88A4E8'}}>{e}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* <Pressable style={styles.playButton} onPress={Play}>
          <Ionicon name="play-sharp" size={30} color="black" />
          <Text style={styles.playText}>Play</Text>
        </Pressable> */}
            <Pressable style={styles.downloadBtn} onPress={openYouTubeVideo}>
              <Icon name="youtube" size={30} color="white" />
              <Text style={styles.downloadText}>Watch Trailer</Text>
            </Pressable>
            <Text style={styles.description}>{seriesDetails?.info?.plot}</Text>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.cast}>
              Cast: {seriesDetails?.info?.cast}
            </Text>
            <Text style={styles.creator}>
              Creator: {seriesDetails?.info?.director}
            </Text>
          </View>
          {/* <View style={styles.buttonGroup}>
        <Pressable
          style={styles.button}
          onPress={() => {
            setIsAdded(!isAdded);
          }}>
          {isAdded ? (
            <Octicons name="checklist" size={30} color="red" />
          ) : (
            <Icon name="plus" size={30} color="white" />
          )}
          <Text style={styles.buttonText}>My List</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            setIsLiked(!isLiked);
          }}>
          {isLiked ? (
            <Icon name="thumbs-up" size={30} color="red" />
          ) : (
            <Icon name="thumbs-up" size={30} color="white" />
          )}
          <Text style={styles.buttonText}>Rate</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Icon name="share" size={30} color="white" />
          <Text style={styles.buttonText}>Share</Text>
        </Pressable>
      </View> */}

          <Picker
            style={styles.picker}
            selectedValue={season}
            onValueChange={(itemValue, itemIndex) => {
              console.log('🚀 ~ SeriesDetails ~ itemValue:', typeof itemValue);
              setSeason(itemValue);
            }}>
            {seriesDetails?.seasons?.map(seasonItem => (
              <Picker.Item
                key={seasonItem?.season_number}
                label={seasonItem?.name}
                value={seasonItem?.season_number}
              />
            ))}
          </Picker>
          <View style={styles.episodeContainer}>
            <FlatList
              data={
                seriesDetails?.episodes ? seriesDetails?.episodes[season] : []
              }
              keyExtractor={item => item?.series_id}
              ItemSeparatorComponent={
                <View
                  style={{
                    height: 20,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: 'gray',
                      width: '80%',
                      alignSelf: 'center',
                      marginHorizontal: 5,
                    }}
                  />
                </View>
              }
              renderItem={({item}) => (
                <EpisodeCard
                  title={item.title}
                  poster={item?.info?.movie_image}
                  duration={item?.info?.duration}
                  plot={item.info.plot}
                  onEpisodePress={() => playEpisode(item)}
                />
              )}
              ListEmptyComponent={
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>No Episode Found</Text>
                </View>
              }
              showsVerticalScrollIndicator={false}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default SeriesDetails;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  trailerContainer: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  trailer: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  playBtn: {
    position: 'absolute',
    borderColor: 'red',
    height: 60,
    width: 60,
    padding: 8,
    borderWidth: 2,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioBtn: {
    position: 'absolute',
    height: 40,
    width: 40,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
    bottom: 20,
  },
  detailsContainer: {
    padding: 15,
  },
  showName: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    gap: 10,
  },
  match: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    marginLeft: 5,
  },
  year: {
    color: 'grey',
    fontSize: 16,
    marginRight: 10,
  },
  age: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    backgroundColor: 'yellow',
    padding: 3,
    borderRadius: 5,
  },
  seasons: {
    color: 'grey',
    fontSize: 16,
    marginRight: 10,
  },
  playButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginTop: 20,
  },
  playText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  downloadBtn: {
    backgroundColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  downloadText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  description: {
    color: 'lightgrey',
    fontSize: 16,
    marginVertical: 10,
  },
  cast: {
    color: 'lightgrey',
    fontSize: 12,
    marginVertical: 5,
  },
  creator: {
    color: 'lightgrey',
    fontSize: 12,
    marginVertical: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 0,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    margin: 5,
  },
  episodeOpions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    gap: 10,
    width: '80%',
  },
  episodeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: 'red',
    borderTopWidth: 5,
    width: '35%',
  },
  episodeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
  },
  more: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
  },
  moreText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
  },
  picker: {
    width: '50%',
    color: 'white',
    margin: 20,
  },
  pickerItem: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  episodeContainer: {
    flex: 1,
    marginBottom: 60,
  },
});
