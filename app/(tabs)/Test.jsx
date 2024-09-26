import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you have the correct import for Icon
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const UpdateIdCard = () => {
  const navigation = useNavigation(); // Get navigation object
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    dob: "", // Store date of birth in the format YYYY-MM-DD
    address: "",
    photo: "",
    role: "",
  });

  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());

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
      handleChange("dob", formattedDate); // Store formatted date in state
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
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

    try {
      const response = await axios.put(
        "http://192.168.4.56:3000/update-id-card",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert("Success", response.data.data);
      
      // Navigate to the profile screen after successful update
      navigation.navigate("Profile"); // Replace "Profile" with the actual name of your profile screen
      
    } catch (error) {
      console.error("Error updating ID card:", error);
      Alert.alert("Error", error.response?.data?.data || "An error occurred while updating.");
    }
  };

  return (
    <View className="p-4">
      <Text className="font-bold text-lg mb-2">Update ID Card</Text>
      <Text>Name</Text>
      <TextInput
        value={formData.name}
        onChangeText={(value) => handleChange("name", value)}
        placeholder="Name"
        className="border border-gray-300 rounded p-2 mb-2"
      />
      <Text>Email</Text>
      <TextInput
        value={formData.email}
        onChangeText={(value) => handleChange("email", value)}
        placeholder="Email"
        className="border border-gray-300 rounded p-2 mb-2"
      />
      <Text>Phone</Text>
      <TextInput
        value={formData.phone}
        onChangeText={(value) => handleChange("phone", value)}
        placeholder="Phone"
        className="border border-gray-300 rounded p-2 mb-2"
      />
      <Text>Department</Text>
      <TextInput
        value={formData.department}
        onChangeText={(value) => handleChange("department", value)}
        placeholder="Department"
        className="border border-gray-300 rounded p-2 mb-2"
      />
      {/* Date of Birth Field */}
      <View className="bg-blue-50 rounded-lg p-4 mb-4">
        <Text className="text-xl font-bold text-blue-600 mb-2">
          Date of Birth:
        </Text>
        <TouchableOpacity onPress={showDatePicker}>
          <View className="flex-row items-center bg-white rounded-lg p-2">
            <Icon
              name="calendar-today"
              className="text-blue-600 mx-4"
              size={24}
            />
            <Text className="flex-1 p-2 pl-4">
              {formData.dob || "Select your date of birth"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Text>Address</Text>
      <TextInput
        value={formData.address}
        onChangeText={(value) => handleChange("address", value)}
        placeholder="Address"
        className="border border-gray-300 rounded p-2 mb-2"
      />
      <Text>Photo URL</Text>
      <TextInput
        value={formData.photo}
        onChangeText={(value) => handleChange("photo", value)}
        placeholder="Photo URL"
        className="border border-gray-300 rounded p-2 mb-2"
      />
      <Text>Role</Text>
      <TextInput
        value={formData.role}
        onChangeText={(value) => handleChange("role", value)}
        placeholder="Role"
        className="border border-gray-300 rounded p-2 mb-2"
      />
      <Button title="Update ID Card" onPress={handleSubmit} />
    </View>
  );
};

export default UpdateIdCard;
