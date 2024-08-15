//https://docs.adobe.com/content/help/en/target/using/experiences/vec/mobile-viewports.html
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const VIEWPORT = {
  IPHONE: {
    iPhoneXr: {
      width: width,
      height: height,
      //828W*1792H
      // width: 414,
      // height: 896,
    },
    iPhoneXS: {
      width: 375,
      height: 812,
    },
  },
  ANDROID: {
    Pixel3: {
      width: 392.8,
      height: 759.3,
    },
  },
};

const DEFAULT_VIEWPORT = VIEWPORT.IPHONE.iPhoneXr;
export default DEFAULT_VIEWPORT;
