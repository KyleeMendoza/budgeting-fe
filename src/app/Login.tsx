import { View, Text, Image, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import { ToastAndroid } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import {
  PaperProvider,
  TextInput,
  Button,
  Modal,
  Portal,
  Icon,
} from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import spendcast from "../assets/img/spendcast.png";

//redux
import { useDispatch } from "react-redux";
import { setUser } from "@/Slice/userSlice";

// State Context
import { useSession } from "./ctx";

//API
import authService from "@/services/auth.service";

interface FormData {
  email: string;
  password: string;
}

interface TokenData {
  name: string;
  username: string;
  email: string;
  mobile: string;
}

export default function Login() {
  const { top } = useSafeAreaInsets();
  const { signIn } = useSession();
  const windowHeight = useWindowDimensions().height;
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);

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

  const decodeToken = (token: string) => {
    try {
      const decodedToken: TokenData = jwtDecode(token);

      const { name, username, email, mobile } = decodedToken;

      dispatch(
        setUser({
          name,
          username,
          email,
          mobile,
        })
      );
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  const onSubmit = async (data: FormData) => {
    const email = data.email;
    const password = data.password;

    try {
      const response = await authService.login(email, password);

      if (response.status === 200) {
        signIn();
        decodeToken(response.data.token);
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
        className="flex-1 justify-center items-center flex flex-col gap-10"
        // style={{ paddingTop: top, minHeight: Math.round(windowHeight) }}
        style={{ paddingTop: top }}
      >
        <View>
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
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    theme={{ roundness: 50 }}
                    activeOutlineColor="#1bcf9a"
                    outlineStyle={{ backgroundColor: "white" }}
                    contentStyle={{ color: "black" }}
                    placeholder="Email"
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
                    placeholder="Password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    theme={{ roundness: 50 }}
                    activeOutlineColor="#1bcf9a"
                    secureTextEntry={!passwordVisible}
                    outlineStyle={{ backgroundColor: "white" }}
                    contentStyle={{ color: "black" }}
                    right={
                      passwordVisible ? (
                        <TextInput.Icon
                          icon="eye"
                          onPress={() => setPasswordVisible(false)}
                        />
                      ) : (
                        <TextInput.Icon
                          icon="eye-off"
                          onPress={() => setPasswordVisible(true)}
                        />
                      )
                    }
                  />
                )}
                name="password"
              />
              {errors.password && (
                <Text className="text-sm text-red-600 italic">
                  This field is required.
                </Text>
              )}

              {/* <Text className="italic self-end font-['Poppins-Regular'] underline text-blue-600">
                Forgot password ?
              </Text> */}
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
