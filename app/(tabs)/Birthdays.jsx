import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import { images } from "../../constants/images";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Birthdays = () => {
  const navigation = useNavigation();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const fetchedEmployees = [
          {
            id: 1,
            name: "Anita Desai",
            position: "Process Engineer",
            department: "Production",
            birthDate: "1985-09-15",
            imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
          },
          {
            id: 2,
            name: "Rahul Sharma",
            position: "Safety Officer",
            department: "HSE",
            birthDate: "1990-09-22",
            imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
          },
          {
            id: 3,
            name: "Priya Patel",
            position: "IT Analyst",
            department: "Information Technology",
            birthDate: "1988-09-30",
            imageUrl: "https://randomuser.me/api/portraits/women/3.jpg",
          },
        ];
        setEmployees(fetchedEmployees);
        setFilteredEmployees(fetchedEmployees);
      } catch (error) {
        console.error("Error fetching employees:", error);
        Alert.alert(
          "Error",
          "Failed to load birthday employees. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [searchQuery, employees]);

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
            console.log("Wishes sent to", employee.name);
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
          source={{ uri: item.imageUrl }}
          className="w-16 h-16 rounded-full mr-4"
        />
        <View className="flex-1">
          <Text className="text-lg font-semibold text-blue-600">
            {item.name}
          </Text>
          <Text className="text-gray-600">{item.position}</Text>
          <Text className="text-gray-500">{item.department}</Text>
          <Text className="text-sm text-gray-500 mt-2">
            Birthday:{" "}
            {new Date(item.birthDate).toLocaleDateString("en-US", {
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

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center p-6 bg-blue-600">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text className="text-white text-2xl font-bold">
          Employee Retirement
        </Text>
        <Image source={images.smallLogo} className="w-10 h-10" />
      </View>

      <View className="flex-1 p-5">
        <View className="bg-blue-600 rounded-lg p-4 mb-5">
          <Text className="text-2xl font-bold text-white mb-4">
            Birthdays - {currentMonth} {currentYear}
          </Text>
          <View className="m-4">
            <View className=" flex-row items-center bg-white rounded-lg ">
              <TextInput
                className="bg-white flex-1 px-4 py-2  rounded-lg"
                placeholder="Search by name or department"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <Icon name="search" size={24} color="#9CA3AF" className="mx-3" />
            </View>
          </View>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#3B82F6" />
        ) : (
          <FlatList
            data={filteredEmployees}
            renderItem={renderEmployeeItem}
            keyExtractor={(item) => item.id.toString()}
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
              {employees.length}
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
        <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
          <View className="bg-white rounded-lg p-6 w-11/12 max-w-md">
            {selectedEmployee && (
              <>
                <Image
                  source={{ uri: selectedEmployee.imageUrl }}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <Text className="text-2xl font-bold text-center mb-2">
                  {selectedEmployee.name}
                </Text>
                <Text className="text-gray-600 text-center mb-4">
                  {selectedEmployee.position} - {selectedEmployee.department}
                </Text>
                <Text className="text-center mb-4">
                  Birthday:
                  {new Date(selectedEmployee.birthDate).toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric" }
                  )}
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
