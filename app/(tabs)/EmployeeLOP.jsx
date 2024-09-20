import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../constants/images";

const EmployeeLOP = () => {
  const navigation = useNavigation();

  return (
    <ScrollView className="bg-[#F2F2F2] flex-1">
      {/* Header */}
      <View className="flex-row justify-between items-center p-6 bg-white">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-back" size={24} className="text-black" />
        </TouchableOpacity>
        <Text className="text-[#2563eb] text-2xl font-bold ">Employee LOP</Text>
        <Image source={images.smallLogo} className="w-10 h-10" />
      </View>
      {}
    </ScrollView>
  );
};

export default EmployeeLOP;
