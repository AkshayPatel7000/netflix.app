import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useAppDispatch} from '../../Store/MainStore';
import {logoutUser, setUserProfile} from '../../Store/Slices/AuthSlice';
import {LocalStorage} from '../../Utils/Resource';

const Profile = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(setUserProfile({}));
    dispatch(logoutUser(''));
    LocalStorage.clearLocalStorage();
  };
  return (
    <View style={styles.main}>
      <ScrollView
        style={styles.pageContainer}
        showsVerticalScrollIndicator={false}
      />
      <Pressable style={styles.formButton} onPress={handleLogout}>
        <Text style={styles.formButtonText}>{'Log Out'}</Text>
      </Pressable>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingBottom: 100,
    backgroundColor: 'black',
    paddingHorizontal: 20,
  },
  pageContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  formButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#e50914',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  formButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
