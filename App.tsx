import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Favorites, Home, Profile, RecipeDetail, Search } from "./src/screens";
import { FloatingBtn } from "./src/components";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import * as NavBar from "expo-navigation-bar";
import { useCallback, useEffect } from "react";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import * as SplashScreen from "expo-splash-screen";
import {
  HomeIcon as HomeIconSolid,
  HeartIcon as HeartIconSolid,
  UserIcon as UserIconSolid,
} from "react-native-heroicons/solid";

import { StackParamlist, TabParamList } from "./src/utils/type";
import COLORS from "./src/constants/colors";
import { TabNavigator } from "./src/navigation";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator<StackParamlist>();
const Tab = createBottomTabNavigator<TabParamList>();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    QuicksandSemibold: require("./src/assets/fonts/Quicksand_SemiBold.otf"),
    QuicksandBold: require("./src/assets/fonts/Quicksand_Bold.otf"),
    SourceSansProRegular: require("./src/assets/fonts/SourceSansPro-Regular.otf"),
    SourceSansProSemibold: require("./src/assets/fonts/SourceSansPro-Semibold.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (Platform.OS == "android") NavBar.setBackgroundColorAsync(COLORS.white);
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={COLORS.green400} />
      </View>
    );
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Root"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Root" component={TabNavigator} />
          <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
