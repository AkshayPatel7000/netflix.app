import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  FlatList,
  Linking,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import data from '../../data/movie';
import Icon from 'react-native-vector-icons/Feather/';
import Ionicon from 'react-native-vector-icons/Ionicons/';
import Octicons from 'react-native-vector-icons/Octicons/';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons/';
import Thumbs from 'react-native-vector-icons/FontAwesome5';
import {Picker} from '@react-native-picker/picker';
import EpisodeCard from './Components/EpisodeCard';
import {getMediaDetails} from '../../Services/AuthServices/AuthServices';
import {useTypedSelector} from '../../Store/MainStore';
import {selectMediaDetails, selectUserData} from '../../Store/Slices/AuthSlice';
import moment from 'moment';
import NavigationStrings from '../../constants/NavigationStrings';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {selectIsLoading} from '../../Store/Slices/LoaderSlice';
import {LocalStorage} from '../../Utils/Resource';

interface Movie {
  id: string;
  title: string;
  year: number;
  numberOfSeasons: number;
  plot: string;
  cast: string;
  creator: string;
  seasons: {
    items: {
      id: string;
      name: string;
      episodes: {
        items: {
          id: string;
          title: string;
          poster: string;
          duration: string;
          plot: string;
          video: string;
        }[];
      };
    }[];
  };
}

const Details = ({navigation, route}) => {
  const user = useTypedSelector(selectUserData);
  const mediaDetails = useTypedSelector(selectMediaDetails);
  const loading = useTypedSelector(selectIsLoading);

  useEffect(() => {
    const init = async () => {
      await getMediaDetails(route?.params);
    };
    init();
  }, [route?.params]);
  const openYouTubeVideo = () => {
    const url = `https://www.youtube.com/watch?v=${mediaDetails?.info?.youtube_trailer}`;
    Linking.openURL(url);
  };
  const Play = async () => {
    await LocalStorage.addRecentlyWatchedMovie(route?.params);
    const url = `http://iboxx.us:8080/movie/${user?.username}/${user?.password}/${mediaDetails?.movie_data?.stream_id}.${mediaDetails?.movie_data?.container_extension}`;
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
              source={{uri: mediaDetails?.info?.movie_image}}
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
            <Text style={styles.showName}>{mediaDetails?.info?.name}</Text>
            <View style={styles.stats}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name={'star'} size={18} />
                <Text style={styles.match}>
                  {mediaDetails?.info?.rating}/IMDb
                </Text>
              </View>

              <Text style={styles.year}>
                {moment(mediaDetails?.info?.releasedate).format('YYYY')}
              </Text>
              {mediaDetails?.info?.age && (
                <Text style={styles.age}>{mediaDetails?.info?.age}</Text>
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
                {mediaDetails?.info?.genre?.split(',')?.map(e => (
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

            <Pressable style={styles.playButton} onPress={Play}>
              <Ionicon name="play-sharp" size={30} color="black" />
              <Text style={styles.playText}>Play</Text>
            </Pressable>
            <Pressable style={styles.downloadBtn} onPress={openYouTubeVideo}>
              <Icon name="youtube" size={30} color="white" />
              <Text style={styles.downloadText}>Watch Trailer</Text>
            </Pressable>
            <Text style={styles.description}>
              {mediaDetails?.info?.description}
            </Text>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.cast}>
              Cast: {mediaDetails?.info?.cast}
            </Text>
            <Text style={styles.creator}>
              Creator: {mediaDetails?.info?.director}
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
};

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
    marginHorizontal: 20,
    marginTop: 10,
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

export default Details;
