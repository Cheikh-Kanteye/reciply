import { FlatList, StyleSheet, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import FilterBtn from "./FilterBtn";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { PADDING } from "../constants/metrics";

const categories = [
  "all",
  "main dishes",
  "soups",
  "pasta recipes",
  "sweet",
  "most popular",
  "breads",
  "dips",
  "salad",
  "baking",
  "asian recipes",
  "beef recipes",
  "chicken",
  "lamb recipes",
  "breakfast",
  "muffin recipes",
  "egg recipes",
];

const FilterList = ({
  handleCategoryChange,
}: {
  handleCategoryChange: (q: string) => void;
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<FlatList>(null);

  useEffect(() => {
    scrollRef.current?.scrollToIndex({
      index: activeIndex,
      animated: true,
      viewPosition: 0.25,
    });
  }, [activeIndex]);

  return (
    <View
      style={{
        height: responsiveHeight(6),
        alignItems: "center",
      }}
    >
      <FlatList
        ref={scrollRef}
        style={{ flexGrow: 0 }}
        initialScrollIndex={activeIndex}
        contentContainerStyle={{ gap: PADDING / 2 }}
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(categorie) => categorie}
        renderItem={({ item, index }) => {
          return (
            <FilterBtn
              label={item}
              activeTab={activeTab}
              onPress={() => {
                setActiveTab(item);
                setActiveIndex(index);
                handleCategoryChange(item);
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default FilterList;

const styles = StyleSheet.create({});
