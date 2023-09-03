import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ArrowLeftIcon, ShareIcon } from "react-native-heroicons/solid";
import COLORS from "../constants/colors";
import { PADDING, WIDTH } from "../constants/metrics";

const NavigationBar = () => {
  return (
    <View style={styles.container}>
      <ArrowLeftIcon size={20} color={COLORS.white} />
      <ShareIcon size={20} color={COLORS.white} />
    </View>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: PADDING,
    width: WIDTH,
  },
});
