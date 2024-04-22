import React from "react";
import { View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function ProgressCircle() {
  const income = 40000;
  const expense = 25000;
  const remaining = income - expense;

  const fill = Math.round((expense / income) * 100);

  return (
    <View className="size-full flex justify-center items-center">
      <AnimatedCircularProgress
        size={200}
        width={8}
        fill={fill}
        tintColor="#00bfa5"
        onAnimationComplete={() => console.log("fill: ", fill)}
        backgroundColor="#eeee"
      >
        {(fill) => (
          <View className="bg-[#00bfa5] size-[90%] rounded-full flex justify-center items-center gap-2">
            <Text className="text-white font-semibold text-3xl">
              {((expense / income) * 100).toFixed(2)}%
            </Text>
            <Text>
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
