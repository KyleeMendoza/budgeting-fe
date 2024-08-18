import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-gifted-charts";

export default function ArimaLineChart({ data }) {
  const [arima, setArima] = useState([]);
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
    const transformedArray = data.map((item) => {
      let formattedLabel;

      if (item.date.startsWith("Day")) {
        formattedLabel = `D${item.date.replace("Day ", "")}`;
      } else if (item.date.startsWith("Predicted")) {
        formattedLabel = `P${item.date.replace("Predicted Day ", "")}`;
      }

      return {
        value: item.totalAmount,
        labelComponent: () => lcomp(formattedLabel),
        customDataPoint: dPoint,
      };
    });

    console.log("data: ", transformedArray);
    setArima(transformedArray);
  }, []);

  return (
    <View className="flex justify-center pt-8">
      <LineChart
        curved
        rotateLabel
        areaChart
        isAnimated
        thickness={3}
        startOpacity={1}
        noOfSections={6}
        data={arima ? arima : []}
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
        width={230}
      />
    </View>
  );
}
