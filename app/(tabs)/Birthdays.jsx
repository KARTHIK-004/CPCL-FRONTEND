import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { images } from "../../constants/images";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";

const Birthdays = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://cpcl.onrender.com/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getBirthdaysThisMonth = (users) => {
    const currentMonth = new Date().getMonth();
    return users.filter((user) => {
      const userBirthday = new Date(user.dob);
      return userBirthday.getMonth() === currentMonth;
    });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEmployeePress = useCallback((employee) => {
    setSelectedEmployee(employee);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedEmployee(null);
  }, []);

  const handleSendWishes = useCallback((employee) => {
    Alert.alert(
      "Send Wishes",
      `Do you want to send birthday wishes to ${employee.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send",
          onPress: () => {
            Alert.alert("Success", `Birthday wishes sent to ${employee.name}`);
          },
        },
      ]
    );
  }, []);

  const renderEmployeeItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        className="bg-blue-50 rounded-lg shadow-md p-4 mb-4 flex-row items-center"
        onPress={() => handleEmployeePress(item)}
      >
        <Image
          source={{
            uri:
              item.photo ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          }}
          className="w-16 h-16 rounded-full mr-4"
        />
        <View className="flex-1">
          <Text className="text-lg font-semibold text-blue-600">
            {item.name}
          </Text>
          <Text className="text-gray-600">{item.role}</Text>
          <Text className="text-gray-500">{item.department}</Text>
          <Text className="text-sm text-gray-500 mt-2">
            Birthday:{" "}
            {new Date(item.dob).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>
        <Icon name="cake" size={24} color="#2563eb" />
      </TouchableOpacity>
    ),
    [handleEmployeePress]
  );

  const birthdaysThisMonth = getBirthdaysThisMonth(filteredUsers);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center p-6 bg-blue-600">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">
          Employee Birthdays
        </Text>
        <Image source={images.smallLogo} className="w-10 h-10" />
      </View>

      <View className="flex-1 p-5">
        <View className="bg-blue-600 rounded-lg p-4 mb-5">
          <Text className="text-2xl font-bold text-white mb-4">
            Birthdays - {currentMonth} {currentYear}
          </Text>
          <View className="m-4">
            <View className="flex-row items-center bg-white rounded-lg">
              <TextInput
                className="bg-white flex-1 px-4 py-2 rounded-lg"
                placeholder="Search by name or department"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <Icon name="search" size={24} color="#9CA3AF" className="mx-3" />
            </View>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#2563eb" />
        ) : (
          <FlatList
            data={birthdaysThisMonth}
            renderItem={renderEmployeeItem}
            keyExtractor={(item) =>
              item.id ? item.id.toString() : Math.random().toString()
            }
            ListEmptyComponent={
              <Text className="text-center text-gray-500 mt-4">
                No birthdays found this month
              </Text>
            }
          />
        )}

        <View className="bg-blue-50 rounded-lg shadow-md p-4 mt-6">
          <Text className="text-xl font-semibold text-blue-600 mb-4">
            Birthday Statistics
          </Text>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Total Birthdays this Month:</Text>
            <Text className="font-semibold text-blue-600">
              {birthdaysThisMonth.length}
            </Text>
          </View>
          <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded-md mt-4">
            <Text className="text-white text-center font-medium">
              View All Birthdays
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={!!selectedEmployee}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View className="flex-1 bg-white bg-opacity-50 justify-center items-center">
          <View className="bg-blue-50 rounded-lg p-6 w-11/12 max-w-md">
            {selectedEmployee && (
              <>
                <Image
                  source={{
                    uri:
                      selectedEmployee.photo ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                  }}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />

                <Text className="text-2xl font-bold text-center mb-2">
                  {selectedEmployee.name}
                </Text>
                <Text className="text-gray-600 text-center mb-4">
                  {selectedEmployee.role} - {selectedEmployee.department}
                </Text>
                <Text className="text-center mb-4">
                  Birthday:{" "}
                  {new Date(selectedEmployee.dob).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
                <TouchableOpacity
                  className="bg-blue-500 py-3 px-4 rounded-md mb-2"
                  onPress={() => handleSendWishes(selectedEmployee)}
                >
                  <Text className="text-white text-center font-medium">
                    Send Birthday Wishes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-gray-300 py-3 px-4 rounded-md"
                  onPress={handleCloseModal}
                >
                  <Text className="text-gray-800 text-center font-medium">
                    Close
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Birthdays;
