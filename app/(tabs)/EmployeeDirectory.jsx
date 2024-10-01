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
import { Picker } from "@react-native-picker/picker";

const EmployeeDirectory = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [prNumber, setPrNumber] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

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
      <View className="flex-row justify-between items-center p-6 bg-blue-600">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-back" size={24} className="text-white" />
        </TouchableOpacity>

        <Text className="text-white text-2xl font-bold">
          Employee Directory
        </Text>
        <Image source={images.smallLogo} className="w-10 h-10" />
      </View>

      {/* Employee Directory */}
      <ScrollView className="flex-grow container mx-auto p-6 ">
        <View className="py-6">
          {/* PR Number Input Field */}
          <View className="bg-blue-50 rounded-lg p-4 my-2">
            <Text className="text-xl font-bold text-blue-600 mb-2">
              PR Number :
            </Text>
            <View className="flex-row items-center bg-white rounded-lg">
              <Icon name="phone" className="text-blue-600 mx-4" size={24} />
              <View className="bg-slate-200 h-[60%] w-px" />
              <TextInput
                className="flex-1 p-2 pl-4"
                placeholder="e.g. 1234"
                keyboardType="numeric"
                maxLength={4}
                value={prNumber}
                onChangeText={setPrNumber}
              />
            </View>
          </View>

          {/* OR Divider */}
          <View className="flex flex-row items-center my-2">
            <View className="flex-1 border-t border-gray-300" />
            <Text className="px-2 text-sm text-gray-500">Or</Text>
            <View className="flex-1 border-t border-gray-300" />
          </View>

          {/* Name Field */}
          <View className="bg-blue-50 rounded-lg p-4 my-2">
            <Text className="text-xl font-bold text-blue-600 mb-2">Name :</Text>
            <View className="flex-row items-center bg-white rounded-lg">
              <Icon name="person" className="text-blue-600 mx-4" size={24} />
              <View className="bg-slate-200 h-[60%] w-px" />
              <TextInput
                className="flex-1 p-2 pl-4"
                placeholder="Enter full Name"
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          {/* OR Divider */}
          <View className="flex flex-row items-center my-2">
            <View className="flex-1 border-t border-gray-300" />
            <Text className="px-2 bg-blue-50 text-sm text-gray-500">Or</Text>
            <View className="flex-1 border-t border-gray-300" />
          </View>

          {/* Phone Number Field */}
          <View className="bg-blue-50 rounded-lg p-4 my-2">
            <Text className="text-xl font-bold text-blue-600 mb-2">
              Phone Number :
            </Text>
            <View className="flex-row items-center bg-white rounded-lg">
              <Icon name="phone" className="text-blue-600 mx-4" size={24} />
              <View className="bg-slate-200 h-[60%] w-px" />
              <TextInput
                className="flex-1 p-2 pl-4"
                placeholder="Enter full number"
                keyboardType="numeric"
                maxLength={10}
                value={mobileNo}
                onChangeText={setMobileNo}
              />
            </View>
          </View>

          {/* OR Divider */}
          <View className="flex flex-row items-center my-2">
            <View className="flex-1 border-t border-gray-300" />
            <Text className="px-2 text-sm text-gray-500">Or</Text>
            <View className="flex-1 border-t border-gray-300" />
          </View>

          {/* Department Picker */}
          <View className="bg-blue-50 rounded-lg p-4 mb-4">
            <Text className="text-xl font-bold text-blue-600 mb-2">
              Department :
            </Text>
            <Picker
              selectedValue={selectedDepartment}
              onValueChange={(itemValue) => setSelectedDepartment(itemValue)}
              style={{ backgroundColor: "white", borderRadius: 10 }}
            >
              <Picker.Item label="Select Department" value="" />
              {departments.map((dept, index) => (
                <Picker.Item key={index} label={dept} value={dept} />
              ))}
            </Picker>
          </View>

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
