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
import React from "react";

//redux
import { IRootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { setCloseIncomeModal } from "@/Slice/modalSlice";
import { setIncome } from "@/Slice/userSlice";

//API
import userService from "@/services/user.service";

interface FormData {
  income: string;
  timeframe: string;
}

export default function IncomeModal() {
  const dispatch = useDispatch();
  const incomeModal = useSelector(
    (state: IRootState) => state.modal.incomeModal
  );

  //TOAST
  const toastMessage = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      income: "",
      timeframe: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const income = data.income;
    const timeframe = data.timeframe;

    try {
      const response = await userService.postIncomeTimeframe(income, timeframe);
      if (response.status === 200) {
        dispatch(setIncome(income));
        dispatch(setCloseIncomeModal());
      } else {
        toastMessage("There was an error setting income.");
      }
    } catch (error) {
      toastMessage("There was an error setting income.");
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={incomeModal}
      onRequestClose={() => {
        dispatch(setCloseIncomeModal());
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
            Enter your income and preferred timeframe.
          </Text>
          <View className="w-full flex flex-col gap-2">
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
                  theme={{ roundness: 10 }}
                  activeOutlineColor="#1bcf9a"
                  outlineStyle={{ backgroundColor: "white" }}
                  contentStyle={{ color: "black" }}
                  placeholder="₱"
                  keyboardType="numeric"
                />
              )}
              name="income"
            />
            {errors.income && (
              <Text className="text-sm text-red-600 italic">
                This field is required.
              </Text>
            )}
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
                  theme={{ roundness: 10 }}
                  activeOutlineColor="#1bcf9a"
                  outlineStyle={{ backgroundColor: "white" }}
                  contentStyle={{ color: "black" }}
                  placeholder="Daily, Weekly, Monthly"
                />
              )}
              name="timeframe"
            />
            {errors.timeframe && (
              <Text className="text-sm text-red-600 italic">
                This field is required.
              </Text>
            )}
            <Button
              mode="contained"
              uppercase
              onPress={handleSubmit(onSubmit)}
              style={{
                borderRadius: 20,
                paddingVertical: 5,
                backgroundColor: "#00bfa5",
              }}
              labelStyle={{ fontSize: 16, color: "white" }}
            >
              Save
            </Button>
          </View>

          {/* <Pressable
            onPress={() => dispatch(setCloseIncomeModal())}
            style={[styles.button, styles.buttonClose]}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable> */}
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
