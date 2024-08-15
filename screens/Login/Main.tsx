import React, {useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {showError} from '../../Utils/helperFunction';
import axios from 'axios';
import Endpoints from '../../Services/Client/Endpoints';
import {LocalStorage} from '../../Utils/Resource';
import {useAppDispatch} from '../../Store/MainStore';
import {setUserProfile} from '../../Store/Slices/AuthSlice';
const Main = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    activationCode: '',
    loading: false,
  });

  const handleSubmit = async () => {
    try {
      if (formData?.activationCode === '') {
        return showError('Activation Code Required!');
      }
      setFormData({...formData, loading: true});

      const {data} = await axios.get(
        Endpoints.LOGIN + formData?.activationCode,
      );
      if (data.status === 'success') {
        setFormData({...formData, loading: false});
        LocalStorage.storeUser(data?.data);
        LocalStorage.storeAsyncData(
          'serverUrl',
          data.data.servers.length > 0 ? data.data.servers[0] : '',
        );
        dispatch(setUserProfile(data?.data));
        return;
      }
      setFormData({...formData, loading: false});

      showError('Try again later!');
      console.log('🚀 ~ handleSubmit ~ apiResponse:', data);
    } catch (error) {
      setFormData({...formData, loading: false});

      console.log('🚀 ~ handleSubmit ~ error:', error);
    }
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source={require('../../assets/FullLogo.png')}
        />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.formFeild}>
          <TextInput
            style={styles.formInput}
            placeholder="Email ActivationCode"
            placeholderTextColor="grey"
            onChangeText={text => {
              setFormData({...formData, activationCode: text});
            }}
            keyboardType="number-pad"
          />
        </View>

        <Pressable
          style={styles.formButton}
          onPress={handleSubmit}
          disabled={formData?.loading}>
          <Text style={styles.formButtonText}>
            {formData?.loading ? 'Loading...' : 'Activate'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: 120,
    height: 50,
    resizeMode: 'contain',
  },
  headerText: {
    color: 'white',
    fontSize: 16,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formFeild: {
    width: '100%',
    height: 50,
    backgroundColor: '#333333',
    borderRadius: 5,
    marginBottom: 10,
    marginVertical: 10,
  },
  formInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: 'grey',
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
  recoverBtn: {
    marginVertical: 30,
    fontWeight: 'bold',
  },
  guideText: {
    color: 'grey',
    fontSize: 18,
    textAlign: 'center',
  },
});
