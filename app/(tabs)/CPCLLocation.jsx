import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../constants/images";

const CPCLLocation = () => {
  const navigation = useNavigation();
  const locations = [
    {
      title: "Corporate and Registered Office",
      address: "#536, Anna Salai, Teyanampet",
      city: "Chennai - 600018",
      telephone: "EPABX-24340181",
      fax: "-",
    },
    {
      title: "Refineries and Administrative Office",
      address: "Manali",
      city: "Chennai - 600068",
      telephone: "EPABX-25940000-9",
      fax: "-",
    },
    {
      title: "Cauvery Basin Refinery",
      address: "Panangudi, Nagapattinam Taluk",
      city: "Nagapattinam - 611002",
      telephone: "(04365)256416",
      fax: "-",
    },
    {
      title: "Refineries and Administrative Office",
      address: "Manali",
      city: "Chennai - 600068",
      telephone: "EPABX-25940000-9",
      fax: "-",
    },
  ];

  return (
    <ScrollView className="bg-[#F2F2F2] flex-1">
      {/* Header */}
      <View className="flex-row justify-between items-center p-6 bg-white">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-back" size={24} className="text-black" />
        </TouchableOpacity>
        <Text className="text-[#2563eb] text-2xl font-bold ">
          CPCL Location
        </Text>
        <Image source={images.smallLogo} className="w-10 h-10" />
      </View>
      {/* Location Items */}
      <View className="p-5">
        {locations.map((location, index) => (
          <View key={index} className="bg-white p-4 mb-4 shadow-md ">
            <Text className="text-[#2563eb] text-2xl font-extrabold mb-4">
              {location.title}
            </Text>
            <Text className="text-gray-700 text-lg">
              <Text className="font-bold text-lg">Address: </Text>
              {location.address}
            </Text>
            <Text className="text-gray-700 text-lg">
              <Text className="font-bold text-lg">City: </Text>
              {location.city}
            </Text>
            <Text className="text-gray-700 text-lg">
              <Text className="font-bold">Telephone: </Text>
              {location.telephone}
            </Text>
            <Text className="text-gray-700 text-lg">
              <Text className="font-bold text-lg">Fax: </Text>
              {location.fax}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CPCLLocation;
