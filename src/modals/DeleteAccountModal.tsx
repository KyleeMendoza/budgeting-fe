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
import authService from "@/services/auth.service";
import { useSession } from "@/app/ctx";

//redux
import { IRootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { setCloseDeleteModal } from "@/Slice/modalSlice";
import { router } from "expo-router";

interface FormData {
  oldPassword: string;
  newPassword: string;
}

export default function DeleteModal() {
  const dispatch = useDispatch();
  const { signOut } = useSession();
  const deleteModal = useSelector(
    (state: IRootState) => state.modal.deleteModal
  );

  //TOAST
  const toastMessage = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await authService.deleteAccount();
      if (response.status === 200) {
        toastMessage("Successfully deleted.");
        dispatch(setCloseDeleteModal());
        signOut();
      } else {
        toastMessage("Delete failed.");
      }
    } catch (error) {
      toastMessage("Error deleting account.");
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={deleteModal}
      onRequestClose={() => {
        dispatch(setCloseDeleteModal());
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Ionicons
            size={28}
            name="close"
            color="#00bfa5"
            onPress={() => {
              dispatch(setCloseDeleteModal());
            }}
            style={{ position: "absolute", top: 10, right: 10 }}
          />
          <Text className="font-['Poppins-Bold'] text-xl  text-red-600">
            Are you sure you want to delete your account?
          </Text>
          <View className="flex flex-row justify-between items-center gap-2 pt-4">
            <Button
              mode="contained"
              uppercase
              onPress={() => {
                dispatch(setCloseDeleteModal());
              }}
              style={{
                borderRadius: 10,
                paddingVertical: 5,
                backgroundColor: "white",
                borderColor: "red",
                borderWidth: 1,
                flex: 1,
              }}
              labelStyle={{ fontSize: 16, color: "red" }}
            >
              cancel
            </Button>
            <Button
              mode="contained"
              uppercase
              onPress={handleDeleteAccount}
              style={{
                borderRadius: 10,
                paddingVertical: 5,
                backgroundColor: "#00bfa5",
                flex: 1,
              }}
              labelStyle={{ fontSize: 16, color: "white" }}
            >
              delete
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
