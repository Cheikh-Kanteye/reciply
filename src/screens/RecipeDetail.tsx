import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  interpolateColor,
} from "react-native-reanimated";

import { FONTS, HEIGHT, PADDING, WIDTH } from "../constants/metrics";
import { StackParamlist } from "../utils/type";
import COLORS from "../constants/colors";
import { Button, LikeBtn } from "../components";
import { images } from "../assets";
import { ClockIcon, FireIcon, ScaleIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RecipeDetailRouteProp = RouteProp<StackParamlist, "RecipeDetail">;
type RecipeDetailNavigationProp = NativeStackNavigationProp<
  StackParamlist,
  "RecipeDetail"
>;

const HEADER_IMAGE_HEIGHT = responsiveHeight(55);

const RecipeDetail = () => {
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(({ contentOffset: { y } }) => {
    scrollY.value = y;
  });
  const navigation = useNavigation<RecipeDetailNavigationProp>();
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
        <LinearGradient
          colors={["rgba(0, 0, 0, .6)", "transparent"]}
          style={StyleSheet.absoluteFillObject}
        />
      </Animated.View>
      <Animated.View style={[styles.navbar, navbarStyle]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
      <View style={{ flex: 1, marginTop: 80 }}>
        <Animated.ScrollView
          style={StyleSheet.absoluteFill}
          contentContainerStyle={{
            paddingTop: HEADER_IMAGE_HEIGHT - 80 - PADDING,
          }}
          onScroll={onScroll}
        >
          <View style={styles.contentContainer}>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>{recipe.label}</Text>
              <LikeBtn color={COLORS.gray200} />
            </View>
            <View style={styles.infoRecipe}>
              <View style={styles.info}>
                <ClockIcon size={20} color={COLORS.green600} />
                <Text style={styles.infoLabel}>
                  {recipe.totalTime <= 0 ? "<1" : recipe.totalTime} min
                </Text>
              </View>
              <View style={styles.info}>
                <ScaleIcon size={20} color={COLORS.green600} />
                <Text style={styles.infoLabel}>
                  {Math.round(recipe.totalWeight)}g
                </Text>
              </View>
              <View style={styles.info}>
                <FireIcon size={20} color={COLORS.green600} />
                <Text style={styles.infoLabel}>
                  {Math.round(recipe.calories)} Cal
                </Text>
              </View>
            </View>
            <View style={[styles.infoRecipe, { justifyContent: "center" }]}>
              <View style={styles.circle}>
                <Text style={styles.circleWeight}>25 g</Text>
                <Text style={styles.circleLabel}>Proteins</Text>
              </View>
              <View style={styles.circle}>
                <Text style={styles.circleWeight}>25 g</Text>
                <Text style={styles.circleLabel}>Carbs</Text>
              </View>
              <View style={styles.circle}>
                <Text style={styles.circleWeight}>25 g</Text>
                <Text style={styles.circleLabel}>Fats</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (recipe.url) {
                  Linking.openURL(recipe.url);
                } else {
                  console.log("Something wrong with external link!");
                }
              }}
              style={{ paddingTop: PADDING }}
            >
              <Text style={styles.source}>
                Source:{" "}
                <Text
                  style={{
                    color: COLORS.green400,
                    textDecorationLine: "underline",
                  }}
                >
                  {recipe.source}
                </Text>
              </Text>
            </TouchableOpacity>
            <View style={{ paddingTop: PADDING }}>
              <Text style={[styles.textLarge, { textAlign: "center" }]}>
                INGREDIENTS
              </Text>
              <View style={{ paddingTop: PADDING / 2 }}>
                {recipe.ingredientLines.map(
                  (ingredient: string, index: number) => {
                    return (
                      <View style={styles.ingredientContainer} key={index}>
                        <View style={styles.greenDot} />
                        <Text style={styles.ingredient}>{ingredient}</Text>
                      </View>
                    );
                  }
                )}
              </View>
            </View>
            <Button
              style={{ alignSelf: "center", marginVertical: PADDING }}
              size="s"
              label="let's cook"
              icon={images.whisk}
              variant="primary"
            />
          </View>
        </Animated.ScrollView>
      </View>
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
  infoRecipe: {
    flexDirection: "row",
    gap: PADDING,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: PADDING,
  },
  info: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: PADDING,
    backgroundColor: COLORS.gray200,
  },
  infoLabel: {
    fontSize: FONTS.s,
    fontFamily: "SourceSansProSemibold",
  },
  circle: {
    width: 75,
    height: 75,
    borderRadius: 38,
    borderWidth: 2,
    borderColor: COLORS.green400,
    justifyContent: "center",
    alignItems: "center",
  },
  circleLabel: {
    fontSize: FONTS.m,
    color: COLORS.gray400,
    fontFamily: "SourceSansProRegular",
  },
  circleWeight: {
    fontSize: FONTS.m * 1.2,
    color: COLORS.gray900,
    fontFamily: "SourceSansProSemibold",
  },
  source: {
    fontSize: FONTS.l,
    color: COLORS.gray400,
    fontFamily: "SourceSansProRegular",
  },
  textLarge: {
    fontSize: FONTS.l,
    color: COLORS.gray700,
    fontFamily: "SourceSansProSemibold",
  },
  ingredientContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-start",
    // alignItems: "center",
    borderBottomColor: COLORS.gray200,
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: PADDING / 3,
    marginBottom: PADDING / 2,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.green400,
    marginTop: 6,
  },
  ingredient: {
    fontSize: FONTS.m,
    fontFamily: "SourceSansProSemibold",
    color: COLORS.gray500,
  },
});
