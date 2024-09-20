import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { images } from "../../constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import DepartmentPicker from "../(tabs)/DepartmentPicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import axios from "axios";

const SignIn = () => {
  const [name, setName] = useState("");
  const [prNumber, setPrNumber] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [dob, setDob] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const router = useRouter();

  const handleDateConfirm = (date) => {
    setDob(moment(date).format("YYYY-MM-DD"));
    setDatePickerVisibility(false);
  };

  const handleSignIn = () => {
    if (!name || !prNumber || !password || !mobileNo || !dob) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    const userData = {
      name,
      prno: prNumber,
      password,
      mobileNo,
      dob,
      department: selectedDepartment,
    };

    axios
      .post("http://192.168.56.56:3000/signin", userData)
      .then((response) => {
        router.push("/sign-up");
      })
      .catch((error) => {
        let errorMessage = "An error occurred. Please try again.";
        if (error.response) {
          errorMessage = error.response.data?.message || errorMessage;
        } else if (error.request) {
          errorMessage = "Network Error. Please check your connection.";
        }
        Alert.alert("Error", errorMessage);
      });
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 16,
          marginVertical: 60,
        }}
      >
        <Image source={images.logo} style={{ width: "100%", height: 112 }} />
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            marginVertical: 24,
          }}
        >
          {/* Name Input Field */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: 12,
              borderWidth: 1,
              borderColor: "#d1d5db",
              marginBottom: 12,
            }}
          >
            <Icon
              name="person"
              size={24}
              color="gray"
              style={{ marginRight: 12 }}
            />
            <View
              style={{
                width: 1,
                height: "100%",
                backgroundColor: "#d1d5db",
                marginRight: 12,
              }}
            />
            <TextInput
              style={{ flex: 1, fontSize: 16 }}
              placeholder="NAME"
              value={name}
              onChangeText={setName}
              accessibilityLabel="Name"
            />
          </View>

          {/* PR Number Input Field */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: 12,
              borderWidth: 1,
              borderColor: "#d1d5db",
              marginBottom: 12,
            }}
          >
            <Icon
              name="person"
              size={24}
              color="gray"
              style={{ marginRight: 12 }}
            />
            <View
              style={{
                width: 1,
                height: "100%",
                backgroundColor: "#d1d5db",
                marginRight: 12,
              }}
            />
            <TextInput
              style={{ flex: 1, fontSize: 16 }}
              placeholder="PR NO (4 Digits)"
              keyboardType="numeric"
              maxLength={4}
              value={prNumber}
              onChangeText={setPrNumber}
              accessibilityLabel="PR Number"
            />
          </View>

          {/* Mobile No Input Field */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: 12,
              borderWidth: 1,
              borderColor: "#d1d5db",
              marginBottom: 12,
            }}
          >
            <Icon
              name="phone"
              size={24}
              color="gray"
              style={{ marginRight: 12 }}
            />
            <View
              style={{
                width: 1,
                height: "100%",
                backgroundColor: "#d1d5db",
                marginRight: 12,
              }}
            />
            <TextInput
              style={{ flex: 1, fontSize: 16 }}
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
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: 12,
              borderWidth: 1,
              borderColor: "#d1d5db",
              marginBottom: 12,
            }}
            onPress={() => setDatePickerVisibility(true)}
          >
            <Icon
              name="calendar-today"
              size={24}
              color="gray"
              style={{ marginRight: 12 }}
            />
            <View
              style={{
                width: 1,
                height: "100%",
                backgroundColor: "#d1d5db",
                marginRight: 12,
              }}
            />
            <Text style={{ flex: 1, fontSize: 16 }}>
              {dob ? dob : "DOB (YYYY-MM-DD)"}
            </Text>
          </TouchableOpacity>

          {/* Password Input Field */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: 12,
              borderWidth: 1,
              borderColor: "#d1d5db",
              marginBottom: 12,
            }}
          >
            <Icon
              name="lock"
              size={24}
              color="gray"
              style={{ marginRight: 12 }}
            />
            <View
              style={{
                width: 1,
                height: "100%",
                backgroundColor: "#d1d5db",
                marginRight: 12,
              }}
            />
            <TextInput
              style={{ flex: 1, fontSize: 16 }}
              placeholder="INTRANET PASSWORD"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              accessibilityLabel="Intranet Password"
            />
          </View>

          {/* Department Picker */}
          <DepartmentPicker
            selectedValue={selectedDepartment}
            onValueChange={setSelectedDepartment}
          />

          {/* Sign-In Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#2563eb",
              paddingVertical: 14,
              paddingHorizontal: 40,
              width: "100%",
              alignItems: "center",
              borderRadius: 8,
            }}
            onPress={handleSignIn}
            accessibilityLabel="Sign In"
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Sign In
            </Text>
          </TouchableOpacity>

          {/* Already have an account */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 16 }}>Already have an account? </Text>
            <TouchableOpacity>
              <Link
                href="/sign-up"
                style={{ fontWeight: "bold", color: "#2563eb" }}
              >
                Sign Up
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* DatePicker */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisibility(false)}
        date={dob ? moment(dob).toDate() : new Date()}
      />
    </SafeAreaView>
  );
};

export default SignIn;
