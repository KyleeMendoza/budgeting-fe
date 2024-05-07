import { View, Text, FlatList, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import { Link } from "expo-router";
import { useSession } from "../../ctx";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

//redux
import { IRootState } from "store";
import { useSelector } from "react-redux";

const data = [
  {
    item: "Food",
    expense: "P1,000",
    icon: <Ionicons size={28} name="fast-food" color="#00bfa5" />,
  },
  {
    item: "Transportation",
    expense: "P500",
    icon: <Ionicons size={28} name="car" color="#00bfa5" />,
  },
  {
    item: "Utilities",
    expense: "P700",
    icon: <Ionicons size={28} name="bulb" color="#00bfa5" />,
  },
  {
    item: "Rent",
    expense: "P2,000",
    icon: <Ionicons size={28} name="home" color="#00bfa5" />,
  },
  {
    item: "Entertainment",
    expense: "P300",
    icon: <Ionicons size={28} name="game-controller" color="#00bfa5" />,
  },
  {
    item: "Clothing",
    expense: "P600",
    icon: <Ionicons size={28} name="shirt" color="#00bfa5" />,
  },
  {
    item: "Healthcare",
    expense: "P4,00",
    icon: <Ionicons size={28} name="accessibility" color="#00bfa5" />,
  },
  {
    item: "Education",
    expense: "P800",
    icon: <Ionicons size={28} name="book" color="#00bfa5" />,
  },
  {
    item: "Gadget",
    expense: "P1,200",
    icon: <Ionicons size={28} name="phone-portrait" color="#00bfa5" />,
  },
];

export default function home() {
  const { top } = useSafeAreaInsets();
  const { signOut } = useSession();

  const username = useSelector((state: IRootState) => state.user.username);
  // TODO: dito na ako

  return (
    <View
      style={{
        flex: 1,
        paddingTop: top,
      }}
    >
      <ScrollView>
        <View className="main-container size-full flex items-center p-5 gap-8 bg-background">
          <View className="info-container w-full flex flex-row justify-between items-center ">
            <View>
              <Text className="font-['Poppins-Regular'] text-lg">Welcome,</Text>
              <Text className="font-['Poppins-Bold'] text-xl">
                {/* Josh Mojica. */}
                {username}
              </Text>
            </View>
            <Ionicons size={28} name="notifications" color="#00bfa5" />
          </View>
          <LinearGradient
            colors={["#00bfa5", "#004d40"]}
            start={[0, 0]}
            end={[1, 1]}
            className="card-container w-full flex gap-10 justify-between p-4"
            style={{ borderRadius: 15 }}
          >
            <View className="w-full">
              <View>
                <Text className="font-['Poppins-Regular'] text-white">
                  Total Balance:
                </Text>
                <Text className="font-['Poppins-Bold'] text-3xl text-white">
                  P200,000
                </Text>
              </View>
            </View>
            <View className="w-full flex flex-row justify-between">
              <View>
                <Text className="font-['Poppins-Regular'] text-white">
                  Income:
                </Text>
                <Text className="font-['Poppins-Bold'] text-2xl text-white">
                  P200,000
                </Text>
              </View>
              <View>
                <Text className="font-['Poppins-Regular'] text-white">
                  Expenses:
                </Text>
                <Text className="font-['Poppins-Bold'] text-2xl text-white">
                  P200,000
                </Text>
              </View>
            </View>
          </LinearGradient>
          <View className="statements-container w-full px-2 gap-3">
            <View className="flex flex-row justify-between">
              <Text className="font-['Poppins-Bold']">Recent Statements</Text>
              <Text className="text-sm italic">View all</Text>
            </View>
            <View className="flex gap-3">
              {data.slice(0, 6).map((data, index) => (
                <View
                  className="w-full flex flex-row items-center justify-between rounded-lg p-4 bg-white"
                  key={index}
                >
                  <View className="flex flex-row justify-center items-center gap-5">
                    <View className="size-12 rounded-xl flex justify-center items-center">
                      {data.icon}
                    </View>
                    <Text className="font-['Poppins-Bold'] text-lg">
                      {data.item}
                    </Text>
                  </View>
                  <Text className="font-['Poppins-Regular']">
                    {data.expense}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
