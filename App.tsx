import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Favorites, Home, Profile, RecipeDetail, Search } from "./src/screens";
import { FloatingBtn } from "./src/components";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import * as NavBar from "expo-navigation-bar";
import { useEffect } from "react";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import {
  HomeIcon as HomeIconSolid,
  HeartIcon as HeartIconSolid,
  UserIcon as UserIconSolid,
} from "react-native-heroicons/solid";
import COLORS from "./src/constants/colors";
import { StackParamlist, TabParamList } from "./src/utils/type";

const Stack = createNativeStackNavigator<StackParamlist>();
const Tab = createBottomTabNavigator<TabParamList>();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.navigator,
        tabBarItemStyle: { backgroundColor: COLORS.white },
        tabBarActiveTintColor: COLORS.green600,
        tabBarShowLabel: false,
      }}
      tabBar={(props) => {
        return (
          <View style={styles.navigatorContainer}>
            <BottomTabBar {...props} />
          </View>
        );
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <HomeIconSolid size={24} color={color} />
            ) : (
              <HomeIcon size={24} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => (
            <MagnifyingGlassIcon size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Fab"
        options={{
          tabBarButton: (props) => (
            <FloatingBtn bgColor={COLORS.white} {...props} />
          ),
        }}
      >
        {() => <View />}
      </Tab.Screen>
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <HeartIconSolid size={24} color={color} />
            ) : (
              <HeartIcon size={24} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <UserIconSolid size={24} color={color} />
            ) : (
              <UserIcon size={24} color={color} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  useEffect(() => {
    if (Platform.OS == "android") NavBar.setBackgroundColorAsync(COLORS.white);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Root"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Root" component={TabNavigator} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navigatorContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: COLORS.gray900,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  navigator: {
    borderTopWidth: 0,
    backgroundColor: "transparent",
    elevation: 50,
  },
});
