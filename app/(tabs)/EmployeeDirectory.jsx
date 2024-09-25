import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../constants/images";
import DepartmentPicker from "./DepartmentPicker";

const EmployeeDirectory = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [prNumber, setPrNumber] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const handleSearch = () => {
    if (name || prNumber || mobileNo || selectedDepartment) {
      navigation.navigate("SearchResult", {
        name,
        prNumber,
        mobileNo,
        department: selectedDepartment,
      });
    } else {
      alert("Please enter at least one search criteria.");
    }
  };

  return (
    <View className="bg-white flex-1">
      {/* Header */}
      <View className="flex-row justify-between items-center p-6 bg-blue-700">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-back" size={24} className="text-white" />
        </TouchableOpacity>

        <Text className="text-white text-2xl font-bold">
          Employee Directory
        </Text>
        <Image source={images.smallLogo} className="w-10 h-10" />
      </View>

      {/* Employee Directory */}

      <ScrollView className="flex-grow container mx-auto p-5 pt-7 ">
        <View className="p-7 bg-blue-50 ">
          <View className="items-center">
            <View className="-center w-26 mb-4 bg-blue-700 rounded-full">
              <Icon name="person" size={100} color="white" />
            </View>
          </View>

          {/* PR Number Input Field */}
          <Text className="block text-xl font-medium text-gray-700 pt-3">
            PR NO (4 Digits) :
          </Text>
          <View className=" border border-slate-300 rounded-md mt-2">
            <TextInput
              placeholder="e.g. 1234"
              keyboardType="numeric"
              maxLength={4}
              value={prNumber}
              onChangeText={setPrNumber}
              className="block w-full rounded-md bg-white p-2 text-base"
            />
          </View>

          {/* OR Divider */}
          <View className="flex flex-row items-center mt-3">
            <View className="flex-1 border-t border-gray-300" />
            <Text className="px-2 bg-blue-50 text-sm text-gray-500">Or</Text>
            <View className="flex-1 border-t border-gray-300" />
          </View>

          {/* Name Input Field */}
          <Text className="block text-xl font-medium text-gray-700">
            Name :
          </Text>
          <View className="border border-slate-300 rounded-md mt-2">
            <TextInput
              placeholder="Enter full Name"
              value={name}
              onChangeText={setName}
              className="block w-full rounded-md bg-white p-2 text-base"
            />
          </View>

          {/* OR Divider */}
          <View className="flex flex-row items-center mt-3">
            <View className="flex-1 border-t border-gray-300" />
            <Text className="px-2 bg-blue-50 text-sm text-gray-500">Or</Text>
            <View className="flex-1 border-t border-gray-300" />
          </View>

          {/* Mobile Number Input Field */}
          <Text className="block text-xl font-medium text-gray-700">
            Mobile No :
          </Text>
          <View className="border border-slate-300 rounded-md mt-2">
            <TextInput
              placeholder="Enter Full Number"
              keyboardType="numeric"
              maxLength={10}
              value={mobileNo}
              onChangeText={setMobileNo}
              className="block w-full rounded-md bg-white p-2 text-base"
            />
          </View>

          {/* OR Divider */}
          <View className="flex flex-row items-center mt-3">
            <View className="flex-1 border-t border-gray-300" />
            <Text className="px-2 bg-blue-50 text-sm text-gray-500">Or</Text>
            <View className="flex-1 border-t border-gray-300" />
          </View>

          {/* Department Picker */}
          <Text className="block text-xl font-medium text-gray-700">
            Department :
          </Text>
          <DepartmentPicker
            selectedValue={selectedDepartment}
            onValueChange={setSelectedDepartment}
          />

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSearch}
            className="bg-blue-600 py-3 px-10 w-full items-center mt-6 rounded-md"
          >
            <View className="flex flex-row items-center">
              <Icon name="search" size={25} color="white" />
              <Text className="text-white text-lg font-bold ml-2">Search</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EmployeeDirectory;
