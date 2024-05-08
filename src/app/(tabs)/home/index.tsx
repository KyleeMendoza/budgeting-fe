import { View, Text, FlatList, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { useSession } from "../../ctx";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

//API
import userService from "@/services/user.service";

//redux
import { IRootState } from "store";
import { useSelector } from "react-redux";

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

export default function home() {
  const { top } = useSafeAreaInsets();
  const { signOut } = useSession();
  const [expenseData, setExpenseData] = useState([]);

  const name = useSelector((state: IRootState) => state.user.name);
  // TODO: dito na ako

  useEffect(() => {
    const expensesData = async () => {
      try {
        const response = await userService.getExpenses();
        const latestEntries = response.data[response.data.length - 1];
        // const addIconToData = latestEntries.map((item) => {
        //   let icon: any;
        //   switch (item.category) {
        //     case "Food":
        //       icon = <Ionicons size={28} name="fast-food" color="#00bfa5" />;
        //       break;
        //     case "Transportation":
        //       icon = <Ionicons size={28} name="car" color="#00bfa5" />;
        //       break;
        //     case "Utilities":
        //       icon = <Ionicons size={28} name="car" color="#00bfa5" />;
        //       break;
        //     case "Rent":
        //       icon = <Ionicons size={28} name="car" color="#00bfa5" />;
        //       break;
        //     case "Entertainment":
        //       icon = <Ionicons size={28} name="car" color="#00bfa5" />;
        //       break;
        //     case "Clothing":
        //       icon = <Ionicons size={28} name="car" color="#00bfa5" />;
        //       break;
        //     case "Savings":
        //       icon = <Ionicons size={28} name="car" color="#00bfa5" />;
        //       break;
        //     case "Others":
        //       icon = <Ionicons size={28} name="car" color="#00bfa5" />;
        //       break;
        //     default:
        //       icon = null; // Handle default case if needed
        //   }
        //   return { ...item, icon };
        // });
        // console.log("expensesData: ", latestEntries);
        setExpenseData(latestEntries);
      } catch (error) {
        console.error(error);
      }
    };
    expensesData();
  }, []);

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
                {name}
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
              {expenseData &&
                expenseData.slice(0, 6).map((data, index) => (
                  <View
                    className="w-full flex flex-row items-center justify-between rounded-lg p-4 bg-white"
                    key={index}
                  >
                    <View className="flex flex-row justify-center items-center gap-5">
                      {icons.map((item, index) =>
                        item.category === data.category ? (
                          <View
                            className="size-12 rounded-xl flex justify-center items-center"
                            key={index}
                          >
                            {item.icon}
                          </View>
                        ) : null
                      )}

                      <Text className="font-['Poppins-Bold'] text-lg">
                        {data.category}
                      </Text>
                    </View>
                    <Text className="font-['Poppins-Regular']">
                      P{data.allocated_amount}
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
