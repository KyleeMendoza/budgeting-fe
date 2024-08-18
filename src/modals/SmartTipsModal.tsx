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
import userService from "@/services/user.service";

//redux
import { IRootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { setCloseSmartModal } from "@/Slice/modalSlice";

export default function SmartTipsModal({ data }: any) {
  const dispatch = useDispatch();
  const [tips, setTips] = useState([]);

  const smartModal = useSelector((state: IRootState) => state.modal.smartModal);

  useEffect(() => {
    const fetchSmartTips = async () => {
      try {
        const response = await userService.getSmartTips(data);
        if (response.data !== null) {
          setTips(response.data);
        } else {
          setTips([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSmartTips();
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={smartModal}
      onRequestClose={() => {
        dispatch(setCloseSmartModal());
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Ionicons
            size={28}
            name="close"
            color="#00bfa5"
            onPress={() => {
              dispatch(setCloseSmartModal());
            }}
            style={{ position: "absolute", top: 10, right: 10 }}
          />
          <Text className="font-['Poppins-Bold'] text-xl  text-[#00bfa5]">
            Personal Tips!
          </Text>
          <Text className="font-['Poppins-Regular'] text-xs mb-5">
            Here's a personalized tips based on your spending habits.
          </Text>
          <ScrollView className="max-h-[400px]">
            <View className="flex flex-col gap-4">
              {tips.length !== 0 &&
                tips.map((item, key) => (
                  <View
                    className="flex flex-col gap-1 border-l-2 border-[#00bfa5] pl-2"
                    key={key}
                  >
                    <Text className="font-['Poppins-Bold'] text-base text-[#00bfa5]">
                      {item.category}
                    </Text>
                    <Text className="text-justify">{item.description}</Text>
                  </View>
                ))}
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
