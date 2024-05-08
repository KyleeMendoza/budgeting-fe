import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSession } from "../../ctx";
import Ionicons from "@expo/vector-icons/Ionicons";

//redux
import { IRootState } from "store";
import { useSelector } from "react-redux";

export default function profile() {
  const { signOut } = useSession();
  const { top } = useSafeAreaInsets();

  const name = useSelector((state: IRootState) => state.user.name);
  const mobile = useSelector((state: IRootState) => state.user.mobile);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: top,
      }}
    >
      <ScrollView>
        <View className="main-container size-full flex items-center p-5 gap-8 bg-background">
          <View className="w-full gap-4">
            <Text className="font-['Poppins-Bold'] text-xl">Profile</Text>
          </View>
          <View className="details-container w-full flex flex-row justify-between items-center gap-4">
            <View className="avatar-container size-32 rounded-full border-2 border-['#00bfa5']"></View>
            <View className="flex-1">
              <Text className="font-bold font-['Poppins-Bold'] text-xl">
                {name}
              </Text>
              <Text className="p-1">{mobile}</Text>
            </View>
          </View>
          <View className="w-full">
            <TouchableOpacity className="w-full flex flex-row items-center rounded-lg p-4 gap-5">
              <Ionicons size={28} name="wallet" color="#00bfa5" />
              <Text className="font-['Poppins-Regular'] text-lg">Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-full flex flex-row items-center rounded-lg p-4 gap-5">
              <Ionicons name="pricetag" size={24} color="#00bfa5" />
              <Text className="font-['Poppins-Regular'] text-lg">
                Promotions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-full flex flex-row items-center rounded-lg p-4 gap-5">
              <Ionicons name="settings" size={24} color="#00bfa5" />
              <Text className="font-['Poppins-Regular'] text-lg">Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-full flex flex-row items-center rounded-lg p-4 gap-5"
              onPress={() => signOut()}
            >
              <Ionicons name="log-out" size={24} color="red" />
              <Text className="font-['Poppins-Regular'] text-lg text-red-600">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
