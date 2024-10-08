import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Piechart from "@/components/Piechart";
import { DropDown } from "@/components/DropDown";
import ProgressCircle from "@/components/ProgressCircle";

//API
import userService from "@/services/user.service";

//redux
import { IRootState } from "store";
import { useSelector, useDispatch } from "react-redux";

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

const icons = [
  {
    category: "Food",
    icon: <Ionicons size={28} name="fast-food" color="#00bfa5" />,
  },
  {
    category: "Transportation",
    icon: <Ionicons size={28} name="car" color="#00bfa5" />,
  },
  {
    category: "Utilities",
    icon: <Ionicons size={28} name="bulb" color="#00bfa5" />,
  },
  {
    category: "Rent",
    icon: <Ionicons size={28} name="home" color="#00bfa5" />,
  },
  {
    category: "Entertainment",
    icon: <Ionicons size={28} name="game-controller" color="#00bfa5" />,
  },
  {
    category: "Clothing",
    icon: <Ionicons size={28} name="shirt" color="#00bfa5" />,
  },
  {
    category: "Savings",
    icon: <Ionicons size={28} name="accessibility" color="#00bfa5" />,
  },
  {
    category: "Others",
    icon: <Ionicons size={28} name="book" color="#00bfa5" />,
  },
];

export default function wallet() {
  const { top } = useSafeAreaInsets();
  const [expenseDataDisplay, setExpenseDataDisplay] = useState([]);

  const balance = useSelector((state: IRootState) => state.user.balance);
  const expenses = useSelector((state: IRootState) => state.user.expenses);

  // useEffect(() => {
  //   const expensesData = async () => {
  //     try {
  //       const response = await userService.getExpenses();
  //       const latestEntries = response.data[response.data.length - 1];
  //       setExpenseDataDisplay(latestEntries);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   //if data entry has been made, call this. if not, ignore.
  //   if (expenses !== 0) {
  //     expensesData();
  //   }
  // }, [expenses]);

  useEffect(() => {
    const expensesData = async () => {
      try {
        const response = await userService.getExpensesSummary();

        const result = Object.keys(response.data).map((key) => {
          return { [key]: response.data[key] };
        });
        setExpenseDataDisplay(result);

        // const keys = result.map((obj) => Object.keys(obj)[0]);

        // const latestEntries = response.data[response.data.length - 1];
        // setExpenseDataDisplay(latestEntries);
      } catch (error) {
        console.error(error);
      }
    };

    //if data entry has been made, call this. if not, ignore.
    if (expenses !== 0) {
      expensesData();
    }
  }, [expenses]);

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
            </View>
            <View className="w-full h-72 rounded-2xl">
              <ProgressCircle />
            </View>
          </View>
          <View className="statements-container w-full px-2 gap-3">
            <View className="flex flex-row justify-between">
              <Text className="font-['Poppins-Bold']">Statements History</Text>
            </View>
            <View className="flex gap-3">
              {expenseDataDisplay.length > 0 ? (
                expenseDataDisplay.slice(0, 6).map((data, index) => {
                  const dayKey = Object.keys(data)[0];
                  return (
                    <View
                      className="w-full flex flex-row items-center justify-between rounded-lg p-4 bg-white border-[1px] border-[#00bfa5]"
                      key={index}
                    >
                      <View className="flex flex-row justify-center items-center gap-5">
                        <View className="flex flex-col">
                          <Text className="font-['Poppins-Bold'] text-lg">
                            {dayKey}
                          </Text>
                          <Text>
                            <Text className="font-['Poppins-Regular'] text-xs">
                              Highest:{" "}
                              {data[dayKey].maxPercentageExpense.category}{" "}
                            </Text>
                            <Text className="font-['Poppins-Regular'] text-xs">
                              {"(" +
                                data[
                                  dayKey
                                ].maxPercentageExpense.amount.toLocaleString() +
                                ")"}
                            </Text>
                          </Text>
                        </View>
                      </View>
                      <Text className="font-['Poppins-Regular']">
                        P
                        {(
                          data[dayKey].totalIncome - data[dayKey].savings
                        ).toLocaleString()}
                      </Text>
                    </View>
                  );
                })
              ) : (
                <Text className="italic">No expenses to display.</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
