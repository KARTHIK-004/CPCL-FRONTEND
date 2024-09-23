import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const navigation = useNavigation();
  const [profileDetails, setProfileDetails] = useState(null);

  const navItems = [
    {
      id: 1,
      label: "Employee Directory",
      icon: "person",
      screen: "EmployeeDirectory",
    },
    { id: 2, label: "Canteen Menu", icon: "restaurant", screen: "Canteen" },
    {
      id: 3,
      label: "Employee LOP",
      icon: "description",
      screen: "EmployeeLOP",
    },
    {
      id: 4,
      label: "Employee Time In Out",
      icon: "access-time",
      screen: "EmployeeTimeInOut",
    },
    {
      id: 5,
      label: "Holiday Details",
      icon: "celebration",
      screen: "HolidayDetails",
    },
    {
      id: 6,
      label: "CPCL Telephone Directory",
      icon: "phone",
      screen: "CPCLTelephoneDirectory",
    },
    {
      id: 7,
      label: "CPCL Location",
      icon: "location-pin",
      screen: "CPCLLocation",
    },
  ];

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        if (userToken) {
          const decodedToken = jwtDecode(userToken);
          const { prno } = decodedToken;

          const response = await axios.get(
            `http://192.168.56.56:3000/profile/${prno}`
          );
          if (response.status === 200) {
            setProfileDetails(response.data.data);
          }
        } else {
          Alert.alert("Error", "User token not found.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        Alert.alert("Error", "Failed to fetch profile details.");
      }
    };

    fetchProfileDetails();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      Alert.alert("Success", "You have been logged out.");
      navigation.navigate("SignIn");
    } catch (error) {
      Alert.alert("Error", "An error occurred while logging out.");
      console.error("Logout Error: ", error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row justify-between items-center p-8 bg-[#2563eb]">
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Icon name="person" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">
          CPCL eServe Dashboard
        </Text>
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="logout" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView className="p-4">
        <View className="mb-4">
          <Text className="text-2xl font-bold text-blue-700">
            Welcome back,{" "}
            <Text className="text-red-500">{profileDetails?.name}</Text>
          </Text>
          <View className="bg-blue-50 p-4 mt-4 rounded-md">
            <Text className="text-xl font-bold text-blue-700">Daily Tips</Text>
            <View className="bg-blue-50 p-4 mt-2 rounded-md">
              <Text className="text-blue-700">
                <Text className="text-red-500">• </Text> Start your day with a
                clear plan!
              </Text>
              <Text className="text-blue-700">
                <Text className="text-red-500">• </Text> Take regular breaks to
                stay productive!
              </Text>
              <Text className="text-blue-700">
                <Text className="text-red-500">• </Text> Stay hydrated
                throughout the day!
              </Text>
            </View>

            <View className="mb-4">
              <Text className="text-xl font-bold text-blue-700">
                Safety Guidelines
              </Text>
              <View className="bg-blue-50 p-4 mt-2 rounded-md">
                <Text className="text-blue-700">
                  <Text className="text-red-500">• </Text> Report any safety
                  hazards immediately.
                </Text>
                <Text className="text-blue-700">
                  <Text className="text-red-500">• </Text> Follow emergency
                  protocol during any emergency.
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          <Text className="text-xl font-semibold text-blue-700 mb-4">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap">
            {navItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="bg-blue-50 rounded-lg p-4 w-[45%] mb-4 flex items-center mx-2"
                onPress={() => navigation.navigate(item.screen)}
              >
                <Icon name={item.icon} size={32} color="#2563eb" />
                <Text className="mt-2 text-sm font-medium text-blue-700">
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
