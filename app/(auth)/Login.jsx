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

const Login = () => {
  const [prNumber, setPrNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState(generateCaptcha());
  const [loading, setLoading] = useState(false); // Loading state
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

  const handleSignIn = async () => {
    if (!prNumber || !password || !captcha) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (prNumber.length !== 4) {
      Alert.alert("Error", "PR Number must be 4 digits.");
      return;
    }
    if (captcha !== generatedCaptcha) {
      Alert.alert("Error", "Captcha verification failed. Please try again.");
      refreshCaptcha();
      return;
    }

    setLoading(true); // Set loading state to true
    try {
      const response = await axios.post("https://cpcl.onrender.com/login", {
        prno: prNumber,
        password,
      });
      if (response.status === 200 && response.data.status === "ok") {
        await AsyncStorage.setItem("userToken", response.data.token);
        router.push("/Home");
      } else {
        Alert.alert("Error", "Sign-In failed! Please try again.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          Alert.alert(
            "Error",
            "PR number not found. Please enter valid credentials."
          );
        } else if (error.response.status === 401) {
          Alert.alert(
            "Error",
            "Invalid credentials. Please check your PR number or password."
          );
        } else {
          Alert.alert("Error", "Sign-In failed! Please try again.");
        }
      } else if (error.request) {
        console.log("Request made but no response:", error.request);
        Alert.alert("Error", "Network Error. Please check your connection.");
      } else {
        console.log("Error message:", error.message);
        Alert.alert("Error", "Network Error. Please check your connection.");
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <SafeAreaView className="bg-white">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          marginVertical: 60,
        }}
      >
        <Image source={images.logo} className="w-full h-28" />
        <View className="w-full justify-center px-4 my-6">
          {/* PR Number Input Field */}
          <View className="bg-blue-50 rounded-lg p-4 my-2">
            <Text className="text-xl font-bold text-blue-600 mb-2">
              PR Number :
            </Text>
            <View className="flex-row items-center bg-white rounded-lg ">
              <Icon
                name="person"
                size={24}
                color="#2563eb"
                style={{ marginHorizontal: 10 }}
              />
              <View className="bg-slate-200 h-[60%] w-px" />
              <TextInput
                className="flex-1 p-2 pl-4"
                placeholder="PR NO (4 Digits)"
                keyboardType="numeric"
                maxLength={4}
                value={prNumber}
                onChangeText={setPrNumber}
              />
            </View>
          </View>

          {/* Password Field */}
          <View className="bg-blue-50 rounded-lg p-4 my-2">
            <Text className="text-xl font-bold text-blue-600 mb-2">
              Password :
            </Text>
            <View className="flex-row items-center bg-white rounded-lg">
              <Icon
                name={showPassword ? "visibility-off" : "visibility"}
                color="#2563eb"
                style={{ marginHorizontal: 10 }}
                size={24}
                onPress={() => setShowPassword(!showPassword)}
              />
              <View className="bg-slate-200 h-[60%] w-px" />
              <TextInput
                className="flex-1 p-2 pl-4"
                placeholder="INTRANET PASSWORD"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          {/* Captcha Field */}
          <View className="bg-blue-50 rounded-lg p-4 my-2">
            <Text className="text-xl font-bold text-blue-600 mb-2">
              Captcha :
            </Text>
            <View className="mt-1 flex-row items-center space-x-2 rounded-lg">
              <TextInput
                placeholder="ENTER CAPTCHA"
                value={captcha}
                onChangeText={setCaptcha}
                className="flex-grow bg-white rounded px-3 py-2"
              />
              <View className="flex items-center justify-center bg-white px-4 py-2 rounded-md">
                <Text className="text-lg font-bold text-blue-600">
                  {generatedCaptcha}
                </Text>
              </View>
              <TouchableOpacity
                onPress={refreshCaptcha}
                className="bg-white p-2 rounded-md"
              >
                <Icon name="refresh" size={26} color="#2563eb" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            className={`bg-blue-600 my-4 py-4 px-10 w-full items-center rounded-lg ${
              loading ? "opacity-50" : ""
            }`}
            onPress={handleSignIn}
            disabled={loading} // Disable button when loading
          >
            <Text className="text-white text-lg font-bold">
              {loading ? "Loading..." : "Sign In"}
            </Text>
          </TouchableOpacity>

          {/* Don't have an account */}
          {/* <View className="flex-row items-center">
            <Text className="text-base">Don't have an account? </Text>
            <TouchableOpacity>
              <Link href="/Register" className="text-blue-600 ">
                Sign up
              </Link>
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
