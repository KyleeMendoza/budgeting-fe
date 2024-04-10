import { View, Text } from "react-native";
import React from "react";
import { PieChart } from "react-native-gifted-charts";

export default function Piechart() {
  const pieData = [
    {
      name: "Housing",
      value: 47,
      color: "#009FFF",
      gradientCenterColor: "#006DFF",
    },
    {
      name: "Transportation",
      value: 40,
      color: "#93FCF8",
      gradientCenterColor: "#3BE9DE",
    },
    {
      name: "Food",
      value: 16,
      color: "#BDB2FA",
      gradientCenterColor: "#8F80F3",
    },
    {
      name: "Other",
      value: 3,
      color: "#FFA5BA",
      gradientCenterColor: "#FF7F97",
    },
  ];

  return (
    <View className="h-full flex justify-center">
      <View style={{ alignItems: "center" }}>
        <PieChart
          data={pieData}
          donut
          showGradient
          focusOnPress
          radius={100}
          innerRadius={50}
        />
      </View>
      <View className=" w-full flex flex-wrap flex-row justify-center gap-2">
        {pieData.map((item, index) => (
          <View className="flex flex-row gap-2 items-center" key={index}>
            <View
              className="size-3"
              style={{ borderRadius: 50, backgroundColor: item.color }}
            ></View>
            <View className="flex flex-row gap-2">
              <Text className="font-['Poppins-Regular'] text-sm">
                {item.name}:
              </Text>
              <Text className="font-['Poppins-Regular'] text-sm">
                {item.value}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
