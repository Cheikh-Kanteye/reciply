import {
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
  PADDING,
  WIDTH,
} from "../constants/metrics";
import COLORS from "../constants/colors";
import LikeBtn from "./LikeBtn";
import { ClockIcon, FireIcon, ScaleIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../assets";

interface RecipeCardProps {
  title: string;
  cookTime?: number | undefined;
  foodScale?: number | undefined;
  calories?: number | undefined;
  source?: string;
  size?: "large" | "small";
  recipeImg: ImageSourcePropType | string;
  onPress: () => void;
}

const CARD_RADIUS = LARGE_CARD_HEIGHT * 0.1;
const RecipeCard: React.FC<RecipeCardProps> = ({
  source,
  calories,
  cookTime,
  foodScale,
  title,
  recipeImg,
  size = "large",
  onPress,
}) => {
  const width = size == "large" ? LARGE_CARD_WIDTH : WIDTH / 2 - PADDING;
  const borderRadius = size == "large" ? 30 : 16;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <ImageBackground
        source={
          typeof recipeImg !== "string"
            ? images.defaultRecipe
            : { uri: recipeImg }
        }
        resizeMode="cover"
        style={[styles.cardContainer, { width, borderRadius }]}
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
          <LikeBtn color={COLORS.white} />
        </View>
        {size == "large" ? (
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
        ) : (
          <View style={styles.smallCardFooter}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: FONTS.m,
                fontFamily: "QuicksandSemibold",
                color: COLORS.gray600,
                paddingBottom: 6,
              }}
            >
              {title}
            </Text>
            <View style={styles.smallCardFooterRow}>
              <View style={styles.cardFooterItem}>
                <ClockIcon size={20} color={COLORS.green400} />
                <Text style={styles.cardFooterItemLabel}>
                  {cookTime == 0 ? 10 : cookTime}min
                </Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.cardFooterItem}>
                <FireIcon size={20} color={COLORS.green400} />
                <Text style={styles.cardFooterItemLabel}>{calories} Cal</Text>
              </View>
            </View>
          </View>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  cardContainer: {
    height: LARGE_CARD_HEIGHT,
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
    fontFamily: "SourceSansProRegular",
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
  smallCardFooter: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    elevation: 4,
  },
  smallCardFooterRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
    fontFamily: "SourceSansProSemibold",
  },
});
