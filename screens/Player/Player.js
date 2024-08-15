import {
  Button,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/Feather';

const Player = ({navigation, route}) => {
  Orientation.lockToLandscape();
  const [audio, setAudio] = useState([]);
  const [showAudio, setShowAudio] = useState(false);
  const [selectedTrack, setselectedTrack] = useState({});
  const [isBuffring, setIsBuffring] = useState(false);
  const [control, setControl] = useState(true);
  const videoRef = useRef();
  useEffect(() => {
    Orientation.lockToLandscape();

    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        onBuffer={data => {
          setIsBuffring(data?.isBuffering);
        }}
        renderLoader={
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#000000',
            }}>
            <Text style={{fontSize: 20, color: '#fff'}}>Loading...</Text>
          </View>
        }
        selectedAudioTrack={{type: 'index', value: selectedTrack?.index || 0}}
        onControlsVisibilityChange={e => {
          setControl(e.isVisible);
          if (!e.isVisible) {
            setShowAudio(false);
          }
          return {};
        }}
        onPress={() => setShowAudio(false)}
        onLoad={data => {
          console.log('🚀 ~ Player ~ data:', data);
          setselectedTrack(data?.audioTracks[0]);
          setAudio(data?.audioTracks);
          return {};
        }}
        source={{uri: route.params.url}} // Replace with your video URL
        controls={true}
        resizeMode="cover"
        fullscreen
        style={{flex: 1}}
      />
      {isBuffring && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 20, color: '#fff'}}>Loading...</Text>
        </View>
      )}
      {control && (
        <>
          <TouchableOpacity
            onPress={() => setShowAudio(!showAudio)}
            style={{
              position: 'absolute',
              right: 20,
              top: 20,
              borderRadius: 60,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name={'radio'} size={20} />
          </TouchableOpacity>
          {showAudio && (
            <View
              style={{
                position: 'absolute',
                right: 40,
                top: 70,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {audio?.map(e => (
                <TouchableOpacity
                  key={e.language}
                  onPress={() => setselectedTrack(e)}
                  style={{
                    backgroundColor: '#000',
                    minWidth: 80,
                    padding: 10,
                    borderWidth: 1,
                    borderColor:
                      e.language === selectedTrack?.language ? 'red' : '#000',
                  }}>
                  <Text style={{color: '#fff'}}>
                    {e?.language} {e?.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default Player;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  fullscreenVideo: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
