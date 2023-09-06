import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TabParamList } from "../utils/type";
import COLORS from "../constants/colors";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Favorites, Home, Profile, Search } from "../screens";
import { HomeIcon, UserIcon, HeartIcon } from "react-native-heroicons/outline";
import {
  HeartIcon as HeartIconSolid,
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon,
  UserIcon as UserIconSolid,
} from "react-native-heroicons/solid";
import { FloatingBtn } from "../components";

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
        tabBarHideOnKeyboard: true,
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

export default TabNavigator;

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
