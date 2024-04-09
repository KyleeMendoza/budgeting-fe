import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs, Redirect } from "expo-router";
import { Text } from "react-native";

//State Context
import { useSession } from "../ctx";

export default function TabLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarStyle: {
          height: 70,
          width: "100%",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          paddingVertical: 10,
          backgroundColor: "lightblue",
          alignSelf: "center",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="home" color={color} />
          ),
          headerShown: false,
          tabBarLabel: "",
        }}
      />

      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={28} name="chart-simple" color={color} />
          ),
          headerShown: false,
          tabBarLabel: "",
        }}
      />

      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={28} name="wallet" color={color} />
          ),
          headerShown: false,
          tabBarLabel: "",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
          headerShown: false,
          tabBarLabel: "",
        }}
      />
    </Tabs>
  );
}