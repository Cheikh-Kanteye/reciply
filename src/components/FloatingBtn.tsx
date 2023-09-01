import React from "react";
import { StyleSheet, TouchableOpacity, View, Image, Alert } from "react-native";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import {
  responsiveFontSize as rnf,
  responsiveWidth as rpw,
} from "react-native-responsive-dimensions";
import Svg, { Path } from "react-native-svg";
import { images } from "../assets";
import COLORS from "../constants/colors";

type Props = BottomTabBarButtonProps & {
  bgColor?: string;
};

const FloatingBtn: React.FC<Props> = ({ bgColor, ...props }) => {
  return (
    <View style={styles.container} pointerEvents="box-none">
      <Svg
        style={styles.background}
        width={75}
        height={61}
        viewBox={`0 0 75 61`}
      >
        <Path
          d={`M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z`}
          fill={bgColor}
        />
      </Svg>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert("Create Recipes")}
      >
        <Image
          source={images.chef}
          resizeMode="contain"
          style={{ width: rnf(3), height: rnf(3), tintColor: COLORS.white }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingBtn;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 75,
    alignItems: "center",
  },
  background: {
    position: "absolute",
    top: 0,
  },
  button: {
    top: -22.5,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 27,
    backgroundColor: "#4fa964",
    elevation: 6,
  },
  buttonIcon: {
    fontSize: 16,
    color: "#F6F7EB",
  },
});
