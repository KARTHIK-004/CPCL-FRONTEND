import React from "react";
import { View } from "react-native";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <View className="flex-1 bg-slate-300">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
      </Stack>
    </View>
  );
};

export default AuthLayout;
