import {
  ColorValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { FONTS, PADDING } from "../constants/metrics";
import COLORS from "../constants/colors";

interface FilterBtnProps {
  activeTab: string;
  label: string;
  onPress: () => void;
}

const FilterBtn = ({ label, activeTab, onPress }: FilterBtnProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.btn,
        {
          backgroundColor: activeTab == label ? COLORS.green400 : "transparent",
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.label,
          { color: activeTab == label ? COLORS.white : COLORS.green400 },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default FilterBtn;

const styles = StyleSheet.create({
  btn: {
    padding: PADDING / 2,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: PADDING,
    borderWidth: 1,
    borderColor: COLORS.green400,
  },
  label: {
    fontSize: FONTS.s,
    textTransform: "capitalize",
  },
});
