import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  Image,
  Linking,
  BackHandler,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useRouter } from "expo-router";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Carousel from "react-native-reanimated-carousel";
import { styled } from "nativewind";

export default function Home() {
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;
  const [profileDetails, setProfileDetails] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const StyledImage = styled(Image);
  const router = useRouter();

  const images = [
    {
      uri: "https://via.placeholder.com/400x200",
      documentUrl: "https://example.com/document1.pdf",
    },
    {
      uri: "https://via.placeholder.com/400x200",
      documentUrl: "https://example.com/document2.pdf",
    },
    {
      uri: "https://via.placeholder.com/400x200",
      documentUrl: "https://example.com/document3.pdf",
    },
    {
      uri: "https://via.placeholder.com/400x200",
      documentUrl: "https://example.com/document4.pdf",
    },
    {
      uri: "https://via.placeholder.com/400x200",
      documentUrl: "https://example.com/document5.pdf",
    },
  ];

  const navItems = [
    {
      id: 1,
      label: "Employee Directory",
      icon: "person",
      screen: "EmployeeDirectory",
    },
    { id: 2, label: "Canteen Menu", icon: "restaurant", screen: "CanteenMenu" },
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
    { id: 7, label: "CPCL Retirement", icon: "person", screen: "Retirements" },
    { id: 8, label: "CPCL Birthday", icon: "cake", screen: "Birthdays" },
    {
      id: 9,
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

  const handleLogout = async () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("userToken");
              Alert.alert("Success", "You have been logged out.");
              router.push("sign-up");
            } catch (error) {
              Alert.alert("Error", "An error occurred while logging out.");
              console.error("Logout Error: ", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const openDocument = (url) => {
    Linking.openURL(url).catch((err) =>
      Alert.alert("Error", "Failed to open the document.")
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Exit Confirmation",
          "Are you sure you want to go back to sign up page?",
          [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => BackHandler.exitApp(),
            },
          ],
          { cancelable: false }
        );
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center p-8 bg-blue-600">
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
      {/* Home Page */}
      <ScrollView className="p-4">
        <View className="mb-4">
          <Text className="text-2xl font-bold text-blue-600">
            Welcome back,
            <Text className="text-red-500">{profileDetails?.name}</Text>
          </Text>

          <View className="bg-blue-50 p-4 mt-4 rounded-md">
            <Text className="text-xl font-bold text-blue-600">Daily Tips</Text>
            <View className="bg-blue-50 p-4 mt-2 rounded-md">
              <Text className="text-blue-600">
                <Text className="text-red-500">• </Text> Start your day with a
                clear plan!
              </Text>
              <Text className="text-blue-600">
                <Text className="text-red-500">• </Text> Take regular breaks to
                stay productive!
              </Text>
              <Text className="text-blue-600">
                <Text className="text-red-500">• </Text> Stay hydrated
                throughout the day!
              </Text>
            </View>

            <View className="mb-4">
              <Text className="text-xl font-bold text-blue-600">
                Safety Guidelines
              </Text>
              <View className="bg-blue-50 p-4 mt-2 rounded-md">
                <Text className="text-blue-600">
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
        {/* Carousel */}
        <View className="rounded-lg mb-2">
          <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            data={images}
            scrollAnimationDuration={1000}
            onProgressChange={(offsetProgress, absoluteProgress) => {
              const index = Math.round(absoluteProgress);
              setCurrentIndex(index);
            }}
            renderItem={({ index }) => (
              <TouchableOpacity
                className="flex-1 justify-center pr-4"
                onPress={() => openDocument(images[index].documentUrl)}
              >
                <StyledImage
                  source={{ uri: images[index].uri }}
                  className="w-full h-full rounded-lg"
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
          />

          {/* Render dots below the carousel */}
          <View className="flex-row justify-center mt-2">
            {images.map((_, index) => (
              <View
                key={index}
                className={`h-2 w-2 rounded-full mx-1 ${
                  currentIndex === index ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </View>
        </View>
        <View>
          {/* Quick Actions */}
          <Text className="text-xl font-semibold text-blue-600 mb-4">
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
                <Text className="mt-2 text-sm font-medium text-blue-600">
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
