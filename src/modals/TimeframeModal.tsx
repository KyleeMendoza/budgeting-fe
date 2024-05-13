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
import React, { useEffect } from "react";

//redux
import { IRootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { setCloseTimeframeModal } from "@/Slice/modalSlice";
import { setTimeframe } from "@/Slice/userSlice";

//API
import userService from "@/services/user.service";

interface FormData {
  timeframe: string;
}

const dateFilter = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

export default function TimeframeModal() {
  const dispatch = useDispatch();
  const timeframeModal = useSelector(
    (state: IRootState) => state.modal.timeframeModal
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
      timeframe: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const timeframe = data.timeframe;

    try {
      const response = await userService.postIncomeTimeframe("0", timeframe);
      if (response.status === 200) {
        dispatch(setTimeframe(timeframe));
        dispatch(setCloseTimeframeModal());
        console.log("Timeframe is set.");
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
      visible={timeframeModal}
      onRequestClose={() => {
        dispatch(setCloseTimeframeModal());
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
            Enter your preferred timeframe.
          </Text>
          <View className="w-full flex flex-col gap-2">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <DropDown filter={dateFilter} value={value} setter={onChange} />
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
