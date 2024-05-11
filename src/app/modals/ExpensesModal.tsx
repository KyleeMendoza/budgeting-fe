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
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { DropDown } from "@/components/DropDown";

//redux
import { IRootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { setCloseStatementModal } from "@/Slice/modalSlice";
import { setExpenseData } from "@/Slice/userSlice";

//API
import getterService from "@/services/getter.service";
import userService from "@/services/user.service";
import { dispatchCommand } from "react-native-reanimated";

interface FormData {
  category1: string;
  percent1: string;
  category2: string;
  percent2: string;
  category3: string;
  percent3: string;
  category4: string;
  percent4: string;
  // note: string;
}

export default function ExpensesModal() {
  const dispatch = useDispatch();
  const statementModal = useSelector(
    (state: IRootState) => state.modal.statementModal
  );
  const income = useSelector((state: IRootState) => state.user.income);
  const [categories, setCategories] = useState([]);
  const [timeframe, setTimeframe] = useState("");
  const [timeframeNumber, setTimeframeNumber] = useState();

  //TOAST
  const toastMessage = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  useEffect(() => {
    //Fetch categories for the Dropdown component.
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

    //Fetch timeframe need for posting the expenses.
    const fetchTimeframe = async () => {
      try {
        const response = await userService.getTimeframe();
        setTimeframe(response.data.Timeframe);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUserExpenses = async () => {
      try {
        const response = await userService.getExpenses();
        setTimeframeNumber(response.data.length + 1);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
    if (income !== 0) {
      fetchTimeframe();
      fetchUserExpenses();
    }
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category1: "",
      percent1: "",
      category2: "",
      percent2: "",
      category3: "",
      percent3: "",
      category4: "",
      percent4: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const transformedData = [];

    for (let i = 1; i <= 4; i++) {
      const categoryKey = `category${i}`;
      const percentKey = `percent${i}`;
      const category = data[categoryKey];
      const percentage = parseInt(data[percentKey]);

      if (category && !isNaN(percentage)) {
        transformedData.push({ category, percentage });
      }
    }

    try {
      const response = await userService.postInitialExpences(
        transformedData,
        `${timeframe} ${timeframeNumber}`
      );
      if (response.status === 200) {
        toastMessage("Statements successfully added.");
        dispatch(setExpenseData(transformedData));
        dispatch(setCloseStatementModal());
      } else {
        toastMessage("There was an error setting expenses.");
      }
    } catch (error) {
      toastMessage("There was an error setting expenses.");
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
            Add 4 initial budget statements.
          </Text>
          <View className="w-full flex flex-col gap-4">
            <ScrollView style={{ height: 300 }}>
              <View className="w-full flex gap-5">
                <View className="entry-container flex gap-2">
                  <Text className="font-[Poppins-Bold] text-sm">Entry 1</Text>
                  <View className="category-container w-full">
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <DropDown
                          filter={categories}
                          value={value}
                          setter={onChange}
                        />
                      )}
                      name="category1"
                    />
                    {errors.category1 && (
                      <Text className="text-sm text-red-600 italic">
                        This field is required.
                      </Text>
                    )}
                  </View>
                  <View className="amount-container w-full">
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
                          outlineStyle={{ backgroundColor: "white" }}
                          contentStyle={{ color: "black" }}
                          placeholder="Percent"
                          keyboardType="numeric"
                          right={<TextInput.Affix text="%" />}
                        />
                      )}
                      name="percent1"
                    />
                    {errors.percent1 && (
                      <Text className="text-sm text-red-600 italic">
                        This field is required.
                      </Text>
                    )}
                  </View>
                </View>
                <View className="entry-container flex gap-2">
                  <Text className="font-[Poppins-Bold] text-sm">Entry 2</Text>
                  <View className="category-container w-full">
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <DropDown
                          filter={categories}
                          value={value}
                          setter={onChange}
                        />
                      )}
                      name="category2"
                    />
                    {errors.category2 && (
                      <Text className="text-sm text-red-600 italic">
                        This field is required.
                      </Text>
                    )}
                  </View>
                  <View className="amount-container w-full">
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
                          outlineStyle={{ backgroundColor: "white" }}
                          contentStyle={{ color: "black" }}
                          placeholder="Percent"
                          keyboardType="numeric"
                          right={<TextInput.Affix text="%" />}
                        />
                      )}
                      name="percent2"
                    />
                    {errors.percent2 && (
                      <Text className="text-sm text-red-600 italic">
                        This field is required.
                      </Text>
                    )}
                  </View>
                </View>
                <View className="entry-container flex gap-2">
                  <Text className="font-[Poppins-Bold] text-sm">Entry 3</Text>
                  <View className="category-container w-full">
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <DropDown
                          filter={categories}
                          value={value}
                          setter={onChange}
                        />
                      )}
                      name="category3"
                    />
                    {errors.category3 && (
                      <Text className="text-sm text-red-600 italic">
                        This field is required.
                      </Text>
                    )}
                  </View>
                  <View className="amount-container w-full">
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
                          outlineStyle={{ backgroundColor: "white" }}
                          contentStyle={{ color: "black" }}
                          placeholder="Percent"
                          keyboardType="numeric"
                          right={<TextInput.Affix text="%" />}
                        />
                      )}
                      name="percent3"
                    />
                    {errors.percent3 && (
                      <Text className="text-sm text-red-600 italic">
                        This field is required.
                      </Text>
                    )}
                  </View>
                </View>
                <View className="entry-container flex gap-2">
                  <Text className="font-[Poppins-Bold] text-sm">Entry 4</Text>
                  <View className="category-container w-full">
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <DropDown
                          filter={categories}
                          value={value}
                          setter={onChange}
                        />
                      )}
                      name="category4"
                    />
                    {errors.category4 && (
                      <Text className="text-sm text-red-600 italic">
                        This field is required.
                      </Text>
                    )}
                  </View>
                  <View className="amount-container w-full">
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
                          outlineStyle={{ backgroundColor: "white" }}
                          contentStyle={{ color: "black" }}
                          placeholder="Percent"
                          keyboardType="numeric"
                          right={<TextInput.Affix text="%" />}
                        />
                      )}
                      name="percent4"
                    />
                    {errors.percent4 && (
                      <Text className="text-sm text-red-600 italic">
                        This field is required.
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </ScrollView>
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
