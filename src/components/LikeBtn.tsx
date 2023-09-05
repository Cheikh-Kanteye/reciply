import { ColorValue, StyleSheet, Text, TouchableOpacity } from "react-native";
import { HeartIcon as HeartIconSolid } from "react-native-heroicons/solid";
import { useState, useCallback, useEffect } from "react";
import COLORS from "../constants/colors";

const LikeBtn = ({ color }: { color: ColorValue }) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggle = useCallback(() => {
    setIsLiked((v) => !v);
  }, []);

  return (
    <TouchableOpacity
      style={{ justifyContent: "center", alignItems: "center" }}
      onPress={toggle}
    >
      <HeartIconSolid size={26} color={isLiked ? COLORS.red500 : color} />
    </TouchableOpacity>
  );
};

export default LikeBtn;

const styles = StyleSheet.create({});
