import React from "react";
import { View } from "react-native";
import { Link } from "expo-router";

const index = () => {
  return (
    <View className="flex-1 items-center justify-center bg-[#F2F2F2]">
      <Link
        href="/Home"
        className="text-3xl bg-blue-200 rounded-full p-4 px-10 m-10"
      >
        Home
      </Link>
      <Link
        href="/sign-in"
        className="text-3xl bg-blue-200 rounded-full p-4 px-10"
      >
        Sign In
      </Link>
    </View>
  );
};

export default index;
