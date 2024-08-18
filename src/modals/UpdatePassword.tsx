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

//redux
import { IRootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { setClosePasswordModal } from "@/Slice/modalSlice";

interface FormData {
  oldPassword: string;
  newPassword: string;
}

export default function PasswordModal() {
  const dispatch = useDispatch();
  const passwordModal = useSelector(
    (state: IRootState) => state.modal.passwordModal
  );
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);

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
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const oldPassword = data.oldPassword;
    const newPassword = data.newPassword;

    try {
      const response = await authService.updatePassword(
        oldPassword,
        newPassword
      );

      if (response.status === 200) {
        toastMessage("Successfully updated.");
        dispatch(setClosePasswordModal());
      } else {
        toastMessage("Update failed.");
      }
    } catch (error) {
      toastMessage("Enter correct old password or make sure they match.");
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={passwordModal}
      onRequestClose={() => {
        dispatch(setClosePasswordModal());
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Ionicons
            size={28}
            name="close"
            color="#00bfa5"
            onPress={() => {
              dispatch(setClosePasswordModal());
            }}
            style={{ position: "absolute", top: 10, right: 10 }}
          />
          <Text className="font-['Poppins-Bold'] text-xl  text-[#00bfa5]">
            Update Password
          </Text>
          <View className="w-full flex flex-col gap-4">
            <View className="flex flex-col gap-2 pt-8">
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
                    theme={{ roundness: 50 }}
                    activeOutlineColor="#1bcf9a"
                    outlineStyle={{ backgroundColor: "white" }}
                    contentStyle={{ color: "black" }}
                    placeholder="Old password"
                    secureTextEntry={!oldPasswordVisible}
                    right={
                      oldPasswordVisible ? (
                        <TextInput.Icon
                          icon="eye"
                          onPress={() => setOldPasswordVisible(false)}
                        />
                      ) : (
                        <TextInput.Icon
                          icon="eye-off"
                          onPress={() => setOldPasswordVisible(true)}
                        />
                      )
                    }
                  />
                )}
                name="oldPassword"
              />
              {errors.oldPassword && (
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
                    placeholder="New password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    theme={{ roundness: 50 }}
                    activeOutlineColor="#1bcf9a"
                    secureTextEntry={!newPasswordVisible}
                    outlineStyle={{ backgroundColor: "white" }}
                    contentStyle={{ color: "black" }}
                    right={
                      newPasswordVisible ? (
                        <TextInput.Icon
                          icon="eye"
                          onPress={() => setNewPasswordVisible(false)}
                        />
                      ) : (
                        <TextInput.Icon
                          icon="eye-off"
                          onPress={() => setNewPasswordVisible(true)}
                        />
                      )
                    }
                  />
                )}
                name="newPassword"
              />
              {errors.newPassword && (
                <Text className="text-sm text-red-600 italic">
                  This field is required.
                </Text>
              )}
            </View>
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
              Submit
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
