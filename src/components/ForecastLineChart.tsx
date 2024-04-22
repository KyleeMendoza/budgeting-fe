import { View, Text } from "react-native";
import React, { useState } from "react";
import { LineChart } from "react-native-gifted-charts";

export default function ForecastLineChart() {
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

  const latestData = [
    {
      value: 100,
      labelComponent: () => lcomp("22 Nov"),
      customDataPoint: dPoint,
    },
    {
      value: 120,
      labelComponent: () => lcomp("23 Nov"),
      customDataPoint: dPoint,
    },
    {
      value: 210,
      labelComponent: () => lcomp("24 Nov"),
      customDataPoint: dPoint,
    },
    {
      value: 250,
      labelComponent: () => lcomp("25 Nov"),
      customDataPoint: dPoint,
    },
    {
      value: 320,
      labelComponent: () => lcomp("26 Nov"),
      customDataPoint: dPoint,
    },
    {
      value: 305,
      labelComponent: () => lcomp("27 Nov"),
      customDataPoint: dPoint,
    },
    {
      value: 335,
      labelComponent: () => lcomp("28 Nov"),
      customDataPoint: dPoint,
    },
  ];

  const [currentData, setCurrentData] = useState(latestData);

  const lcomp = (date: any) => (
    <Text style={{ color: "black", fontSize: 14 }}>{date}</Text>
  );

  return (
    <View className="h-full flex justify-center">
      <LineChart
        areaChart
        isAnimated
        thickness={3}
        maxValue={600}
        startOpacity={1}
        noOfSections={5}
        data={currentData}
        rulesType="solid"
        endOpacity={0.1}
        yAxisThickness={2}
        xAxisThickness={2}
        color="#eeee"
        animationDuration={1000}
        backgroundColor="transparent"
        // yAxisLabelSuffix="% "
        //   stepHeight={AppTheme.WP(10)}
        startFillColor={"rgb(84,219,234)"}
        endFillColor={"rgb(84,219,234)"}
        rulesColor="gray"
        yAxisColor="black"
        xAxisColor="black"
        //   spacing={AppTheme.WP(10)}
        yAxisTextStyle={{
          color: "black",
        }}
      />
    </View>
  );
}
