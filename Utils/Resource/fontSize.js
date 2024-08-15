import {getWp} from './viewUtils';

const computeFontSize = (maxFont = 60) => {
  let key = 'Text';
  let obj = {};
  for (let i = 1; i <= maxFont; i++) {
    obj = {...obj, [`${key}${i}`]: getWp(i)};
  }
  return obj;
};
export const FONTSIZE = {
  ...computeFontSize(),
};

export const FONTFAMILY = {
  PoppinsBlack: 'Poppins-Black',
  PoppinsBold: 'Poppins-Bold',
  PoppinsExtraBold: 'Poppins-ExtraBold',
  PoppinsExtraLight: 'Poppins-ExtraLight',
  PoppinsLight: 'Poppins-Light',
  PoppinsMedium: 'Poppins-Medium',
  PoppinsRegular: 'Poppins-Regular',
  PoppinsSemiBold: 'Poppins-SemiBold',
  PoppinsThin: 'Poppins-Thin',
};
