import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "react-native-heroicons/solid";
import {
  FONTS,
  LARGE_CARD_HEIGHT,
  LARGE_CARD_WIDTH,
  PADDING,
} from "../constants/metrics";
import COLORS from "../constants/colors";
import { images } from "../assets";
import { LinearGradient } from "expo-linear-gradient";
import { RecipeCard } from "../components";

const SearchBar: React.FC<TextInputProps> = (props) => {
  const [blured, setBlured] = useState(true);
  const color = blured ? COLORS.gray300 : COLORS.gray500;
  return (
    <View style={styles.searchBar}>
      <View style={{ padding: PADDING / 2 }}>
        <MagnifyingGlassIcon size={20} color={color} />
      </View>
      <TextInput
        onFocus={() => setBlured(false)}
        onBlur={() => setBlured(true)}
        style={styles.input}
        placeholder="Search any recipe or chef"
        inputMode="search"
        autoCapitalize="none"
        {...props}
      />
      <TouchableOpacity style={{ padding: PADDING / 2 }}>
        <AdjustmentsHorizontalIcon size={20} color={color} />
      </TouchableOpacity>
    </View>
  );
};

const Search = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar />
      <TouchableOpacity style={styles.popularRecipe}>
        <Image
          source={images.defaultRecipe}
          style={styles.popularRecipeImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(0, 0, 0, .55)"]}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.popularRecipeLabelContainer}>
          <Text style={styles.popularRecipeLabel}>Popular today</Text>
        </View>
        <View style={{ paddingHorizontal: PADDING }}>
          <Text style={styles.popularRecipeName}>Kid-friendly recipes</Text>
          <Text style={styles.quantity}>230 recipes</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>The chefs you might like</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>#firdayparty</Text>
        <TouchableOpacity style={{ paddingVertical: PADDING / 2 }}>
          <Text style={styles.recipeCount}>3.7k recipes</Text>
        </TouchableOpacity>
      </View>
      <View>
        <RecipeCard
          title="Mozzarello & Basil soup"
          onPress={() => {}}
          recipeImg={images.defaultRecipe}
          size="small"
          cookTime={30}
          calories={415}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>The chefs you might like</Text>
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: PADDING,
  },
  searchBar: {
    borderRadius: 18,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: COLORS.gray500,
    fontFamily: "QuicksandSemibold",
    fontSize: FONTS.m,
  },
  popularRecipe: {
    width: LARGE_CARD_WIDTH,
    height: LARGE_CARD_HEIGHT / 1.2,
    borderRadius: PADDING,
    paddingVertical: PADDING,
    overflow: "hidden",
    marginVertical: PADDING,
    justifyContent: "space-between",
  },
  popularRecipeImage: {
    width: LARGE_CARD_WIDTH,
    height: LARGE_CARD_HEIGHT / 1.2,
    position: "absolute",
    left: 0,
    top: 0,
  },
  popularRecipeLabelContainer: {
    paddingHorizontal: PADDING / 2,
    paddingVertical: PADDING / 3,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    backgroundColor: COLORS.green800,
    alignSelf: "flex-end",
  },
  popularRecipeLabel: {
    fontSize: FONTS.s,
    color: COLORS.white,
    fontFamily: "SourceSansProSemibold",
  },
  popularRecipeName: {
    fontSize: FONTS.m,
    color: COLORS.white,
    fontFamily: "QuicksandSemibold",
    paddingBottom: PADDING / 4,
  },
  quantity: {
    fontSize: FONTS.s,
    color: COLORS.gray100,
    fontFamily: "SourceSansProRegular",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: PADDING / 2,
  },
  sectionHeaderTitle: {
    fontSize: FONTS.m * 1.1,
    fontFamily: "QuicksandSemibold",
  },
  recipeCount: {
    fontSize: FONTS.s,
    fontFamily: "SourceSansProRegular",
    color: COLORS.gray500,
    textDecorationLine: "underline",
  },
});
