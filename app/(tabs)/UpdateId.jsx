import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { images } from "../../constants/images";

export default function UpdateIDCard() {
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
    designation: "",
    dateOfBirth: "",
    address: "",
    photo: null,
  });
  const [selectedRole, setSelectedRole] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://192.168.4.56:3000/profile/${prno}`);
        const result = await response.json();
        if (response.ok) {
          setFormData(result.data);
        } else {
          console.error(result.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [prno]);

  const showDateofBirthPicker = () => {
    DateTimePickerAndroid.open({
      value: startDate,
      onChange: onDateChange,
      mode: "date",
      is24Hour: true,
    });
  };

  const onDateChange = (event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate || startDate;
      setStartDate(currentDate);
      handleInputChange("dateOfBirth", currentDate.toLocaleDateString()); // Update dateOfBirth in formData
    } else {
      Alert.alert("Date Picker", "Date selection was canceled");
    }
  };

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, department: value });
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
    });

    if (!result.canceled) {
      setFormData({ ...formData, photo: result.assets[0] });
    }
  };

  const handleChangeImage = () => {
    handleFileChange();
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, photo: null });
  };

  const handleSubmit = async () => {
    
  };
  
  
  
  

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
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
              onChangeText={(value) => handleInputChange("name", value)}
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
              onChangeText={(value) => handleInputChange("email", value)}
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
              onChangeText={(value) => handleInputChange("phone", value)}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Department Field */}
        <View className="bg-blue-50 rounded-lg p-4 mb-4">
          <Text className="text-xl font-bold text-blue-600 mb-2">
            Department :
          </Text>
          <View className="bg-white rounded-lg">
            <Picker
              selectedValue={formData.department}
              onValueChange={handleSelectChange}
              className="bg-white rounded-lg"
            >
              <Picker.Item label="Select Department" value="" />
              {departments.map((department, index) => (
                <Picker.Item
                  key={index}
                  label={department}
                  value={department}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* Role Field */}
        <View className="bg-blue-50 rounded-lg p-4 mb-4">
          <Text className="text-xl font-bold text-blue-600 mb-2">Role :</Text>
          <View className="bg-white rounded-lg">
            <Picker
              selectedValue={selectedRole}
              onValueChange={(itemValue) => setSelectedRole(itemValue)}
              className="bg-white rounded-lg"
            >
              <Picker.Item label="Select Role" value="" />
              {roles.map((role, index) => (
                <Picker.Item key={index} label={role} value={role} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Date of Birth Field */}
        <View className="bg-blue-50 rounded-lg p-4 mb-4">
          <Text className="text-xl font-bold text-blue-600 mb-2">
            Date of Birth :
          </Text>
          <TouchableOpacity onPress={showDateofBirthPicker}>
            <View className="flex-row items-center bg-white rounded-lg p-2">
              <Icon
                name="calendar-today"
                className="text-blue-600 mx-4"
                size={24}
              />
              <Text className="flex-1 p-2 pl-4">
                {formData.dateOfBirth || "Select your date of birth"}
              </Text>
            </View>
          </TouchableOpacity>
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
              onChangeText={(value) => handleInputChange("address", value)}
            />
          </View>
        </View>

        {/* Photo Upload Section */}
        <View className="bg-blue-50 rounded-lg p-4 mb-4">
          <Text className="text-xl font-bold text-blue-600 mb-2">Photo :</Text>
          <TouchableOpacity onPress={handleChangeImage}>
            {formData.photo ? (
              <Image
                source={{ uri: formData.photo.uri }}
                className="w-full h-48 rounded-lg mb-2"
              />
            ) : (
              <View className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                <Text className="text-gray-600">Upload Photo</Text>
              </View>
            )}
          </TouchableOpacity>
          {formData.photo && (
            <View className="mt-2 flex-row justify-between items-center w-full">
              <TouchableOpacity
                onPress={handleChangeImage}
                className="flex-row items-center"
              >
                <Icon name="edit" size={20} className="text-blue-600 mr-2" />
                <Text className="text-blue-600">Edit Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleRemoveImage}
                className="flex-row items-center"
              >
                <Icon name="delete" size={20} className="text-red-600 mr-2" />
                <Text className="text-red-600">Remove </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-blue-600 p-4 rounded-lg mb-10"
        >
          <Text className="text-white text-center text-xl font-bold">
            Update ID Card
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
