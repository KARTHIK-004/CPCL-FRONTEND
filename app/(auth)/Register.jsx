import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { images } from "../../constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [prNumber, setPrNumber] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [dob, setDob] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

  const handleDateConfirm = (date) => {
    setDob(moment(date).format("YYYY-MM-DD"));
    setDatePickerVisibility(false);
  };

  const handleSignUp = async () => {
    if (
      !name ||
      !prNumber ||
      !password ||
      !mobileNo ||
      !dob ||
      !email ||
      !selectedRole ||
      !selectedDepartment
    ) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    setIsLoading(true);

    const userData = {
      name,
      email,
      prno: prNumber,
      password,
      mobileNo,
      dob,
      department: selectedDepartment,
      role: selectedRole,
    };

    try {
      await axios.post("https://cpcl.onrender.com/register", userData);
      setIsLoading(false);
      router.push("/Login");
    } catch (error) {
      setIsLoading(false);
      let errorMessage = "An error occurred. Please try again.";
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage = "Network Error. Please check your connection.";
      }
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-grow px-4 my-4">
        <Image source={images.logo} className="w-full h-28" />
        <View className="w-full justify-center my-6">
          {/* Name Input Field */}
          <View className="flex-row items-center bg-white p-3 border border-gray-300 mb-3">
            <Icon name="person" size={24} color="gray" className="mr-3" />
            <View className="w-px h-full bg-gray-300 mr-3" />
            <TextInput
              className="flex-1 text-base"
              placeholder="NAME"
              value={name}
              onChangeText={setName}
              accessibilityLabel="Name"
            />
          </View>

          {/* Email Input Field */}
          <View className="flex-row items-center bg-white p-3 border border-gray-300 mb-3">
            <Icon name="email" size={24} color="gray" className="mr-3" />
            <View className="w-px h-full bg-gray-300 mr-3" />
            <TextInput
              className="flex-1 text-base"
              placeholder="EMAIL"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              accessibilityLabel="Email"
            />
          </View>

          {/* PR Number Input Field */}
          <View className="flex-row items-center bg-white p-3 border border-gray-300 mb-3">
            <Icon name="person" size={24} color="gray" className="mr-3" />
            <View className="w-px h-full bg-gray-300 mr-3" />
            <TextInput
              className="flex-1 text-base"
              placeholder="PR NO (4 Digits)"
              keyboardType="numeric"
              maxLength={4}
              value={prNumber}
              onChangeText={setPrNumber}
              accessibilityLabel="PR Number"
            />
          </View>

          {/* Mobile No Input Field */}
          <View className="flex-row items-center bg-white p-3 border border-gray-300 mb-3">
            <Icon name="phone" size={24} color="gray" className="mr-3" />
            <View className="w-px h-full bg-gray-300 mr-3" />
            <TextInput
              className="flex-1 text-base"
              placeholder="MOBILE NO"
              keyboardType="numeric"
              maxLength={10}
              value={mobileNo}
              onChangeText={setMobileNo}
              accessibilityLabel="Mobile Number"
            />
          </View>

          {/* DOB Field */}
          <TouchableOpacity
            className="flex-row items-center bg-white p-3 border border-gray-300 mb-3"
            onPress={() => setDatePickerVisibility(true)}
          >
            <Icon
              name="calendar-today"
              size={24}
              color="gray"
              className="mr-3"
            />
            <View className="w-px h-full bg-gray-300 mr-3" />
            <Text className="flex-1 text-base">
              {dob ? dob : "DOB (YYYY-MM-DD)"}
            </Text>
          </TouchableOpacity>

          {/* Password Input Field */}
          <View className="flex-row items-center bg-white p-3 border border-gray-300 mb-3">
            <Icon name="lock" size={24} color="gray" className="mr-3" />
            <View className="w-px h-full bg-gray-300 mr-3" />
            <TextInput
              className="flex-1 text-base"
              placeholder="INTRANET PASSWORD"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              accessibilityLabel="Intranet Password"
            />
          </View>

          {/* Role Picker */}
          <View className="bg-white border border-gray-300 rounded mb-3">
            <Picker
              selectedValue={selectedRole}
              onValueChange={(itemValue) => setSelectedRole(itemValue)}
            >
              <Picker.Item label="Select Role" value="" />
              {roles.map((role, index) => (
                <Picker.Item key={index} label={role} value={role} />
              ))}
            </Picker>
          </View>

          {/* Department Picker */}
          <View className="bg-white border border-gray-300 rounded mb-3">
            <Picker
              selectedValue={selectedDepartment}
              onValueChange={(itemValue) => setSelectedDepartment(itemValue)}
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

          {/* Sign Up Button */}
          <TouchableOpacity
            className={`bg-blue-600 rounded p-4 items-center mb-3 ${
              isLoading ? "opacity-50" : ""
            }`}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white text-base">Sign Up</Text>
            )}
          </TouchableOpacity>

          {/* Link to Sign In */}
          <View className="mt-4 items-center">
            <Text>Already have an account?</Text>

            <TouchableOpacity>
              <Link href="/Login">
                <Text className="text-blue-600">Sign In</Text>
              </Link>
            </TouchableOpacity>
          </View>
        </View>

        {/* Date Picker Modal */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setDatePickerVisibility(false)}
          date={new Date()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
