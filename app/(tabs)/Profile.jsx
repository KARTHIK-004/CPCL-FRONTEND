import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { images } from "../../constants/images";
import moment from "moment";

const Profile = () => {
  const navigation = useNavigation();
  const [profileDetails, setProfileDetails] = useState(null);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        if (userToken) {
          const decodedToken = jwtDecode(userToken);
          const { prno } = decodedToken;
          const response = await axios.get(
            `http://192.168.249.56:3000/profile/${prno}`
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

  return (
    <View className="bg-white flex-1">
      {/* Header */}
      <View className="flex-row justify-between items-center p-6 bg-blue-700">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-back" size={24} className="text-white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">View Profile</Text>
        <Image source={images.smallLogo} className="w-10 h-10" />
      </View>

      {/* Profile Card */}
      {profileDetails && (
        <ScrollView className="p-5  ">
          <View className="bg-blue-50 rounded-lg p-4 mb-6 flex flex-col items-center">
            <View className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
            <Image 
                source={{ uri: profileDetails.profile || "https://cdn-icons-png.flaticon.com/512/149/149071.png" }} 
                className="w-full h-full rounded-full" 
              />
            </View>
            <Text className="text-2xl font-bold mb-1 text-blue-600">
              {profileDetails.name}
            </Text>
            <Text className="text-gray-600 mb-2">{profileDetails.role}</Text>
            <Text className="text-sm bg-blue-600 text-white px-3 py-1 rounded-full">
              Employee ID: {profileDetails.prno}
            </Text>
          </View>
          <View className="bg-blue-50 rounded-lg p-4 mb-6">
            <Text className="text-xl font-bold mb-4 text-blue-600">
              Profile Information
            </Text>
            <View className="space-y-4">
              {[
                {
                  icon: "business",
                  label: "Department",
                  value: profileDetails.department,
                },
                {
                  icon: "email",
                  label: "Email",
                  value: profileDetails.email,
                },
                {
                  icon: "cake",
                  label: "Date of Birth",
                  value: moment(profileDetails.dob).format("DD-MM-YYYY"),
                },
                {
                  icon: "calendar-today",
                  label: "Joining Date",
                  value: moment(profileDetails.createdAt).format("DD-MM-YYYY"),
                },
              ].map(({ icon, label, value }, index) => (
                <View key={index} className="flex flex-row items-center">
                  <Icon name={icon} size={24} className="text-blue-600 mr-3" />
                  <View>
                    <Text className="text-gray-600 text-sm">{label}</Text>
                    <Text className="text-gray-800">{value}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View>
            <View className="flex flex-row items-center justify-between mb-4">
              <Text className="text-xl font-semibold text-blue-600">
                Quick Actions
              </Text>
            </View>

            <View className="flex flex-row justify-between gap-4">
              {[
                { icon: "badge", label: "Update ID Card" },
                { icon: "person-add", label: "Request Leave" },
              ].map(({ icon, label }, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    if (label === "Request Leave") {
                      navigation.navigate("LeaveRequest");
                    }
                    if (label === "Update ID Card") {
                      navigation.navigate("Test");
                    }
                  }}
                  className="bg-blue-50 text-white p-4 rounded-lg flex flex-col items-center justify-center transition-colors w-[45%]"
                >
                  <Icon name={icon} size={24} className="mb-2 text-blue-600" />
                  <Text className="text-sm text-center text-blue-600">
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Profile;
