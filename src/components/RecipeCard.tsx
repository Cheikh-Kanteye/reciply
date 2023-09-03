import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  FONTS,
  LARGE_CARD_HEIGHT,
  LARGE_CARD_WIDTH,
} from "../constants/metrics";
import COLORS from "../constants/colors";
import LikeBtn from "./LikeBtn";
import { ClockIcon, FireIcon, ScaleIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../assets";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface RecipeCardProps {
  title: string;
  cookTime: number;
  foodScale: number;
  calories: number;
  source: string;
  liked: number;
  recipeImg: ImageSourcePropType | string;
  onPress: () => void;
}

const CARD_RADIUS = LARGE_CARD_HEIGHT * 0.1;
const RecipeCard: React.FC<RecipeCardProps> = ({
  source,
  calories,
  cookTime,
  foodScale,
  liked,
  title,
  recipeImg,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <ImageBackground
        source={
          typeof recipeImg !== "string"
            ? images.defaultRecipe
            : { uri: recipeImg }
        }
        resizeMode="cover"
        style={styles.cardContainer}
      >
        <LinearGradient
          colors={["transparent", "rgba(0 ,0, 0, 0.5)"]}
          style={styles.backdrop}
        />
        <View style={styles.cardHeader}>
          <View style={styles.source_link}>
            <Text style={styles.source}>
              source: <Text style={{ color: COLORS.green400 }}>{source}</Text>
            </Text>
          </View>
          <LikeBtn rating={liked} color={COLORS.white} />
        </View>
        <View>
          <Text style={styles.recipeName}>{title}</Text>
          <View style={styles.cardFooter}>
            <View style={styles.cardFooterItem}>
              <ClockIcon size={20} color={COLORS.green400} />
              <Text style={styles.cardFooterItemLabel}>
                {cookTime == 0 ? 10 : cookTime}min
              </Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.cardFooterItem}>
              <ScaleIcon size={20} color={COLORS.green400} />
              <Text style={styles.cardFooterItemLabel}>{foodScale}g</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.cardFooterItem}>
              <FireIcon size={20} color={COLORS.green400} />
              <Text style={styles.cardFooterItemLabel}>{calories} Cal</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: LARGE_CARD_WIDTH,
    height: LARGE_CARD_HEIGHT,
    borderRadius: LARGE_CARD_HEIGHT * 0.1,
    backgroundColor: COLORS.background,
    justifyContent: "space-between",
    overflow: "hidden",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  cardHeader: {
    paddingHorizontal: CARD_RADIUS / 2,
    paddingVertical: CARD_RADIUS / 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  source_link: {
    flexDirection: "row",
    padding: 6,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderRadius: 20,
  },
  source: {
    fontSize: FONTS.s,
    textTransform: "capitalize",
  },
  profile: {
    width: CARD_RADIUS,
    height: CARD_RADIUS,
    borderRadius: CARD_RADIUS / 2,
    overflow: "hidden",
  },
  separator: {
    height: 20,
    width: 1,
    backgroundColor: COLORS.gray200,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: CARD_RADIUS / 2,
    height: CARD_RADIUS * 2,
    borderRadius: CARD_RADIUS,
    backgroundColor: COLORS.white,
    elevation: 4,
  },
  cardFooterItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  cardFooterItemLabel: {
    fontSize: FONTS.s,
    color: COLORS.gray500,
  },
  recipeName: {
    fontSize: FONTS.l,
    paddingHorizontal: CARD_RADIUS / 2,
    paddingBottom: CARD_RADIUS / 2,
    color: COLORS.white,
    textTransform: "capitalize",
  },
});
