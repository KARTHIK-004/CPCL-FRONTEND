import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../constants/images";

const HolidayDetails = () => {
  const navigation = useNavigation();

  return (
    <ScrollView className="flex-1 bg-[#F2F2F2]">
      {/* Header */}
      <View className="flex-row items-center justify-between p-6 bg-white">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-back" size={24} className="text-black" />
        </TouchableOpacity>
        <Text className="text-[#2563eb] text-2xl font-bold">Holiday Details</Text>
        <Image source={images.smallLogo} className="w-10 h-10" />
      </View>
      <View className="flex-1 justify-center items-center">
        <Image source={images.holiday} className="w-full h-auto max-w-full max-h-[80%]" resizeMode="contain" />
      </View>
    </ScrollView>
  );
};

export default HolidayDetails;
