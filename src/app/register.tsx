import { View, Text, Image, useWindowDimensions } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import spendcast from "../assets/img/spendcast.png";

// State Context
import { useSession } from "./ctx";

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
}

export default function register() {
  const { top } = useSafeAreaInsets();
  const { signIn } = useSession();
  const windowHeight = useWindowDimensions().height;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
    },
  });
  const onSubmit = (data: FormData) => {
    const name = data.name;
    const email = data.email;
    const phone = data.phone;
    const password = data.password;
    const confirm_password = data.confirm_password;

    //REGISTER LOGIC HERE
    console.log(data);
  };

  return (
    <View
      className="flex-1 justify-center items-center"
      style={{ paddingTop: top, minHeight: Math.round(windowHeight) }}
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
                  label="Name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  theme={{ roundness: 50 }}
                  activeOutlineColor="#1bcf9a"
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
                  label="Email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  theme={{ roundness: 50 }}
                  activeOutlineColor="#1bcf9a"
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
                  label="Phone"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  theme={{ roundness: 50 }}
                  activeOutlineColor="#1bcf9a"
                />
              )}
              name="phone"
            />
            {errors.phone && (
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
                  label="Confirm Password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  theme={{ roundness: 50 }}
                  activeOutlineColor="#1bcf9a"
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
            labelStyle={{ fontSize: 16 }}
          >
            register
          </Button>
        </View>
        <Text className="font-['Poppins-Regular'] italic">
          <Text>Already have an account? </Text>
          <Text
            className="underline text-blue-600"
            onPress={() => router.replace("/login")}
          >
            Log in
          </Text>
        </Text>
      </View>
    </View>
  );
}
