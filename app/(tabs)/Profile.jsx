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

  return (
    <ScrollView className="bg-[#F2F2F2] flex-1 pt">
      {/* Header */}
      <View className="flex-row justify-between items-center p-6 bg-white">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-back" size={24} className="text-black" />
        </TouchableOpacity>
        <Text className="text-[#2563eb] text-2xl font-bold">View Profile</Text>
        <Image source={images.smallLogo} className="w-10 h-10" />
      </View>

      {/* Profile Card */}
      {profileDetails && (
        <View className="bg-[#F2F2F2]">
          <View className="bg-[#2563eb] mt-6 p-3 ">
            <View className="flex items-center p-6 bg-white mx-4 my-24">
              <Image
                source={{ uri: "https://via.placeholder.com/150" }}
                className="w-52 h-52 rounded-full mb-10"
              />
              <View className="items-center font-bold">
                <Text className="font-bold text-3xl mb-2">
                  {profileDetails.name}
                </Text>
                <Text className="font-bold text-xl py-2">
                  Emp Number: {profileDetails.prno}
                </Text>
                <Text className="font-bold text-xl py-2">
                  Date Of Birth:{" "}
                  {moment(profileDetails.dob).format("YYYY-MM-DD")}
                </Text>
                <Text className="font-bold text-xl py-2">
                  Joining Date:{" "}
                  {moment(profileDetails.createdAt).format("YYYY-MM-DD")}
                </Text>
                <Text className="font-bold text-xl py-2">
                  Department: {profileDetails.department}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Profile;
