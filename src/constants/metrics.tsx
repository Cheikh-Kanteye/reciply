import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export const WIDTH = responsiveWidth(100);
export const HEIGHT = responsiveHeight(100);
export const PADDING = responsiveFontSize(2.5);
export const LARGE_CARD_WIDTH = WIDTH - PADDING * 2;
export const LARGE_CARD_HEIGHT = responsiveHeight(30);
export const FONTS = {
  xxl: responsiveFontSize(5),
  xl: responsiveFontSize(4),
  l: responsiveFontSize(3),
  m: responsiveFontSize(2),
  s: responsiveFontSize(1.5),
  thin: responsiveFontSize(1),
};
