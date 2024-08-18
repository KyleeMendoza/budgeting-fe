import { View, Text, Image, useWindowDimensions } from "react-native";
import React from "react";
import { ToastAndroid } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  TextInput,
  Button,
  PaperProvider,
  Modal,
  Portal,
} from "react-native-paper";
import { useForm, Controller } from "react-hook-form";

// State Context
import { useSession } from "./ctx";

//API
import authService from "@/services/auth.service";

interface FormData {
  name: string;
  username: string;
  email: string;
  mobile: string;
  password: string;
  confirm_password: string;
}

export default function register() {
  const { top } = useSafeAreaInsets();
  const { signIn } = useSession();
  const windowHeight = useWindowDimensions().height;

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
      name: "",
      username: "",
      email: "",
      mobile: "",
      password: "",
      confirm_password: "",
    },
  });
  const onSubmit = async (data: FormData) => {
    const name = data.name;
    const username = data.username;
    const email = data.email;
    const mobile = data.mobile;
    const password = data.password;
    const confirm_password = data.confirm_password;

    if (password === confirm_password) {
      try {
        const response = await authService.register(
          name,
          mobile,
          email,
          username,
          password
        );

        if (response.status === 201) {
          toastMessage("Successfully created.");
          router.replace("/Login");
        } else {
          console.log(response.data.message);
          toastMessage("There was an error registering.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      toastMessage("passwords don't match.");
    }
  };

  return (
    <PaperProvider>
      <View
        className="flex-1 justify-center items-center"
        style={{ paddingTop: top }}
      >
        <View className="w-[85%] flex flex-col justify-center items-center gap-10">
          <View className="flex flex-col justify-center items-center">
            <Text className="font-['Poppins-Bold'] text-3xl ">
              Let's get started!
            </Text>
            <Text className="font-['Poppins-Regular'] text-sm">
              Create an account to access all features.
            </Text>
          </View>
          <View className="w-full flex flex-col gap-10">
            <View className="flex flex-col gap-2">
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    mode="outlined"
                    placeholder="Name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    theme={{ roundness: 50 }}
                    activeOutlineColor="#1bcf9a"
                    outlineStyle={{ backgroundColor: "white" }}
                    contentStyle={{ color: "black" }}
                  />
                )}
                name="name"
              />
              {errors.name && (
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
                    placeholder="Username"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    theme={{ roundness: 50 }}
                    activeOutlineColor="#1bcf9a"
                    outlineStyle={{ backgroundColor: "white" }}
                    contentStyle={{ color: "black" }}
                  />
                )}
                name="username"
              />
              {errors.username && (
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
                    placeholder="Email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    theme={{ roundness: 50 }}
                    activeOutlineColor="#1bcf9a"
                    outlineStyle={{ backgroundColor: "white" }}
                    contentStyle={{ color: "black" }}
                  />
                )}
                name="email"
              />
              {errors.email && (
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
                    placeholder="Phone"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    theme={{ roundness: 50 }}
                    activeOutlineColor="#1bcf9a"
                    outlineStyle={{ backgroundColor: "white" }}
                    contentStyle={{ color: "black" }}
                    keyboardType="numeric"
                  />
                )}
                name="mobile"
              />
              {errors.mobile && (
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
                    placeholder="Password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    theme={{ roundness: 50 }}
                    activeOutlineColor="#1bcf9a"
                    outlineStyle={{ backgroundColor: "white" }}
                    contentStyle={{ color: "black" }}
                    secureTextEntry
                  />
                )}
                name="password"
              />
              {errors.password && (
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
                    placeholder="Confirm Password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    theme={{ roundness: 50 }}
                    activeOutlineColor="#1bcf9a"
                    outlineStyle={{ backgroundColor: "white" }}
                    contentStyle={{ color: "black" }}
                    secureTextEntry
                  />
                )}
                name="confirm_password"
              />
              {errors.confirm_password && (
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
              register
            </Button>
          </View>
          <Text className="font-['Poppins-Regular'] italic">
            <Text>Already have an account? </Text>
            <Text
              className="underline text-blue-600"
              onPress={() => router.replace("/Login")}
            >
              Log in
            </Text>
          </Text>
        </View>
      </View>
    </PaperProvider>
  );
}
