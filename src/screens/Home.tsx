import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { responsiveFontSize as rpf } from "react-native-responsive-dimensions";
import {
  FONTS,
  HEIGHT,
  LARGE_CARD_HEIGHT,
  PADDING,
  WIDTH,
} from "../constants/metrics";
import { RecipeCard } from "../components";
import { images } from "../assets";
import FilterList from "../components/FilterList";
import getRecipes from "../api/getRecipes";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { StackParamlist, TabParamList } from "../utils/type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface HeaderProps {
  showBadge: boolean;
  activeTab: string;
  toggleTab1: () => void;
  toggleTab2: () => void;
}

type Tabs = "recommended" | "following_chefs";

const Header = ({
  activeTab,
  showBadge,
  toggleTab1,
  toggleTab2,
}: HeaderProps) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity onPress={toggleTab1}>
        <Text
          style={[
            styles.tabLabel,
            activeTab == "recommended" && { color: COLORS.gray700 },
          ]}
        >
          Recipes for you
        </Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity onPress={toggleTab2}>
        <Text
          style={[
            styles.tabLabel,
            activeTab == "following_chefs" && { color: COLORS.gray700 },
          ]}
        >
          Following chefs
        </Text>
        {showBadge && <View style={styles.badge} />}
      </TouchableOpacity>
    </View>
  );
};

type HomeNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, "Home">,
  NativeStackNavigationProp<StackParamlist>
>;

const Home = () => {
  const [activeTab, setActiveTab] = useState<Tabs>("recommended");
  const [query, setQuery] = useState("all");
  const [recipeList, setRecicpeList] = useState<any>([]);
  const [showBadge, setShowBadge] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<HomeNavigationProp>();

  const handleCategoryChange = useCallback(async (category: string) => {
    setIsLoading(true);
    const recipes = await getRecipes({
      from: 0,
      to: 10,
      query: category,
      type: "public",
    });
    setRecicpeList(recipes);
    setIsLoading(false);
  }, []);

  //Getting recipes from edanam recipe API
  useEffect(() => {
    handleCategoryChange("all");
  }, [handleCategoryChange]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        {...{ activeTab, showBadge }}
        toggleTab1={() => setActiveTab("recommended")}
        toggleTab2={() => setActiveTab("following_chefs")}
      />
      <View style={{ marginBottom: PADDING }}>
        <FilterList {...{ handleCategoryChange }} />
      </View>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} color={COLORS.green400} />
        </View>
      ) : (
        <FlatList
          data={recipeList}
          keyExtractor={(_, id) => `recipe-${id}`}
          contentContainerStyle={{ gap: PADDING }}
          showsVerticalScrollIndicator={false}
          snapToInterval={LARGE_CARD_HEIGHT}
          decelerationRate={"fast"}
          scrollEventThrottle={16}
          renderItem={({ item: { recipe } }) => {
            return (
              <RecipeCard
                title={recipe.label}
                source={recipe.source}
                calories={Math.round(recipe.calories)}
                cookTime={recipe.totalTime}
                foodScale={Math.round(recipe.totalWeight)}
                recipeImg={recipe.image}
                onPress={() => navigation.navigate("RecipeDetail", { recipe })}
              />
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    paddingHorizontal: PADDING,
    backgroundColor: COLORS.background,
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: PADDING / 2,
    marginBottom: PADDING / 2,
  },
  separator: {
    height: 20,
    width: 1,
    backgroundColor: COLORS.gray200,
  },
  tabLabel: {
    fontSize: FONTS.m,
    fontWeight: "600",
    color: COLORS.gray200,
  },
  badge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.red500,
    position: "absolute",
    top: 0,
    right: -8,
  },
});
