import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { images } from "../../constants/images";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";

const LeaveRequest = () => {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [leaveType, setLeaveType] = useState("Vacation");

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

  return (
    <View className="flex-1 bg-blue-50">
      {/* Header */}
      <View className="flex-row justify-between items-center p-6 bg-blue-700">
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Icon name="arrow-back" size={24} className="text-white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">Leave Request</Text>
        <Image source={images.smallLogo} className="w-10 h-10" />
      </View>

      <ScrollView className="p-4">
        <Text className="text-2xl font-bold text-blue-600 text-center mb-4">
          Request for Leave
        </Text>

        {/* Name Fields */}
        <View className="flex-row mb-4">
          <TextInput
            className="flex-1 border p-2 rounded mr-2"
            placeholder="First Name"
          />
          <TextInput
            className="flex-1 border p-2 rounded"
            placeholder="Last Name"
          />
        </View>

        {/* Employee ID */}
        <TextInput
          className="border p-2 rounded mb-4"
          placeholder="Employee ID"
          keyboardType="numeric"
        />

        {/* Email */}
        <TextInput
          className="border p-2 rounded mb-4"
          placeholder="Email"
          keyboardType="email-address"
        />

        {/* Phone Number */}
        <TextInput
          className="border p-2 rounded mb-4"
          placeholder="Phone Number"
          keyboardType="phone-pad"
        />

        {/* Position */}
        <TextInput className="border p-2 rounded mb-4" placeholder="Position" />

        {/* Manager and Manager Email */}
        <TextInput
          className="border p-2 rounded mb-4"
          placeholder="Manager Name"
        />
        <TextInput
          className="border p-2 rounded mb-4"
          placeholder="Manager Email"
          keyboardType="email-address"
        />

        {/* Leave Request For */}
        <Text className="text-lg font-semibold mb-2">Details of Leave</Text>
        <View className="flex-row items-center mb-4">
          <TouchableOpacity className="mr-4">
            <Text className="text-blue-600">Days</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Hours</Text>
          </TouchableOpacity>
        </View>

        {/* Leave Start and End Dates */}
        <View className="flex-row mb-4">
          <TouchableOpacity
            className="flex-1 border p-2 rounded mr-2"
            onPress={showStartDatePicker}
          >
            <Text>{startDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 border p-2 rounded"
            onPress={showEndDatePicker}
          >
            <Text>{endDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
        </View>

        {/* Leave Type */}
        <Picker
          selectedValue={leaveType}
          onValueChange={(itemValue) => setLeaveType(itemValue)}
          className="border p-2 rounded mb-4"
        >
          <Picker.Item label="Vacation" value="Vacation" />
          <Picker.Item label="Sick" value="Sick" />
          <Picker.Item label="Quitting" value="Quitting" />
          <Picker.Item label="Other" value="Other" />
        </Picker>

        {/* Comments */}
        <TextInput
          className="border p-2 rounded mb-4"
          placeholder="Comments"
          multiline
          numberOfLines={4}
        />

        {/* Submit Button */}
        <TouchableOpacity className="bg-blue-600 p-4 rounded">
          <Text className="text-center text-white font-semibold">
            Request Leave
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default LeaveRequest;
