import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-gifted-charts";

//API
import userService from "@/services/user.service";

export default function ForecastLineChart({ timeframe }) {
  const [data, setData] = useState([]);
  const dPoint = () => {
    return (
      <View
        style={{
          width: 14,
          height: 14,
          backgroundColor: "white",
          borderWidth: 3,
          borderRadius: 7,
          borderColor: "#07BAD1",
        }}
      />
    );
  };

  const lcomp = (date: any) => (
    <Text style={{ color: "black", fontSize: 14 }}>{date}</Text>
  );

  useEffect(() => {
    const fetchExpenseDataSummary = async () => {
      try {
        const response = await userService.getExpensesSummary();

        const transformData = Object.keys(response.data).map((day) => ({
          value: response.data[day].totalIncome - response.data[day].savings,
          labelComponent: () => lcomp(day.slice(5)),
          customDataPoint: dPoint,
        }));

        setData(transformData);
      } catch (error) {
        console.error(error);
      }
    };

    if (timeframe) {
      fetchExpenseDataSummary();
    }
  }, [timeframe]);

  return (
    <View className="h-full flex justify-center">
      <LineChart
        areaChart
        isAnimated
        thickness={3}
        startOpacity={1}
        noOfSections={5}
        data={data ? data : []}
        rulesType="solid"
        endOpacity={0.1}
        yAxisThickness={2}
        xAxisThickness={2}
        color="#eeee"
        animationDuration={1000}
        backgroundColor="transparent"
        startFillColor={"#00bfa5"}
        endFillColor={"rgb(84,219,234)"}
        rulesColor="gray"
        yAxisColor="black"
        xAxisColor="black"
        yAxisTextStyle={{
          color: "black",
        }}
        width={290}
      />
    </View>
  );
}
