import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, TextInput, Image } from "react-native";
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
    <ScrollView className="bg-[#F2F2F2] flex-1">
      {/* Header */}
      <View className="flex-row justify-between items-center p-6 bg-white">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-back" size={24} className="text-black" />
        </TouchableOpacity>

        <Text className="text-[#2563eb] text-2xl font-bold">Employee Directory</Text>
        <Image source={images.smallLogo} className="w-10 h-10" />
      </View>

      {/* Employee Directory */}
      <View className="p-7">
        <View className="items-center mb-4">
          <Icon name="person" size={80} color="gray" />
        </View>

        {/* PR Number Input Field */}
        <View className="bg-white p-3 border border-gray-300 mb-4">
          <TextInput
            style={{ flex: 1, fontSize: 16 }}
            placeholder="PR NO (4 Digits)"
            keyboardType="numeric"
            maxLength={4}
            value={prNumber}
            onChangeText={setPrNumber}
          />
        </View>

        {/* OR Divider */}
        <Text className="text-center text-gray-500 mb-2">Or</Text>

        {/* Name Input Field */}
        <View className="bg-white p-3 border border-gray-300 mb-4">
          <TextInput
            style={{ flex: 1, fontSize: 16 }}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* OR Divider */}
        <Text className="text-center text-gray-500 mb-2">Or</Text>

        {/* Mobile Number Input Field */}
        <View className="bg-white p-3 border border-gray-300 mb-4">
          <TextInput
            style={{ flex: 1, fontSize: 16 }}
            placeholder="Mobile No"
            keyboardType="numeric"
            maxLength={10}
            value={mobileNo}
            onChangeText={setMobileNo}
          />
        </View>

        {/* OR Divider */}
        <Text className="text-center text-gray-500 mb-2">Or</Text>

        {/* Department Picker */}
        <DepartmentPicker
          selectedValue={selectedDepartment}
          onValueChange={setSelectedDepartment}
        />

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSearch}
          style={{
            backgroundColor: "#2563eb",
            paddingVertical: 14,
            paddingHorizontal: 40,
            width: "100%",
            alignItems: "center",
            marginTop: 20,
            borderRadius: 6,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>OK</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EmployeeDirectory;
