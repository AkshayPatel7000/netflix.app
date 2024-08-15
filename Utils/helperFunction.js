import {showMessage} from 'react-native-flash-message';
import {request} from 'react-native-permissions';
import {Linking, Platform} from 'react-native';

// import {NoProfile} from '../assets';

const showError = (message, duration = 1000) => {
  showMessage({
    message,
    type: 'danger',
    icon: 'danger',
    duration,
  });
};

const showSuccess = message => {
  showMessage({
    message,
    type: 'success',
    icon: 'success',
  });
};

const isEmptyImage = image => {
  var imageUrl = image?.includes('http')
    ? image
    : image?.includes('file:')
    ? image
    : `https://societybackend.indoresa.com/${image}`;
  if (image === '' || image === undefined || image === null) {
    return '';
  } else {
    return {uri: imageUrl};
  }
};
const getColor = index => {
  switch (index) {
    case 0:
      return {backgroundColor: '#38CCAA'};
    case 1:
      return {backgroundColor: '#38A0CC'};
    case 2:
      return {backgroundColor: '#ECCF36'};
    default:
      return {backgroundColor: '#38CCAA'};
  }
};

const addColorToDataArray = (dataArray = [], colorArray = []) => {
  let count = -1;
  let tempData = dataArray.map(ele => {
    if (colorArray.length - 1 <= count) {
      count = 0;
    } else {
      count++;
    }
    return {...ele, ...colorArray[count]};
  });
  return tempData;
};

const searchByFields = (arr, input, keyArr) => {
  const results = arr?.filter(function (p) {
    if (input?.length == 0) {
      return false;
    }
    if (keyArr?.length > 0) {
      var data = keyArr.map(ele => p[ele]).join(' ');
      return data.match(new RegExp(input, 'i'));
    }
    return Object.values(p).join(' ').match(new RegExp(input, 'i'));
  });
  return results;
};

const urlencodedFormData = body => {
  var formBody = [];
  for (var property in body) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  return formBody;
};

const removeNullValue = body => {
  var formBody = {};
  for (var property in body) {
    if (
      body[property] &&
      body[property] !== null &&
      body[property] !== 'null'
    ) {
      formBody[property] = body[property];
    }
  }

  return formBody;
};
const request_PERMISSIONS = async permission => {
  try {
    request(permission).then(result => {
      console.log('🚀 ~ file: helperFunction.js:8 ~ request ~ result:', result);
    });
  } catch (err) {
    console.warn(err);
  }
};
const handlePriority = (data, id) => {
  const priority = data?.find(e => e?.typeId == id);
  return priority?.typeName;
};
const dialCall = number => {
  let phoneNumber = '';
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${number}`;
  } else {
    phoneNumber = `telprompt:${number}`;
  }
  Linking.openURL(phoneNumber);
};

export {
  addColorToDataArray,
  getColor,
  isEmptyImage,
  request_PERMISSIONS,
  searchByFields,
  showError,
  showSuccess,
  urlencodedFormData,
  handlePriority,
  dialCall,
  removeNullValue,
};
