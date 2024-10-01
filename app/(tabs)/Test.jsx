import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../constants/images";
import { Picker } from "@react-native-picker/picker";

const UpdateIdCard = () => {
  const navigation = useNavigation();

  const departments = [
    "Engineering",
    "Human Resources",
    "Finance",
    "IT",
    "Fire Services",
    "Marketing",
    "Sales",
    "Research and Development",
    "Legal",
    "Quality Control",
    "Security",
    "Health and Safety",
    "Training and Development",
  ];

  const roles = ["Admin", "Staff", "Intern", "Hr", "Manager", "Developer"];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    dob: "",
    address: "",
    photo: null,
    role: "",
  });

  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Alert.alert("Error", "No token found, please log in again.");
        navigation.navigate("Login");
      }
    };

    checkToken();
  }, [navigation]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (event.type === "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);

      // Format the selected date to YYYY-MM-DD
      const formattedDate = currentDate.toISOString().split("T")[0];
      handleChange("dob", formattedDate);
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const handleFileChange = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Camera permission is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // Enable base64
    });

    if (!result.canceled) {
      // Update only the photo URI or base64 value
      setFormData({ ...formData, photo: result.assets[0].base64 });
    }
  };

  const handleChangeImage = () => {
    handleFileChange();
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, photo: null }); // Set to null when removed
  };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem("userToken");

    if (!token) {
      Alert.alert("Error", "No token found, please log in again.");
      return;
    }

    // Validate the DOB format
    if (!formData.dob) {
      Alert.alert("Error", "Please select a valid date of birth.");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("phone", formData.phone);
    formDataToSubmit.append("department", formData.department);
    formDataToSubmit.append("dob", formData.dob);
    formDataToSubmit.append("address", formData.address);
    formDataToSubmit.append("role", formData.role);

    // Only append the photo if it exists
    if (formData.photo) {
      formDataToSubmit.append(
        "photo",
        `data:image/jpeg;base64,${formData.photo}`
      );
    }

    try {
      const response = await axios.put(
        "http://192.168.249.56:3000/update-id-card",
        formDataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set content type for FormData
          },
        }
      );

      Alert.alert("Success", response.data.data);

      // Navigate to the profile screen after successful update
      navigation.navigate("Profile");
    } catch (error) {
      console.error("Error updating ID card:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "An error occurred while updating."
      );
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row justify-between items-center p-6 bg-blue-700">
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Icon name="arrow-back" size={24} className="text-white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">Update ID Card</Text>
        <Image source={images.smallLogo} className="w-10 h-10" />
      </View>

      <ScrollView className="p-5">
        <View className="bg-blue-50 rounded-lg p-4 mb-6 flex flex-col items-center">
          <View className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
            <Icon name="person" size={70} className="text-white" />
          </View>
          <Text className="text-2xl font-bold mb-1 text-blue-600">
            ID Card Information
          </Text>
        </View>

        {/* Name Field */}
        <View className="bg-blue-50 rounded-lg p-4 mb-4">
          <Text className="text-xl font-bold text-blue-600 mb-2">Name :</Text>
          <View className="flex-row items-center bg-white rounded-lg">
            <Icon name="person" className="text-blue-600 mx-4" size={24} />
            <View className="bg-slate-200 h-[60%] w-px" />
            <TextInput
              className="flex-1 p-2 pl-4"
              placeholder="Enter your full name"
              value={formData.name}
              onChangeText={(value) => handleChange("name", value)}
            />
          </View>
        </View>

        {/* Email Field */}
        <View className="bg-blue-50 rounded-lg p-4 mb-4">
          <Text className="text-xl font-bold text-blue-600 mb-2">
            Email ID :
          </Text>
          <View className="flex-row items-center bg-white rounded-lg">
            <Icon name="email" className="text-blue-600 mx-4" size={24} />
            <View className="bg-slate-200 h-[60%] w-px" />
            <TextInput
              className="flex-1 p-2 pl-4"
              placeholder="Enter your email ID"
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
              keyboardType="email-address"
            />
          </View>
        </View>

        {/* Phone Number Field */}
        <View className="bg-blue-50 rounded-lg p-4 mb-4">
          <Text className="text-xl font-bold text-blue-600 mb-2">
            Phone Number :
          </Text>
          <View className="flex-row items-center bg-white rounded-lg">
            <Icon name="phone" className="text-blue-600 mx-4" size={24} />
            <View className="bg-slate-200 h-[60%] w-px" />
            <TextInput
              className="flex-1 p-2 pl-4"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChangeText={(value) => handleChange("phone", value)}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Date of Birth Field */}
        <View className="bg-blue-50 rounded-lg p-4 mb-4">
          <Text className="text-xl font-bold text-blue-600 mb-2">
            Date of Birth :
          </Text>
          <TouchableOpacity onPress={showDatePicker}>
            <View className="flex-row items-center bg-white rounded-lg py-1">
              <Icon
                name="calendar-today"
                className="text-blue-600 mx-4"
                size={24}
              />
              <View className="bg-slate-200 h-[60%] w-px" />
              <Text className="flex-1 p-2 pl-4">
                {formData.dob || "Select your date of birth"}
              </Text>
            </View>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        {/* Department Picker */}
        <View className="bg-blue-50 rounded-lg p-4 mb-4">
          <Text className="text-xl font-bold text-blue-600 mb-2">
            Department :
          </Text>
          <Picker
            selectedValue={formData.department}
            onValueChange={(itemValue) => handleChange("department", itemValue)}
            style={{ backgroundColor: "white", borderRadius: 10 }}
          >
            <Picker.Item label="Select Department" value="" />
            {departments.map((dept, index) => (
              <Picker.Item key={index} label={dept} value={dept} />
            ))}
          </Picker>
        </View>

        {/* Role Picker */}
        <View className="bg-blue-50 rounded-lg p-4 mb-4">
          <Text className="text-xl font-bold text-blue-600 mb-2">Role :</Text>
          <Picker
            selectedValue={formData.role}
            onValueChange={(itemValue) => handleChange("role", itemValue)}
            style={{ backgroundColor: "white", borderRadius: 10 }}
          >
            <Picker.Item label="Select Role" value="" />
            {roles.map((role, index) => (
              <Picker.Item key={index} label={role} value={role} />
            ))}
          </Picker>
        </View>

        {/* Address Field */}
        <View className="bg-blue-50 rounded-lg p-4 mb-4">
          <Text className="text-xl font-bold text-blue-600 mb-2">
            Address :
          </Text>
          <View className="flex-row items-center bg-white rounded-lg">
            <Icon name="home" className="text-blue-600 mx-4" size={24} />
            <View className="bg-slate-200 h-[60%] w-px" />
            <TextInput
              className="flex-1 p-2 pl-4"
              placeholder="Enter your address"
              value={formData.address}
              onChangeText={(value) => handleChange("address", value)}
            />
          </View>
        </View>

        {/* Image Upload Section */}
        <View className="bg-blue-50 rounded-lg p-4 mb-4">
          <Text className="text-xl font-bold text-blue-600 mb-2">
            Upload Photo :
          </Text>
          <TouchableOpacity
            onPress={handleChangeImage}
            className="bg-blue-600 p-2 rounded-lg"
          >
            <Text className="text-white text-center">Choose Image</Text>
          </TouchableOpacity>
          {formData.photo && (
            <View className="mt-2">
              <Image
                source={{ uri: `data:image/jpeg;base64,${formData.photo}` }}
                className="w-32 h-32 mt-2 rounded-lg"
              />
              <TouchableOpacity onPress={handleRemoveImage}>
                <Text className="text-red-600 mt-2">Remove Image</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-blue-600 p-4 rounded-lg mb-4"
        >
          <Text className="text-white text-center text-lg font-bold">
            Update ID Card
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default UpdateIdCard;
