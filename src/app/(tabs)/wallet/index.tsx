import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Piechart from "@/components/Piechart";
import { DropDown } from "@/components/DropDown";
import ProgressCircle from "@/components/ProgressCircle";

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

export default function wallet() {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: top,
      }}
    >
      <ScrollView>
        <View className="main-container size-full flex items-center p-5 gap-8 bg-background">
          <View className="w-full  flex gap-4">
            <View className="w-full flex flex-row justify-between items-center">
              <Text className="font-['Poppins-Bold'] text-xl">
                Budget Summary
              </Text>
              <View className="w-1/3">{/* <DropDown /> */}</View>
            </View>
            <View className="w-full h-72 rounded-2xl">
              {/* <Piechart /> */}
              <ProgressCircle />
            </View>
          </View>
          {/* <View className="w-full flex flex-row gap-4">
            <View className="flex-1 rounded-lg flex justify-center items-center bg-['#00bfa5'] py-4">
              <Text className="font-['Poppins-Regular'] text-white">
                Total Income:
              </Text>
              <Text className="font-['Poppins-Bold'] text-2xl text-white">
                P40,000
              </Text>
            </View>
            <View className="flex-1 rounded-lg flex justify-center items-center bg-['#FAA0A0'] py-4">
              <Text className="font-['Poppins-Regular'] text-white">
                Total Expense:
              </Text>
              <Text className="font-['Poppins-Bold'] text-2xl text-white">
                P25,000
              </Text>
            </View>
          </View> */}
          <View className="statements-container w-full px-2 gap-3">
            <View className="flex flex-row justify-between items-center ">
              <Text className="font-['Poppins-Bold']">My Statements</Text>
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
