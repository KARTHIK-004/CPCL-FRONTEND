import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Home = () => {
  const navigation = useNavigation();

  const menuItems = [
    { id: 1, label: "Employee Directory", icon: "person", screen: "EmployeeDirectory" },
    { id: 2, label: "Canteen Menu", icon: "restaurant", screen: "Canteen" },
    { id: 3, label: "Employee LOP", icon: "description", screen: "EmployeeLOP" },
    { id: 4, label: "Employee Time In Out", icon: "access-time", screen: "EmployeeTimeInOut" },
    { id: 5, label: "Holiday Details", icon: "celebration", screen: "HolidayDetails" },
    { id: 6, label: "CPCL Telephone Directory", icon: "phone", screen: "CPCLTelephoneDirectory" },
    { id: 7, label: "CPCL Location", icon: "location-pin", screen: "CPCLLocation" },
  ];

  // Logout Function
  const handleLogout = async () => {
    try {
      // Remove the userToken or any session info from AsyncStorage
      await AsyncStorage.removeItem('userToken');
      Alert.alert("Success", "You have been logged out.");

      // Navigate to the Sign-In screen after logout
      navigation.navigate("sign-in");
    } catch (error) {
      Alert.alert("Error", "An error occurred while logging out.");
      console.error("Logout Error: ", error);
    }
  };

  return (
    <ScrollView className="bg-[#F2F2F2] flex-1">
      {/* Header */}
      <View className="flex-row justify-between items-center p-8 bg-white">
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Icon name="person" size={24} color="#2563eb" />
        </TouchableOpacity>

        <Text className="text-[#2563eb] text-lg font-bold">CPCL eServe Dashboard</Text>

        {/* Logout Button */}
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="logout" size={24} color="#2563eb" />
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <View className="p-4">
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate(item.screen)}
            className="flex-row items-center bg-[#2563eb] py-3 px-4 my-3 rounded-sm"
          >
            <Icon name={item.icon} size={24} color="#fff" style={{ marginRight: 10 }} />
            <Text className="text-white text-lg font-bold">{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Home;
