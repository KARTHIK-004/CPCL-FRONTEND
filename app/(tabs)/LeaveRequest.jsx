import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Linking,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../constants/images";

const LeaveRequest = () => {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [formData, setFormData] = useState({
    name: "",
    empId: "",
    email: "",
    phoneNumber: "",
    managerName: "",
    managerEmail: "",
    leaveType: "",
    reason: "",
  });

  const handleStartDateChange = (event, selectedDate) => {
    if (selectedDate) setStartDate(selectedDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    if (selectedDate) setEndDate(selectedDate);
  };

  const showStartDatePicker = () => {
    DateTimePickerAndroid.open({
      value: startDate,
      onChange: handleStartDateChange,
      mode: "date",
    });
  };

  const showEndDatePicker = () => {
    DateTimePickerAndroid.open({
      value: endDate,
      onChange: handleEndDateChange,
      mode: "date",
    });
  };

  const sendEmail = () => {
    if (!formData.managerEmail) {
      Alert.alert("Error", "Please enter the manager's email.");
      return;
    }

    const subject = `Leave Request from ${formData.name}`;
    const body = `
      Employee ID: ${formData.empId}
      Phone: ${formData.phoneNumber}
      Leave Type: ${formData.leaveType}
      Start Date: ${startDate.toLocaleDateString()}
      End Date: ${endDate.toLocaleDateString()}
      Reason: ${formData.reason}
    `;

    const mailUrl = `mailto:${
      formData.managerEmail
    }?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailUrl).catch(() =>
      Alert.alert("Error", "Unable to send email.")
    );
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    // Validate form data
    if (
      !formData.name ||
      !formData.empId ||
      !formData.managerEmail ||
      !formData.leaveType ||
      !formData.reason
    ) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    sendEmail();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center p-6 bg-blue-700">
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">Request Leave</Text>
        <Image source={images.smallLogo} className="w-10 h-10" />
      </View>

      <ScrollView className="p-5">
        {/* Form Fields */}
        {/* Name Field */}
        <View className="bg-blue-50 rounded-lg p-4 mb-4">
          <Text className="text-xl font-bold text-blue-600 mb-2">Name :</Text>
          <View className="flex-row items-center bg-white rounded-lg">
            <Icon
              name="person"
              color="#2563eb"
              style={{ marginHorizontal: 10 }}
              size={24}
            />
            <View className="bg-slate-200 h-[60%] w-px" />
            <TextInput
              className="flex-1 p-2 pl-4"
              placeholder="Enter your name"
              value={formData.name}
              onChangeText={(value) => handleChange("name", value)}
            />
          </View>
        </View>
        {/* Employee ID Field */}
        <View className="bg-blue-50 rounded-lg p-4 mb-4">
          <Text className="text-xl font-bold text-blue-600 mb-2">
            Employee ID :
          </Text>
          <View className="flex-row items-center bg-white rounded-lg">
            <Icon
              name="account-circle"
              color="#2563eb"
              style={{ marginHorizontal: 10 }}
              size={24}
            />
            <View className="bg-slate-200 h-[60%] w-px" />
            <TextInput
              className="flex-1 p-2 pl-4"
              placeholder="Enter your employee ID"
              value={formData.empId}
              onChangeText={(value) => handleChange("empId", value)}
            />
          </View>
        </View>
        {/* Phone Number Field */}
        <View className="bg-blue-50 rounded-lg p-4 mb-4">
          <Text className="text-xl font-bold text-blue-600 mb-2">
            Phone Number :
          </Text>
          <View className="flex-row items-center bg-white rounded-lg">
            <Icon
              name="phone"
              color="#2563eb"
              style={{ marginHorizontal: 10 }}
              size={24}
            />
            <View className="bg-slate-200 h-[60%] w-px" />
            <TextInput
              className="flex-1 p-2 pl-4"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChangeText={(value) => handleChange("phoneNumber", value)}
              keyboardType="phone-pad"
            />
          </View>
        </View>
        {/* Manager Name Field */}
        <View className="bg-blue-50 rounded-lg p-4 mb-4">
          <Text className="text-xl font-bold text-blue-600 mb-2">
            Manager Name :
          </Text>
          <View className="flex-row items-center bg-white rounded-lg">
            <Icon
              name="person"
              color="#2563eb"
              style={{ marginHorizontal: 10 }}
              size={24}
            />
            <View className="bg-slate-200 h-[60%] w-px" />
            <TextInput
              className="flex-1 p-2 pl-4"
              placeholder="Enter your manager's name"
              value={formData.managerName}
              onChangeText={(value) => handleChange("managerName", value)}
            />
          </View>
        </View>
        {/* Manager Email Field */}
        <View className="bg-blue-50 rounded-lg p-4 mb-4">
          <Text className="text-xl font-bold text-blue-600 mb-2">
            Manager Email :
          </Text>
          <View className="flex-row items-center bg-white rounded-lg">
            <Icon
              name="email"
              color="#2563eb"
              style={{ marginHorizontal: 10 }}
              size={24}
            />
            <View className="bg-slate-200 h-[60%] w-px" />
            <TextInput
              className="flex-1 p-2 pl-4"
              placeholder="Enter your manager's email"
              value={formData.managerEmail}
              onChangeText={(value) => handleChange("managerEmail", value)}
              keyboardType="email-address"
            />
          </View>
        </View>
        <View className="bg-blue-50 rounded-lg p-4 mb-4">
          <Text className="text-xl font-bold text-blue-600 mb-2">
            Leave Type :
          </Text>
          <View className="bg-white rounded-lg">
            <Picker
              selectedValue={formData.leaveType}
              onValueChange={(itemValue) =>
                handleChange("leaveType", itemValue)
              }
            >
              <Picker.Item label="Select leave type" value="" />
              <Picker.Item label="Annual Leave" value="annual" />
              <Picker.Item label="Sick Leave" value="sick" />
              <Picker.Item label="Personal Leave" value="personal" />
              <Picker.Item label="Other Reason" value="other" />
            </Picker>
          </View>
        </View>

        {/* Date Section */}
        <View className="bg-blue-50 rounded-lg p-4 mb-4">
          <View className="flex-row items-center justify-between">
            {/* Start Date Section */}
            <View className="flex-1 mr-2">
              <Text className="text-xl font-bold text-blue-600 mb-2">
                Start Date:
              </Text>
              <View className="flex-row items-center bg-white rounded-lg">
                <Icon
                  name="calendar-today"
                  color="#2563eb"
                  style={{ marginHorizontal: 10 }}
                  size={24}
                />
                <TouchableOpacity
                  onPress={showStartDatePicker}
                  className="bg-white p-3 rounded-lg"
                >
                  <Text>{startDate.toLocaleDateString()}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* End Date Section */}
            <View className="flex-1">
              <Text className="text-xl font-bold text-blue-600 mb-2">
                End Date:
              </Text>
              <View className="flex-row items-center bg-white rounded-lg">
                <Icon
                  name="calendar-today"
                  color="#2563eb"
                  style={{ marginHorizontal: 10 }}
                  className="text-blue-600 mx-2"
                  size={24}
                />
                <TouchableOpacity
                  onPress={showEndDatePicker}
                  className="bg-white p-3 rounded-lg"
                >
                  <Text>{endDate.toLocaleDateString()}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* Reason for Leave */}
        <View className="bg-blue-50 rounded-lg p-4 mb-4">
          <Text className="text-xl font-bold text-blue-600 mb-2">
            Reason for Leave:
          </Text>

          <View className="bg-white flex-row rounded-lg p-2">
            <Icon
              name="text-snippet"
              size={24}
              color="#2563eb"
              style={{ marginHorizontal: 10 }}
            />
            <TextInput
              className="flex-1 pl-2"
              placeholder="Please specify your reason for leave"
              value={formData.reason}
              onChangeText={(value) => handleChange("reason", value)}
              multiline={true}
              numberOfLines={5}
              textAlignVertical="top"
              style={{ maxHeight: 100 }}
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="w-full bg-blue-600 text-white rounded-lg py-3 flex-row justify-center items-center mb-10"
        >
          <Icon
            name="send"
            size={18}
            color="white"
            style={{ marginHorizontal: 10 }}
          />
          <Text className="text-white text-center text-lg font-bold">
            Submit Leave Request
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeaveRequest;
