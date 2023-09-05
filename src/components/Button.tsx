import {
  ColorValue,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { FONTS, PADDING } from "../constants/metrics";
import COLORS from "../constants/colors";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

interface CommonButtonProps extends TouchableOpacityProps {
  icon?: ImageSourcePropType;
}

interface ButtonProps extends CommonButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size: "l" | "s";
  darken?: boolean;
  label: string;
}

const largeBtnH = responsiveHeight(6);
const SmallBtnH = responsiveHeight(4.5);

const SmallButton: React.FC<CommonButtonProps> = (props) => {
  return (
    <TouchableOpacity
      {...props}
      style={[{ maxWidth: responsiveWidth(50) }, props.style]}
    >
      {props.children}
    </TouchableOpacity>
  );
};
const LargeButton: React.FC<CommonButtonProps> = (props) => {
  return (
    <TouchableOpacity style={[props.style]} {...props}>
      {props.children}
    </TouchableOpacity>
  );
};

const Button: React.FC<ButtonProps> = (props) => {
  const primaryColor = props.darken ? COLORS.green800 : COLORS.green600;
  const outlineColor = props.darken ? COLORS.green50 : COLORS.white;
  const outlineTextColor = props.darken ? COLORS.green800 : COLORS.green600;
  const borderWidth = props.variant == "outline" ? 1 : 0;
  const baseColor =
    props.variant == "primary"
      ? primaryColor
      : props.variant == "outline"
      ? outlineColor
      : COLORS.white;
  const color = props.disabled ? COLORS.gray200 : baseColor;
  const labelBaseColor =
    props.variant == "primary"
      ? COLORS.white
      : props.variant == "outline"
      ? outlineTextColor
      : COLORS.gray600;
  const labelColor = props.disabled ? COLORS.gray100 : labelBaseColor;

  const style: ViewStyle = {
    backgroundColor: color,
    borderWidth,
    borderColor: outlineTextColor,
  };
  const labelStyle: TextStyle = {
    fontSize: FONTS.m,
    fontFamily: "SourceSansProSemibold",
    color: labelColor,
    textTransform: "uppercase",
  };

  return props.size == "l" ? (
    <LargeButton
      {...props}
      style={[
        style,
        styles.common,
        { height: largeBtnH, borderRadius: largeBtnH / 2 },
        props.style,
      ]}
    >
      <Text style={labelStyle}>{props.label}</Text>
    </LargeButton>
  ) : (
    <SmallButton
      {...props}
      style={[
        style,
        styles.common,
        { height: SmallBtnH, borderRadius: SmallBtnH / 2 },
        props.style,
      ]}
    >
      <Text style={labelStyle}>{props.label}</Text>
      {props.icon && (
        <Image
          source={props.icon}
          style={{
            width: FONTS.m * 1.2,
            height: FONTS.m * 1.2,
            tintColor: labelColor,
          }}
          resizeMode="contain"
        />
      )}
    </SmallButton>
  );
};

Button.defaultProps = {
  variant: "primary",
  darken: false,
};

export default Button;

const styles = StyleSheet.create({
  common: {
    paddingHorizontal: PADDING * 1.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    gap: PADDING / 3,
  },
});
