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
import { ClockIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../assets";

interface RecipeCardProps {
  title: string;
  cookTime: number;
  calories: number;
  level: "easy" | "medium" | "hard";
  author: {
    image: ImageSourcePropType;
    name: string;
  };
  liked: number;
  recipeImg: ImageSourcePropType;
  onPress: () => void;
}

const CARD_RADIUS = LARGE_CARD_HEIGHT * 0.1;
const RecipeCard: React.FC<RecipeCardProps> = ({
  author,
  calories,
  cookTime,
  level,
  liked,
  title,
  recipeImg,
  onPress,
}) => {
  return (
    <TouchableOpacity>
      <ImageBackground
        source={recipeImg}
        resizeMode="cover"
        style={styles.cardContainer}
      >
        <LinearGradient
          colors={["transparent", "rgba(0 ,0, 0, 0.5)"]}
          style={styles.backdrop}
        />
        <View style={styles.cardHeader}>
          <View style={styles.user}>
            <View style={styles.profile}>
              <Image
                source={author.image}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.username}>{author.name}</Text>
          </View>
          <LikeBtn rating={liked} color={COLORS.white} />
        </View>
        <View>
          <Text style={styles.recipeName}>{title}</Text>
          <View style={styles.cardFooter}>
            <View style={styles.cardFooterItem}>
              <ClockIcon size={20} color={COLORS.green400} />
              <Text style={styles.cardFooterItemLabel}>{cookTime}min</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.cardFooterItem}>
              <ClockIcon size={20} color={COLORS.green400} />
              <Text style={styles.cardFooterItemLabel}>{level}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.cardFooterItem}>
              <ClockIcon size={20} color={COLORS.green400} />
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
  user: {
    flexDirection: "row",
    padding: 6,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderRadius: 20,
  },
  username: {
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
