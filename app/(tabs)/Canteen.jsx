import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../constants/images";

const Canteen = () => {
  const navigation = useNavigation();

  // Function to get today's date in dd/mm/yyyy format
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Add leading zero if needed
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const menuItems = [
    {
      title: "MID NIGHT TIFFIN & COFFEE",
      time: "2:30HRS",
      items: [
        "06 - IDLY",
        "11 - POORIE",
        "CARROT SAMBAR, POTATO ONION MASALA",
        "FRIED GRAM CHUTNEY",
        "15 - COFFEE",
      ],
    },
    {
      title: "MORNING TIFFIN & COFFEE",
      time: "6:30HRS",
      items: [
        "08 - SAMAI PONGAL",
        "14 - MEDHU VADAI",
        "BRINJAL KOSTHU",
        "24 - BOILED EGG",
        "COCONUT CHUTNEY",
        "15 - COFFEE",
      ],
    },
    {
      title: "LUNCH MENU",
      time: "12:30HRS",
      items: [
        "09 - RICE",
        "21 - SAMBAR",
        "12 - CARROT PORIYAL",
        "19 - PAPAD",
        "25 - CURD",
        "16 - PICKLE",
      ],
    },
    {
      title: "EVENING SNACKS & TEA",
      time: "16:00HRS",
      items: [
        "11 - MASALA DOSA",
        "18 - CHUTNEY PODI",
        "27 - SWEET PONGAL",
        "22 - FILTER COFFEE",
        "17 - TEA",
      ],
    },
    {
      title: "DINNER",
      time: "20:00HRS",
      items: [
        "05 - CHAPPATHI",
        "06 - DAL TADKA",
        "10 - VEGETABLE KURMA",
        "20 - ALOO BHINDI FRY",
        "26 - RICE",
        "23 - CURD RICE",
      ],
    },
    {
      title: "BREAKFAST",
      time: "7:30HRS",
      items: [
        "02 - IDLI",
        "13 - SAMBAR",
        "03 - COCONUT CHUTNEY",
        "04 - KESARI",
        "14 - COFFEE",
      ],
    },
    {
      title: "BRUNCH",
      time: "10:30HRS",
      items: [
        "07 - UPPMA",
        "12 - TOMATO CHUTNEY",
        "09 - SEMIYA PAYASAM",
        "16 - BANANA",
        "15 - COFFEE",
      ],
    },
  ];

  return (
    <ScrollView className="bg-[#F2F2F2] flex-1">
      {/* Header */}
      <View className="flex-row justify-between items-center p-6 bg-white">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-back" size={24} className="text-black" />
        </TouchableOpacity>

        <Text className="text-[#2563eb] text-2xl font-bold ">Canteen Menu</Text>
        <Image source={images.smallLogo} className="w-10 h-10" />
      </View>

      {/* Canteen Menu  */}
      <View className="p-4">
        <Text className="text-xl font-bold text-[#2563eb] text-center mb-4">
          Canteen Menu - {getCurrentDate()}
        </Text>

        {/* Menu Sections */}
        <View>
          {menuItems.map((menu, index) => (
            <View key={index} className="mb-6">
              <View className="bg-white p-4">
                <View className="bg-[#2563eb] p-4 rounded-lg">
                  <Text className="text-white text-lg font-bold text-center">
                    {menu.title}
                  </Text>
                  <Text className="text-white text-center">{menu.time}</Text>
                </View>
                <View className="pt-4 px-4">
                  {menu.items.map((item, idex) => (
                    <Text key={idex} className="text-gray-700 font-bold mb-1">
                      {item}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Canteen;
