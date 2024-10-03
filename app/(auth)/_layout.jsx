import React from "react";
import { View } from "react-native";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <View className="flex-1">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Register" />
        <Stack.Screen name="Login" />
      </Stack>
    </View>
  );
};

export default AuthLayout;
