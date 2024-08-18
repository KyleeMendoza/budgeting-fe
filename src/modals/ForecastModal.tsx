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
import { setCloseForecastModal } from "@/Slice/modalSlice";

//API
import userService from "@/services/user.service";
import ArimaLineChart from "@/components/ArimaLineChart";

export default function ForecastModal() {
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);
  const [arimaData, setArimaData] = useState([]);

  //TOAST
  const toastMessage = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const forecastModal = useSelector(
    (state: IRootState) => state.modal.forecastModal
  );

  useEffect(() => {
    const showArimaLineChart = async () => {
      try {
        const response = await userService.getArimaGraph();
        setArimaData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (isClicked) {
      showArimaLineChart();
    }
  }, [isClicked]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={forecastModal}
      onRequestClose={() => {
        dispatch(setCloseForecastModal());
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Ionicons
            size={28}
            name="close"
            color="#00bfa5"
            onPress={() => {
              dispatch(setCloseForecastModal());
            }}
            style={{ position: "absolute", top: 10, right: 10 }}
          />
          <Text className="font-['Poppins-Bold'] text-lg">Budget Forecast</Text>
          <Text className="font-['Poppins-Regular'] text-xs">
            Click to generate ARIMA graph for forecasted budget.
          </Text>
          <Text className="font-['Poppins-Regular'] text-xs italic text-red-600">
            Note: You need to have atleast 3 entries for the forecast to work.
          </Text>
          {arimaData.length! > 0 ? (
            <>
              <Text className="absolute left-0 top-1/2 -rotate-90">Amount</Text>
              <View className="ml-4">
                <ArimaLineChart data={arimaData} />
              </View>
              <Text className="absolute left-1/2 bottom-2">Day</Text>
            </>
          ) : (
            <View className="mt-4">
              <Button
                mode="contained"
                uppercase
                onPress={() => {
                  setIsClicked(true);
                }}
                style={{
                  borderRadius: 5,
                  paddingVertical: 0,
                  backgroundColor: "#00bfa5",
                }}
                labelStyle={{ fontSize: 16, color: "white" }}
              >
                Generate
              </Button>
            </View>
          )}
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
    width: "95%",
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
