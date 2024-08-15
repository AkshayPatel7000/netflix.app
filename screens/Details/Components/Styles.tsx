import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  episodeContiner: {
    width: '100%',
    paddingHorizontal: 20,
  },
  EpisodeDetails: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    width: '100%',
  },
  left: {
    width: '40%',
    // position: 'relative',
  },

  image: {
    width: '100%',
    height: '100%',
    aspectRatio: 16 / 9,
    // resizeMode: 'cover',
    borderRadius: 10,
    // marginRight: 10,
  },
  episodeDetails: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '90%',
  },
  episodeName: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
  duration: {
    color: 'lightgrey',
    fontSize: 12,
    marginLeft: 5,
  },
  right: {
    marginRight: 5,
    width: '66%',
  },
  playBtn: {
    // position: 'absolute',
    borderColor: 'white',
    width: 40,
    height: 40,
    padding: 8,
    paddingLeft: 12,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 60,
    color: 'white',
    borderWidth: 2,
  },
  desciption: {
    width: '100%',
    alignSelf: 'flex-start',
    marginTop: 10,
    // paddingHorizontal: 10,
  },
  desciptionText: {
    color: 'lightgrey',
    fontSize: 14,
    width: '95%',
  },
  ibStyles: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
