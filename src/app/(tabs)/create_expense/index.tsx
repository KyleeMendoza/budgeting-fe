import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  PaperProvider,
  TextInput,
  Button,
  Modal,
  Portal,
} from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { DropDown } from "@/components/DropDown";

interface FormData {
  amount: string;
  category: string;
  note: string;
}

const category = [
  { label: "Food", value: "Food" },
  { label: "Transportation", value: "Transportation" },
  { label: "Utilities", value: "Utilities" },
  { label: "Rent", value: "Rent" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Clothing", value: "Clothing" },
  { label: "Savings", value: "Savings" },
  { label: "Miscellaneous", value: "Miscellaneous" },
];

export default function create_expense() {
  const { top } = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: "",
      category: "",
      note: "",
    },
  });
  const onSubmit = (data: FormData) => {
    const amount = data.amount;
    const category = data.category;
    const note = data.note;

    console.log("amount: ", amount);
    console.log("category: ", category);
    console.log("note: ", note);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: top,
      }}
    >
      <ScrollView>
        <View className="main-container size-full flex items-center p-5 gap-8 bg-background">
          <View className="w-full gap-4">
            <Text className="font-['Poppins-Bold'] text-xl">
              Add a Transaction
            </Text>
          </View>
          <View className="w-full flex gap-5">
            <View className="input-container">
              <Text className="font-['Poppins-Bold'] text-lg text-gray-600">
                Amount
              </Text>
              <View className="border-b-[1px] border-black flex flex-row justify-between items-center">
                <Text className="font-['Poppins-Bold'] text-2xl text-gray-600">
                  ₱
                </Text>
                <View className="flex-1">
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        mode="outlined"
                        value={value}
                        onChangeText={(text) => {
                          const numericValue = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                          onChange(numericValue);
                        }}
                        onBlur={onBlur}
                        keyboardType="numeric"
                        activeOutlineColor="#1bcf9a"
                        contentStyle={{
                          backgroundColor: "#f2f1f6",
                          fontSize: 30,
                        }}
                      />
                    )}
                    name="amount"
                  />
                </View>
                <View className="flex justify-center items-center">
                  <Text className="text-white font-['Poppins-Bold'] bg-['#00bfa5'] px-3 py-2 rounded-lg">
                    PHP
                  </Text>
                </View>
              </View>
              {errors.amount && (
                <Text className="text-sm text-red-600 italic">
                  This field is required.
                </Text>
              )}
            </View>
            <View className="input-container flex flex-col gap-4">
              <Text className="font-['Poppins-Bold'] text-lg text-gray-600">
                Expenses made for
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <DropDown filter={category} value={value} setter={onChange} />
                )}
                name="category"
              />
              {errors.category && (
                <Text className="text-sm text-red-600 italic">
                  This field is required.
                </Text>
              )}
            </View>
            <View className="input-container">
              <Text className="font-['Poppins-Bold'] text-lg text-gray-600">
                Note
              </Text>
              <View className="border-b-[1px] border-black">
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      mode="outlined"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      activeOutlineColor="#1bcf9a"
                      contentStyle={{
                        backgroundColor: "#f2f1f6",
                      }}
                    />
                  )}
                  name="note"
                />
              </View>
              {errors.note && (
                <Text className="text-sm text-red-600 italic">
                  This field is required.
                </Text>
              )}
            </View>
          </View>
          <View className="w-full">
            <Button
              mode="contained"
              uppercase
              onPress={handleSubmit(onSubmit)}
              style={{
                borderRadius: 20,
                paddingVertical: 5,
                backgroundColor: "#00bfa5",
              }}
              labelStyle={{ fontSize: 16 }}
            >
              Confirm
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
