import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { useSession } from "../../ctx";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

//Modals
import IncomeModal from "@/modals/IncomeModal";
import ExpensesModal from "@/modals/ExpensesModal";
import CreateExpensesModal from "@/modals/CreateExpenseModal";

//API
import userService from "@/services/user.service";

//redux
import { IRootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { setCredits } from "@/Slice/userSlice";
import { setOpenIncomeModal, setOpenStatementModal } from "@/Slice/modalSlice";

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
  const dispatch = useDispatch();
  const { top } = useSafeAreaInsets();
  const { signOut } = useSession();
  const [expenseDataDisplay, setExpenseDataDisplay] = useState([]);

  const name = useSelector((state: IRootState) => state.user.name);
  const balance = useSelector((state: IRootState) => state.user.balance);
  const income = useSelector((state: IRootState) => state.user.income);
  const expenses = useSelector((state: IRootState) => state.user.expenses);
  const expenseData = useSelector(
    (state: IRootState) => state.user.expenseData
  );

  //This is the initializer function.
  const getUserSavingsAndExpense = async () => {
    try {
      const response = await userService.getUserSavingsAndExpense();
      if (response.data !== null) {
        dispatch(
          setCredits({
            savings: response.data.total_savings,
            expenses: response.data.overall_expense,
          })
        );
      } else {
        dispatch(
          setCredits({
            savings: 0,
            expenses: 0,
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserSavingsAndExpense();
  }, []);

  //After initializer function updates the expense and balance, get the expensesData to display it.
  useEffect(() => {
    const expensesData = async () => {
      try {
        const response = await userService.getExpenses();
        const latestEntries = response.data[response.data.length - 1];
        setExpenseDataDisplay(latestEntries);
      } catch (error) {
        console.error(error);
      }
    };

    //if data entry has been made, call this. if not, ignore.
    if (expenses !== 0) {
      expensesData();
    }
  }, [expenses]);

  const checkTimeFrame = async () => {
    try {
      const response = await userService.checkTimeFrame();
      if (response.data.isDone) {
        console.log("Income and Statements are set!");
        // Run the initializer function again.
        getUserSavingsAndExpense();
      } else if (response.data.isDone === false) {
        // Prompt user to enter expenses after initializing their income.
        dispatch(setOpenStatementModal());
      } else {
        // Prompt user to enter their income first.
        dispatch(setOpenIncomeModal());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkTimeFrame();
  }, [income, expenseData]);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: top,
      }}
    >
      <ScrollView>
        <IncomeModal />
        <ExpensesModal />
        <CreateExpensesModal />
        <View className="main-container size-full flex items-center p-5 gap-8 bg-background">
          <View className="info-container w-full flex flex-row justify-between items-center ">
            <View>
              <Text className="font-['Poppins-Regular'] text-lg">Welcome,</Text>
              <Text className="font-['Poppins-Bold'] text-xl">{name}</Text>
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
                  {balance ? `₱ ${balance.toLocaleString()}` : "0"}
                </Text>
              </View>
            </View>
            <View className="w-full flex flex-row justify-between">
              <View>
                <Text className="font-['Poppins-Regular'] text-white">
                  Income:
                </Text>
                <Text className="font-['Poppins-Bold'] text-2xl text-white">
                  {balance && expenses
                    ? `₱ ${(balance + expenses).toLocaleString()}`
                    : "0"}
                </Text>
              </View>
              <View>
                <Text className="font-['Poppins-Regular'] text-white">
                  Expenses:
                </Text>
                <Text className="font-['Poppins-Bold'] text-2xl text-white">
                  {expenses ? `₱ ${expenses.toLocaleString()}` : "0"}
                </Text>
              </View>
            </View>
          </LinearGradient>
          <View className="statements-container w-full px-2 gap-3">
            <View className="flex flex-row justify-between">
              <Text className="font-['Poppins-Bold']">Recent Statements</Text>
              <Text
                className="text-sm italic"
                onPress={() => router.replace("/wallet")}
              >
                View all
              </Text>
            </View>
            <View className="flex gap-3">
              {expenseDataDisplay.length > 0 ? (
                expenseDataDisplay.slice(0, 6).map((data, index) => (
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
                ))
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
