import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Piechart from "@/components/Piechart";
import { DropDown } from "@/components/DropDown";
import ForecastLineChart from "@/components/ForecastLineChart";
import { Button } from "react-native-paper";

//redux
import { IRootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { setOpenForecastModal } from "@/Slice/modalSlice";

const dateFilter = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

export default function analytics() {
  const { top } = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);

  const balance = useSelector((state: IRootState) => state.user.balance);
  const expenses = useSelector((state: IRootState) => state.user.expenses);
  const timeframe = useSelector((state: IRootState) => state.user.timeframe);

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
              <View className="w-[30%]">
                {/* <DropDown filter={dateFilter} setter={setValue} value={value} /> */}
                <Button
                  mode="contained"
                  uppercase
                  onPress={() => dispatch(setOpenForecastModal())}
                  style={{
                    borderRadius: 5,
                    paddingVertical: 0,
                    backgroundColor: "#00bfa5",
                  }}
                  labelStyle={{ fontSize: 10, color: "white" }}
                >
                  Forecast
                </Button>
              </View>
            </View>
            {expenses ? (
              <View className="piechart-container w-full rounded-2xl">
                <Piechart />
              </View>
            ) : null}

            <View className="card-container w-full flex flex-row gap-4">
              <View className="flex-1 rounded-lg flex justify-center items-center bg-['#00bfa5'] py-4">
                <Text className="font-['Poppins-Regular'] text-white">
                  Total Income:
                </Text>
                <Text className="font-['Poppins-Bold'] text-2xl text-white">
                  {(balance + expenses).toLocaleString()}
                </Text>
              </View>
              <View className="flex-1 rounded-lg flex justify-center items-center bg-['#FAA0A0'] py-4">
                <Text className="font-['Poppins-Regular'] text-white">
                  Total Expense:
                </Text>
                <Text className="font-['Poppins-Bold'] text-2xl text-white">
                  {expenses.toLocaleString()}
                </Text>
              </View>
            </View>
            <View className="area-container w-full h-80 rounded-2xl">
              <View className="w-full flex flex-row justify-between items-center">
                <Text className="font-['Poppins-Bold'] text-lg">
                  Budget Projection
                </Text>
                {timeframe ? null : (
                  <Text className="font-['Poppins-Regular'] text-sm italic">
                    No data to display.
                  </Text>
                )}
              </View>
              <ForecastLineChart timeframe={timeframe} />
              {/* FIX: fix the scrollable line graph */}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
