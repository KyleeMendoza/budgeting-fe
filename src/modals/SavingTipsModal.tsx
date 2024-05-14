import {
  View,
  Text,
  FlatList,
  ScrollView,
  Modal,
  Pressable,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { DropDown } from "@/components/DropDown";
import React, { useEffect, useState } from "react";

//redux
import { IRootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { setCloseTipsModal } from "@/Slice/modalSlice";

export default function SavingTipsModal() {
  const dispatch = useDispatch();

  const tipsModal = useSelector((state: IRootState) => state.modal.tipsModal);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={tipsModal}
      onRequestClose={() => {
        dispatch(setCloseTipsModal());
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Ionicons
            size={28}
            name="close"
            color="#00bfa5"
            onPress={() => {
              dispatch(setCloseTipsModal());
            }}
            style={{ position: "absolute", top: 10, right: 10 }}
          />
          <Text className="font-['Poppins-Bold'] text-xl  text-[#00bfa5]">
            Saving Tips!
          </Text>
          <Text className="font-['Poppins-Regular'] text-xs mb-5">
            Here's a detailed guide on budget-saving tips
          </Text>
          <ScrollView className="max-h-[400px]">
            <View className="flex flex-col gap-4">
              <View className="flex flex-col gap-1">
                <Text className="text-justify">
                  {"    "}In today's fast-paced world, managing finances
                  effectively is more important than ever. Whether you're saving
                  for a big purchase, planning for retirement, or simply trying
                  to live within your means, adopting smart budgeting practices
                  can make a significant difference. Here are some budget-saving
                  tips to help you take control of your finances and achieve
                  your financial goals.
                </Text>
              </View>
              <View className="flex flex-col gap-1">
                <Text className="font-['Poppins-Bold'] text-base text-[#00bfa5]">
                  Track Your Spending
                </Text>
                <Text className="text-justify">
                  Start by tracking your daily, weekly, and monthly expenses.
                  Use a budgeting app or a simple spreadsheet to record every
                  purchase. Understanding where your money goes is the first
                  step towards better financial management. It helps you
                  identify unnecessary expenditures and areas where you can cut
                  back.
                </Text>
              </View>
              <View className="flex flex-col gap-1">
                <Text className="font-['Poppins-Bold'] text-base text-[#00bfa5]">
                  Create a Budget
                </Text>
                <Text className="text-justify">
                  Develop a monthly budget based on your income and expenses.
                  Allocate funds for essentials like rent, groceries, utilities,
                  and savings. A budget provides a clear plan for your spending,
                  ensuring that you live within your means and prioritize
                  saving.
                </Text>
              </View>
              <View className="flex flex-col gap-1">
                <Text className="font-['Poppins-Bold'] text-base text-[#00bfa5]">
                  Cook at Home
                </Text>
                <Text className="text-justify">
                  Plan your meals and cook at home instead of eating out or
                  ordering takeout. Preparing your own meals is generally much
                  cheaper and healthier than dining out. It also allows you to
                  make larger portions that can be used for multiple meals.
                </Text>
              </View>
              <View className="flex flex-col gap-1">
                <Text className="font-['Poppins-Bold'] text-base text-[#00bfa5]">
                  Reduce Utility Bills
                </Text>
                <Text className="text-justify">
                  Implement energy-saving practices like turning off lights when
                  not in use, using energy-efficient appliances, and setting
                  your thermostat wisely. Lowering your utility bills can result
                  in significant long-term savings. Simple changes in your
                  energy consumption can make a big difference.
                </Text>
              </View>
              <View className="flex flex-col gap-1">
                <Text className="font-['Poppins-Bold'] text-base text-[#00bfa5]">
                  Save Automatically
                </Text>
                <Text className="text-justify">
                  Set up automatic transfers to your savings account each month.
                  Treat savings like a fixed expense. Automatic savings ensure
                  that you consistently set aside money for your future, helping
                  you build a financial cushion.
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 25,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    // textAlign: "center",
  },
});
