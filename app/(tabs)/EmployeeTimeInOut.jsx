import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { images } from "../../constants/images";

export default function EmployeeTimeTracker() {
  const navigation = useNavigation();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [timeEntries, setTimeEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    setTimeout(() => {
      const mockEntries = [
        { id: "1", type: "in", timestamp: new Date(2023, 9, 1, 9, 0) },
        { id: "2", type: "out", timestamp: new Date(2023, 9, 1, 17, 0) },
        { id: "3", type: "in", timestamp: new Date(2023, 9, 2, 8, 45) },
        { id: "4", type: "out", timestamp: new Date(2023, 9, 2, 18, 15) },
      ];
      setTimeEntries(mockEntries);
      calculateTotalHours(mockEntries);
      setIsLoading(false);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateTotalHours = (entries) => {
    let total = 0;
    for (let i = 0; i < entries.length; i += 2) {
      if (entries[i + 1]) {
        const diff = entries[i + 1].timestamp - entries[i].timestamp;
        total += diff / (1000 * 60 * 60);
      }
    }
    setTotalHours(total.toFixed(2));
  };

  const handleTimeAction = () => {
    const newEntry = {
      id: Date.now().toString(),
      type: isCheckedIn ? "out" : "in",
      timestamp: new Date(),
    };

    const updatedEntries = [newEntry, ...timeEntries];
    setTimeEntries(updatedEntries);
    setIsCheckedIn(!isCheckedIn);
    calculateTotalHours(updatedEntries);

    Alert.alert(
      "Success",
      `You have successfully clocked ${
        isCheckedIn ? "out" : "in"
      } at ${newEntry.timestamp.toLocaleTimeString()}.`
    );
  };

  const renderTimeEntry = ({ item }) => (
    <View className="flex-row justify-between items-center bg-blue-50 p-4 mx-4 mb-2 rounded-lg">
      <View className="flex-row items-center">
        <View
          className={`w-10 h-10 rounded-full ${
            item.type === "in" ? "bg-green-100" : "bg-red-100"
          } items-center justify-center mr-3`}
        >
          <Icon
            name={item.type === "in" ? "login" : "logout"}
            size={20}
            color={item.type === "in" ? "#10B981" : "#EF4444"}
          />
        </View>
        <View>
          <Text className="font-semibold text-gray-800">
            {item.type === "in" ? "Clock In" : "Clock Out"}
          </Text>
          <Text className="text-xs text-gray-500">
            {item.timestamp.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </Text>
        </View>
      </View>
      <Text className="text-gray-600 font-medium">
        {item.timestamp.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center p-6 bg-blue-600">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold ">
          Employee Time In Out
        </Text>
        <Image source={images.smallLogo} className="w-10 h-10" />
      </View>

      <FlatList
        data={timeEntries}
        renderItem={renderTimeEntry}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View className="p-4">
            <View className="bg-blue-50 rounded-xl p-6 mb-6 shadow-sm">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-2xl font-bold text-blue-600">
                  {isCheckedIn ? "Currently Working" : "Not Clocked In"}
                </Text>
                <Icon name="access-time" size={24} color="#2563EB" />
              </View>
              <Text className="text-gray-600 mb-4 text-lg font-medium">
                {currentTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </Text>
              <TouchableOpacity
                className={`py-3 px-6 rounded-lg ${
                  isCheckedIn ? "bg-red-500" : "bg-blue-600"
                }`}
                onPress={handleTimeAction}
              >
                <Text className="text-white text-center text-lg font-semibold">
                  {isCheckedIn ? "Clock Out" : "Clock In"}
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-blue-600">
                Time Entries
              </Text>
              <View className="flex-row items-center">
                <Icon name="access-time" size={18} color="#4B5563" />
                <Text className="ml-1 text-gray-600">
                  Total: {totalHours} hrs
                </Text>
              </View>
            </View>
          </View>
        }
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator size="large" color="#2563EB" />
          ) : (
            <View className="bg-gray-100 p-4 rounded-lg mx-4">
              <Text className="text-center text-gray-500">
                No recent time entries
              </Text>
            </View>
          )
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
