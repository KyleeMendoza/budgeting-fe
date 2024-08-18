import React, { useEffect, useState } from "react";
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
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { DropDown } from "@/components/DropDown";
import dayjs from "dayjs";

//redux
import { IRootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { setCloseStatementModal } from "@/Slice/modalSlice";
import { setExpenseData } from "@/Slice/userSlice";

//API
import getterService from "@/services/getter.service";
import userService from "@/services/user.service";
import { dispatchCommand } from "react-native-reanimated";

export default function ExpensesModal() {
  const dispatch = useDispatch();
  const [income, setIncome] = useState("");
  const statementModal = useSelector(
    (state: IRootState) => state.modal.statementModal
  );
  const [categories, setCategories] = useState([]);

  //TOAST
  const toastMessage = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  //Fetch categories for the Dropdown component.
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getterService.getCategories();
        const transformedData = response.data.map((item) => ({
          label: item.categories,
          value: item.categories,
        }));
        setCategories(transformedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      test: [{ category: "", percentage: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

  const onSubmit = async (data: { test: any[] }) => {
    const expenseData = data.test;
    const dataToday = dayjs().format("YYYY-MM-DD");

    // Convert percentage values to numbers
    const modifiedData = expenseData.map((item) => ({
      category: item.category,
      percentage: parseInt(item.percentage),
    }));

    //Check if percentages add up to 100
    const totalPercentage = modifiedData.reduce(
      (acc, item) => acc + item.percentage,
      0
    );

    if (income !== "" && expenseData.length !== 0) {
      if (expenseData.length < 4) {
        toastMessage("Please add atleast four expense statements.");
      } else {
        if (totalPercentage <= 100) {
          //POST INCOME
          try {
            const incomeResponse = await userService.postIncome(income);
            if (incomeResponse.status === 200) {
              //POST EXPENSES
              try {
                const expenseDataResponse =
                  await userService.postInitialExpences(
                    modifiedData,
                    dataToday
                  );
                if (expenseDataResponse.status === 200) {
                  dispatch(setExpenseData(modifiedData));
                  dispatch(setCloseStatementModal());
                  toastMessage("Expense statements successfully added.");
                }
              } catch (error) {
                toastMessage("There was an error setting expense data.");
              }
            }
          } catch (error) {
            toastMessage("There was an error setting income.");
          }
        } else {
          toastMessage("Make sure the percentages add up to 100.");
        }
      }
    } else {
      toastMessage("Please complete all inputs in the form.");
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={statementModal}
      onRequestClose={() => {
        dispatch(setCloseStatementModal());
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text className="font-['Poppins-Bold'] text-xl uppercase">
            Get Started!
          </Text>
          <Text
            style={styles.modalText}
            className="font-['Poppins-Regular'] text-sm"
          >
            Add atleast 4 budget statements.
          </Text>
          <Ionicons
            size={28}
            name="close"
            color="#00bfa5"
            onPress={() => {
              dispatch(setCloseStatementModal());
            }}
            style={{ position: "absolute", top: 10, right: 10 }}
          />
          <View className="income-container mb-4">
            <Text className="font-['Poppins-Regular'] text-sm mb-1">
              Enter your income:
            </Text>
            <TextInput
              mode="outlined"
              value={income}
              onChangeText={(value) => setIncome(value)}
              theme={{ roundness: 10 }}
              activeOutlineColor="#1bcf9a"
              outlineStyle={{ backgroundColor: "white" }}
              contentStyle={{ color: "black" }}
              placeholder="₱"
              keyboardType="numeric"
            />
          </View>
          <View className="w-full flex flex-col gap-4">
            <View className="flex flex-col justify-center gap-2">
              <View className="flex flex-row justify-between items-center">
                <Text className="font-['Poppins-Regular'] text-sm mb-1">
                  Enter your expenses:
                </Text>
                <Ionicons
                  size={28}
                  name="add"
                  color="#00bfa5"
                  onPress={() => {
                    append({ category: "", percentage: "" });
                  }}
                />
              </View>
              <ScrollView style={{ maxHeight: 300 }}>
                {fields.map((item, index) => {
                  return (
                    <View
                      key={item.id}
                      className="flex flex-row justify-between items-center mb-2"
                    >
                      <View className="flex flex-row gap-2 flex-1 items-center">
                        <View className="flex-1">
                          <Controller
                            control={control}
                            rules={{
                              required: true,
                            }}
                            render={({
                              field: { onChange, onBlur, value },
                            }) => (
                              <DropDown
                                filter={categories}
                                value={value}
                                setter={onChange}
                              />
                            )}
                            name={`test.${index}.category`}
                          />
                        </View>
                        <Controller
                          render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                              mode="outlined"
                              value={value}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              activeOutlineColor="#1bcf9a"
                              outlineStyle={{ backgroundColor: "white" }}
                              contentStyle={{ color: "black" }}
                              placeholder="%"
                              keyboardType="numeric"
                              style={{ width: "20%" }}
                            />
                          )}
                          name={`test.${index}.percentage`}
                          control={control}
                          rules={{
                            required: true,
                          }}
                        />
                      </View>
                      <Ionicons
                        size={28}
                        name="close"
                        color="red"
                        onPress={() => remove(index)}
                      />
                    </View>
                  );
                })}
              </ScrollView>
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
