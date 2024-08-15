import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const width = Dimensions.get('screen').width * 0.8;
const FAB = ({onChange, onSubmitEditing}) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const inputRef = useRef(null);

  // Animation values
  const fabWidth = useRef(new Animated.Value(50)).current; // Initial width of the FAB
  const searchWidth = useRef(new Animated.Value(0)).current; // Initial width of the search bar
  const searchOpacity = useRef(new Animated.Value(0)).current; // Initial opacity of the search bar
  const translateY = useRef(new Animated.Value(0)).current;
  const _keyboardDidShow = () => {
    Animated.timing(translateY, {
      toValue: 70, // Hide tab bar
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const _keyboardDidHide = () => {
    Animated.timing(translateY, {
      toValue: 0, // Show tab bar
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    const Subs = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Subs.remove();
    };
  }, []);

  // Function to handle the press action
  const handlePress = () => {
    if (isSearchActive) {
      Keyboard.dismiss();
      inputRef.current.clear();
      onSubmitEditing({nativeEvent: {text: ''}});
    } else {
      openKeyboard();
    }
    setIsSearchActive(!isSearchActive);

    Animated.parallel([
      Animated.timing(fabWidth, {
        toValue: isSearchActive ? 50 : 300, // Toggle between FAB and expanded state
        duration: 500,
        useNativeDriver: false, // Use native driver for better performance
      }),
      Animated.timing(searchWidth, {
        toValue: isSearchActive ? 0 : width, // Toggle width of search bar
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(searchOpacity, {
        toValue: isSearchActive ? 0 : 1, // Toggle opacity of search bar
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  };
  const openKeyboard = () => {
    // Focus the TextInput which will open the keyboard
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <Animated.View style={[styles.container, {transform: [{translateY}]}]}>
      <Animated.View
        style={[
          styles.searchContainer,
          {width: searchWidth, opacity: searchOpacity},
        ]}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          ref={inputRef}
          onChange={onChange}
          onSubmitEditing={onSubmitEditing}
          returnKeyType="search"
          enablesReturnKeyAutomatically
        />
      </Animated.View>

      <Animated.View style={[styles.fab]}>
        <TouchableOpacity style={styles.fabButton} onPress={handlePress}>
          <Icon
            name={isSearchActive ? 'close' : 'search'}
            size={16}
            color={'#fff'}
          />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80,
    right: 40,
    flexDirection: 'row',

    alignItems: 'center',
  },

  searchContainer: {
    // position: 'absolute',
    // bottom: 50,
    backgroundColor: 'black',
    borderRadius: 25,
    overflow: 'hidden',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchInput: {
    height: '100%',
    paddingHorizontal: 20,
    color: '#fff',
  },
  fab: {
    position: 'absolute',
    // bottom: 30,
    right: 1,
    height: 48,

    width: 48,
    backgroundColor: '#E50914',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  fabText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FAB;
