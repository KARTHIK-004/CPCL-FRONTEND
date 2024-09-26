import axios from "axios";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = () => {
  const [prNumber, setPrNumber] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState(generateCaptcha());
  const router = useRouter();

  function generateCaptcha() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  }

  const refreshCaptcha = () => {
    setGeneratedCaptcha(generateCaptcha());
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://192.168.4.56:3000/signup", {
        prno: prNumber,
        password,
      });
      if (response.status === 200 && response.data.status === "ok") {
        console.log("Token received:", response.data.token); // Log the token
      await AsyncStorage.setItem("userToken", response.data.token);
      console.log("Token stored successfully");
        router.push("/Home");
      } else {
        Alert.alert("Error", "Sign-up failed! Please try again.");
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response) {
        console.log("Response data:", error.response.data);
      }
      if (error.request) {
        console.log("Request made but no response:", error.request);
      } else {
        console.log("Error message:", error.message);
      }
      Alert.alert("Error", "Network Error. Please check your connection.");
    }
  };
  

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          marginVertical: 60,
        }}
      >
        <Image source={images.logo} style={{ width: "100%", height: 112 }} />
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            paddingHorizontal: 16,
            marginVertical: 24,
          }}
        >
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
              marginTop: 16,
            }}
          >
            <Icon
              name="person"
              size={24}
              color="gray"
              style={{ marginRight: 12 }}
            />
            <View className="w-px h-full bg-gray-300 mr-3" />
            <TextInput
              style={{ flex: 1, fontSize: 16 }}
              placeholder="PR NO (4 Digits)"
              keyboardType="numeric"
              maxLength={4}
              value={prNumber}
              onChangeText={setPrNumber}
            />
          </View>

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
            <View className="w-px h-full bg-gray-300 mr-3" />
            <TextInput
              style={{ flex: 1, fontSize: 16 }}
              placeholder="INTRANET PASSWORD"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Captcha Input */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: 12,
              borderWidth: 1,
              borderColor: "#d1d5db",
              marginBottom: 10,
            }}
          >
            <Icon
              name="person"
              size={24}
              color="gray"
              style={{ marginRight: 12 }}
            />
            <View className="w-px h-full bg-gray-300 mr-3" />
            <TextInput
              style={{ flex: 1, fontSize: 16 }}
              placeholder="ENTER CAPTCHA"
              value={captcha}
              onChangeText={setCaptcha}
            />
          </View>

          {/* Captcha Display and Refresh */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 55,
            }}
          >
            <Text className="text-2xl font-bold">{generatedCaptcha}</Text>
            <TouchableOpacity onPress={refreshCaptcha}>
              <Icon
                name="refresh"
                size={24}
                className="text-black ml-3 text-3xl font-bold"
              />
            </TouchableOpacity>
          </View>

          {/* Sign-Up Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#2563eb",
              paddingVertical: 14,
              paddingHorizontal: 40,
              width: "100%",
              alignItems: "center",
            }}
            onPress={handleSignUp}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
          {/* Don't have an account */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 16 }}>Don't have an account? </Text>
            <TouchableOpacity>
              <Link
                href="/sign-in"
                style={{ fontWeight: "bold", color: "#2563eb" }}
              >
                Sign In
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* Footer */}
      <Text className="mt-20 py-4 text-sm text-gray-600 bg-white text-center ">
        @Chennai Petroleum Corporation Ltd
      </Text>
    </SafeAreaView>
  );
};

export default SignUp;
