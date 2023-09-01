import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { responsiveFontSize as rpf } from "react-native-responsive-dimensions";
import { FONTS, HEIGHT, PADDING, WIDTH } from "../constants/metrics";
import { RecipeCard } from "../components";
import { images } from "../assets";

const Home = () => {
  const [activeTab, setActiveTab] = useState<"recommended" | "following_chefs">(
    "recommended"
  );
  const [showBadge, setShowBadge] = useState(true);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab("recommended")}>
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
        <TouchableOpacity onPress={() => setActiveTab("following_chefs")}>
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
      <RecipeCard
        title="Almond & Orange Blossom French Crepes"
        author={{ image: images.defaultUser, name: "Maxime Lopez" }}
        calories={320}
        cookTime={30}
        level="easy"
        liked={2340}
        recipeImg={images.defaultRecipe}
        onPress={() => null}
      />
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
