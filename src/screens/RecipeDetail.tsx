import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StackParamlist } from "../utils/type";
import { RouteProp, useRoute } from "@react-navigation/native";
import { LikeBtn } from "../components";
import { FONTS, HEIGHT, PADDING, WIDTH } from "../constants/metrics";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  interpolateColor,
} from "react-native-reanimated";
import { images } from "../assets";

type RecipeDetailRouteProp = RouteProp<StackParamlist, "RecipeDetail">;

const HEADER_IMAGE_HEIGHT = responsiveHeight(45);

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

const RecipeDetail = () => {
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(({ contentOffset: { y } }) => {
    scrollY.value = y;
  });
  const {
    params: { recipe },
  } = useRoute<RecipeDetailRouteProp>();

  const headerImgStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [-100, 0],
        [HEADER_IMAGE_HEIGHT + 100 + PADDING, HEADER_IMAGE_HEIGHT],
        {
          extrapolateRight: Extrapolate.CLAMP,
        }
      ),
      top: interpolate(scrollY.value, [0, 100], [0, -100 - PADDING], {
        extrapolateLeft: Extrapolate.CLAMP,
      }),
    };
  });

  const navbarStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollY.value,
        [0, 100],
        ["transparent", COLORS.background]
      ),
    };
  });
  const iconStyle = useAnimatedStyle(() => ({
    tintColor: interpolateColor(
      scrollY.value,
      [0, 100],
      [COLORS.white, COLORS.gray600]
    ),
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.headerImg, headerImgStyle]}>
        <Image
          source={{ uri: recipe.image }}
          style={{ width: "100%", height: "100%" }}
          resizeMode={"cover"}
        />
      </Animated.View>
      <Animated.View style={[styles.navbar, navbarStyle]}>
        <TouchableOpacity>
          <Animated.Image
            source={images.arrowLeft}
            style={[{ width: 20, height: 20 }, iconStyle]}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Animated.Image
            source={images.share}
            style={[{ width: 22, height: 22 }, iconStyle]}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.ScrollView
        style={StyleSheet.absoluteFill}
        contentContainerStyle={{ paddingTop: HEADER_IMAGE_HEIGHT - PADDING }}
        onScroll={onScroll}
      >
        <View style={styles.contentContainer}>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>{recipe.label}</Text>
            <LikeBtn rating={2300} color={COLORS.red500} />
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default RecipeDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    minHeight: HEIGHT,
    backgroundColor: COLORS.background,
    padding: PADDING,
    paddingTop: PADDING * 1.5,
    borderTopLeftRadius: PADDING,
    borderTopRightRadius: PADDING,
  },
  label: {
    fontSize: FONTS.l,
    flex: 0.9,
    fontWeight: "600",
    color: COLORS.gray700,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navbar: {
    position: "absolute",
    width: WIDTH,
    height: 80,
    paddingBottom: PADDING / 2,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: PADDING,
    zIndex: 10,
  },
  headerImg: {
    width: WIDTH,
    height: HEADER_IMAGE_HEIGHT,
    zIndex: -1,
    position: "absolute",
    top: 0,
    left: 0,
  },
});
