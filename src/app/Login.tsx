import { View, Text, Image, useWindowDimensions } from "react-native";
import React from "react";
import { ToastAndroid } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  PaperProvider,
  TextInput,
  Button,
  Modal,
  Portal,
} from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import spendcast from "../assets/img/spendcast.png";

// State Context
import { useSession } from "./ctx";

//API
import authService from "@/services/auth.service";

interface FormData {
  email: string;
  password: string;
}

export default function login() {
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
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const email = data.email;
    const password = data.password;

    try {
      const response = await authService.login(email, password);

      if (response.status === 200) {
        signIn();
        toastMessage("Successfully logged in.");
        router.replace("/home");
      } else {
        toastMessage("Invalid Credential.");
      }
    } catch (error) {
      toastMessage("There was an error logging in.");
    }
  };

  return (
    <PaperProvider>
      <View
        className="flex-1 justify-center items-center"
        style={{ paddingTop: top, minHeight: Math.round(windowHeight) }}
      >
        <View className="absolute top-28 flex justify-center items-center">
          <Image source={spendcast} className="w-72 h-28" />
        </View>
        <View className="w-[85%] flex flex-col justify-center items-center gap-2">
          <View className="flex flex-col justify-center items-center">
            <Text className="font-['Poppins-Regular'] text-2xl ">
              Welcome back!
            </Text>
            <Text className="font-['Poppins-Regular'] text-sm">
              Login to your account.
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
                    label="Email"
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
                    label="Password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    theme={{ roundness: 50 }}
                    activeOutlineColor="#1bcf9a"
                    secureTextEntry
                    outlineStyle={{ backgroundColor: "white" }}
                    contentStyle={{ color: "black" }}
                  />
                )}
                name="password"
              />
              {errors.password && (
                <Text className="text-sm text-red-600 italic">
                  This field is required.
                </Text>
              )}

              <Text className="italic self-end font-['Poppins-Regular'] underline text-blue-600">
                Forgot password ?
              </Text>
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
              login
            </Button>
          </View>
          <Text className="font-['Poppins-Regular'] italic">
            <Text>Don't have an account? </Text>
            <Text
              className="underline text-blue-600"
              onPress={() => router.replace("/register")}
            >
              Sign up
            </Text>
          </Text>
        </View>
      </View>
    </PaperProvider>
  );
}
