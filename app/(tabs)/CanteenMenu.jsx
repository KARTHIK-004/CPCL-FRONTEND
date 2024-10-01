import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { images } from "../../constants/images";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";

const CanteenMenu = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();

  const menuData = [
    {
      title: "Breakfast",
      time: "7:00 AM - 9:00 AM",
      items: [
        { name: "Idly", description: "Steamed rice cakes", price: "₹20" },
        { name: "Dosa", description: "Crispy rice pancake", price: "₹30" },
        {
          name: "Pongal",
          description: "Rice and lentil porridge",
          price: "₹25",
        },
        { name: "Coffee", description: "Filter coffee", price: "₹15" },
      ],
    },
    {
      title: "Lunch",
      time: "12:00 PM - 2:00 PM",
      items: [
        {
          name: "Meals",
          description: "Rice, sambar, rasam, vegetables, and curd",
          price: "₹60",
        },
        {
          name: "Chapati Kurma",
          description: "Wheat flatbread with vegetable curry",
          price: "₹50",
        },
        {
          name: "Veg Biryani",
          description: "Fragrant rice dish with vegetables",
          price: "₹70",
        },
        { name: "Fresh Lime Soda", price: "₹20" },
      ],
    },
    {
      title: "Evening Snacks",
      time: "4:00 PM - 5:30 PM",
      items: [
        {
          name: "Samosa",
          description: "Crispy pastry with savory filling",
          price: "₹15",
        },
        { name: "Vada", description: "Savory doughnut", price: "₹10" },
        { name: "Tea", price: "₹10" },
        { name: "Biscuits", description: "Assorted varieties", price: "₹5" },
      ],
    },
  ];

  const onDateChange = () => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row justify-between items-center p-6 bg-blue-600">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text className="text-white text-2xl font-bold ">Canteen Menu</Text>
        <Image source={images.smallLogo} className="w-10 h-10" />
      </View>
      <ScrollView className="flex-1 px-4 py-8">
        <View className="bg-white shadow-lg overflow-hidden">
          <View className="bg-blue-600 p-6 flex-row justify-between items-center rounded-lg">
            <Text className="text-xl font-semibold text-white">Food Menu</Text>
            <TouchableOpacity
              className="flex-row items-center space-x-2"
              onPress={() => setShowDatePicker(true)}
            >
              <Icon name="calendar-today" size={20} color="white" />
              <Text className="text-white">
                {selectedDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="pt-6 px-2">
            {menuData.map((mealTime, index) => (
              <View key={index} className="mb-8 last:mb-0">
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="text-lg font-semibold text-blue-600">
                    {mealTime.title}
                  </Text>
                  <View className="flex-row items-center">
                    <Icon name="schedule" size={20} color="#4B5563" />
                    <Text className="ml-1 text-gray-600">{mealTime.time}</Text>
                  </View>
                </View>
                <View className="bg-blue-50 rounded-lg p-4">
                  {mealTime.items.map((item, itemIndex) => (
                    <View
                      key={itemIndex}
                      className="flex-row justify-between items-start mb-3 last:mb-0"
                    >
                      <View>
                        <Text className="font-semibold text-blue-600">
                          {item.name}
                        </Text>
                        {item.description && (
                          <Text className="text-sm text-gray-600">
                            {item.description}
                          </Text>
                        )}
                      </View>
                      <Text className="text-blue-600 font-medium">
                        {item.price}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

export default CanteenMenu;
