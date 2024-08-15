import {StyleSheet} from 'react-native';
import {FONTFAMILY} from '../../Utils/Resource';

const GlobalStyles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  centerElement: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowCenterElement: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWH: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 6,
  },
  BorderOneRed: {
    borderWidth: 1,
    borderColor: 'red',
  },
  Container: {
    flex: 1,
  },
  shadow: {
    shadowColor: '#0000000F',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6.68,

    elevation: 11,
  },

  greenButtonShadow: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.47,
    shadowRadius: 15.65,
    elevation: 12,
    backgroundColor: 'white',
  },

  W100: {
    fontWeight: '100',
    fontFamily: FONTFAMILY.PoppinsThin,
  },
  W200: {
    fontWeight: '200',
    fontFamily: FONTFAMILY.PoppinsExtraLight,
  },
  W300: {
    fontWeight: '300',
    fontFamily: FONTFAMILY.PoppinsLight,
  },
  W400: {
    fontWeight: '400',
    fontFamily: FONTFAMILY.PoppinsRegular,
  },
  W500: {
    fontWeight: '500',
    fontFamily: FONTFAMILY.PoppinsMedium,
  },
  W600: {
    fontWeight: '600',
    fontFamily: FONTFAMILY.PoppinsSemiBold,
  },
  W700: {
    fontWeight: '700',
    fontFamily: FONTFAMILY.PoppinsBold,
  },
  W800: {
    fontWeight: '800',
    fontFamily: FONTFAMILY.PoppinsExtraBold,
  },
  WD900: {
    fontWeight: '200',
    fontFamily: FONTFAMILY.PoppinsBlack,
  },
});

export default GlobalStyles;
