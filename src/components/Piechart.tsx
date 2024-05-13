import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { PieChart } from "react-native-gifted-charts";

//redux
import { IRootState } from "store";
import { useSelector, useDispatch } from "react-redux";

// API
import userService from "@/services/user.service";

export default function Piechart() {
  const [expenseDataDisplay, setExpenseDataDisplay] = useState([]);
  const isDone = useSelector((state: IRootState) => state.user.isDone);

  const pieData = [
    {
      name: "No Data",
      value: 100,
      color: "#00bfa5",
      gradientCenterColor: "#00bfa5",
    },
  ];

  const getRandomColor = () => {
    let randomColorString = "#";
    const arrayOfColorFunctions = "0123456789abcdef";
    for (let x = 0; x < 6; x++) {
      let index = Math.floor(Math.random() * 16);
      let value = arrayOfColorFunctions[index];

      randomColorString += value;
    }
    return randomColorString;
  };

  useEffect(() => {
    const expensesData = async () => {
      try {
        const response = await userService.getExpenses();
        const latestEntries = response.data[response.data.length - 1];

        const transformedData = latestEntries.map((item) => ({
          name: item.category,
          value: item.thisPercentage,
          color: getRandomColor(),
          gradientCenterColor: getRandomColor(),
        }));

        console.log("analyticsData: ", transformedData);
        setExpenseDataDisplay(transformedData);
      } catch (error) {
        console.error(error);
      }
    };

    //if data entry has been made, call this. if not, ignore.
    if (isDone) {
      expensesData();
    }
  }, [isDone]);

  return (
    <View className="h-full flex justify-center">
      <View style={{ alignItems: "center" }}>
        <PieChart
          data={expenseDataDisplay ? expenseDataDisplay : pieData}
          donut
          showGradient
          focusOnPress
          radius={100}
          innerRadius={50}
        />
      </View>
      <View className=" w-full flex flex-wrap flex-row justify-center gap-2">
        {expenseDataDisplay &&
          expenseDataDisplay.map((item, index) => (
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
