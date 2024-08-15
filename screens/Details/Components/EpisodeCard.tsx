import React from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import Fontawesome from 'react-native-vector-icons/FontAwesome5/';
import styles from './Styles';

const EpisodeCard = ({title, poster, duration, plot, onEpisodePress}) => {
  return (
    <View style={styles.episodeContiner}>
      <TouchableOpacity style={styles.EpisodeDetails} onPress={onEpisodePress}>
        <View style={styles.left}>
          <ImageBackground
            style={styles.ibStyles}
            source={{uri: poster}}
            imageStyle={styles.image}>
            <View style={styles.playBtn}>
              <Fontawesome name="play" size={18} color="white" />
            </View>
          </ImageBackground>
        </View>

        <View style={styles.right}>
          <View style={styles.episodeDetails}>
            <Text style={styles.episodeName} numberOfLines={3}>
              {title}
            </Text>
            <Text style={styles.duration}>{duration}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.desciption}>
        <Text
          style={styles.desciptionText}
          ellipsizeMode="tail"
          numberOfLines={3}>
          {plot}
        </Text>
      </View>
    </View>
  );
};

export default EpisodeCard;
