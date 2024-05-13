import React from "react";
import { View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs, Redirect } from "expo-router";
import { Text } from "react-native";

//State Context
import { useSession } from "../ctx";

// API
import userService from "@/services/user.service";

//redux
import { IRootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import {
  setOpenIncomeModal,
  setOpenTimeframeModal,
  setOpenCreateModal,
  setOpenStatementModal,
} from "@/Slice/modalSlice";

export default function TabLayout() {
  {
    /* TODO: Comment this out to remove auth */
  }
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/Login" />;
  }
  {
    /* TODO: Comment this out to remove auth */
  }

  const dispatch = useDispatch();
  const checkTimeFrame = async () => {
    try {
      const response = await userService.checkTimeFrame();
      if (response.data.isDone) {
        // Income and Statements are set!
        dispatch(setOpenCreateModal());
      } else if (response.data.isDone === false) {
        // Prompt user to enter income and expense
        dispatch(setOpenIncomeModal());
      } else {
        // Prompt user to enter timeframe first.
        dispatch(setOpenTimeframeModal());
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#00bfa5",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 70,
          width: "100%",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          paddingVertical: 10,
          borderColor: "black",
          borderWidth: 1,
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
        name="create_expenses"
        options={{
          tabBarButton: () => (
            <View className="py-2 px-4">
              <AntDesign
                size={30}
                name="pluscircleo"
                color="gray"
                onPress={checkTimeFrame}
              />
            </View>
          ),
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
