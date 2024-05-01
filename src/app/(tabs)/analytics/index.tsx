import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Piechart from "@/components/Piechart";
import { DropDown } from "@/components/DropDown";
import ForecastLineChart from "@/components/ForecastLineChart";

const dateFilter = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

export default function analytics() {
  const { top } = useSafeAreaInsets();
  const [value, setValue] = useState(null);
  return (
    <View
      style={{
        flex: 1,
        paddingTop: top,
      }}
    >
      <ScrollView>
        <View className="main-container size-full flex items-center p-5 gap-8 bg-background">
          <View className="w-full flex gap-10">
            <View className="w-full flex flex-row justify-between items-center">
              <Text className="font-['Poppins-Bold'] text-xl">Analytics</Text>
              <View className="w-1/3">
                <DropDown filter={dateFilter} setter={setValue} value={value} />
              </View>
            </View>
            <View className="piechart-container w-full h-80 rounded-2xl">
              <Piechart />
            </View>
            <View className="card-container w-full flex flex-row gap-4">
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
            </View>
            <View className="area-container w-full h-80 rounded-2xl">
              <Text className="font-['Poppins-Bold'] text-lg">
                Budget Projection
              </Text>
              <ForecastLineChart />
              {/* FIX: fix the scrollable line graph */}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
