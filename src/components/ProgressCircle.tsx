import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

//redux
import { IRootState } from "store";
import { useSelector, useDispatch } from "react-redux";

export default function ProgressCircle() {
  const savings = useSelector((state: IRootState) => state.user.balance);
  const expenses = useSelector((state: IRootState) => state.user.expenses);

  const income = savings + expenses;
  const remaining = income - expenses;

  const fill = Math.round((expenses / income) * 100);

  return (
    <View className="size-full flex justify-center items-center">
      <AnimatedCircularProgress
        size={200}
        width={8}
        fill={fill}
        tintColor="#00bfa5"
        backgroundColor="#eeee"
      >
        {(fill) => (
          <View className="bg-[#00bfa5] size-[90%] rounded-full flex justify-center items-center gap-2">
            <Text className="text-white font-semibold text-3xl">
              {((expenses / income) * 100).toFixed(2)}%
            </Text>
            <Text className="text-white">
              <Text className={remaining < 0 ? "text-red-600" : ""}>
                {remaining.toLocaleString()}
              </Text>{" "}
              of {income.toLocaleString()}
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
}
