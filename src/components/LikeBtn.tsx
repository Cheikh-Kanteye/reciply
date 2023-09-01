import { ColorValue, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FONTS } from "../constants/metrics";
import { HeartIcon as HeartIconSolid } from "react-native-heroicons/solid";
import { useState, useReducer, useCallback, useEffect } from "react";
import COLORS from "../constants/colors";

const LikeBtn = ({
  rating = 0,
  color,
}: {
  rating: number;
  color: ColorValue;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const toggle = useCallback(() => {
    setIsLiked((v) => !v);
  }, []);

  //format rating number to make it simplify, exemple: 23400 become 2.34k
  const formatedRating = (rate: number) => {
    if (rating < 1000) {
      return rating.toString();
    } else if (rating < 100000) {
      return (rating / 1000).toFixed(2) + "K";
    } else {
      return (rating / 100000).toFixed(2) + "M";
    }
  };

  // Increment or decrement the number of likes
  useEffect(() => {
    if (isLiked) rating = rating + 1;
    else rating = rating;
  }, [isLiked]);

  return (
    <TouchableOpacity
      style={{ justifyContent: "center", alignItems: "center" }}
      onPress={toggle}
    >
      <HeartIconSolid size={24} color={isLiked ? COLORS.red500 : color} />
      <Text style={{ fontSize: FONTS.s, color }}>{formatedRating(rating)}</Text>
    </TouchableOpacity>
  );
};

export default LikeBtn;

const styles = StyleSheet.create({});
