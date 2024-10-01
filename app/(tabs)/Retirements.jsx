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
} from "react-native";
import { images } from "../../constants/images";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Retirements = () => {
  const navigation = useNavigation();
  const [retirees, setRetirees] = useState([]);
  const [filteredRetirees, setFilteredRetirees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRetiree, setSelectedRetiree] = useState(null);

  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchRetirees = async () => {
      try {
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const fetchedRetirees = [
          {
            id: 1,
            name: "Rajesh Kumar",
            position: "Senior Engineer",
            department: "Refinery Operations",
            yearsOfService: 35,
            retirementDate: "2024-09-15",
            imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
          },
          {
            id: 2,
            name: "Priya Sharma",
            position: "HR Manager",
            department: "Human Resources",
            yearsOfService: 30,
            retirementDate: "2024-09-22",
            imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
          },
          {
            id: 3,
            name: "Suresh Patel",
            position: "Finance Director",
            department: "Finance",
            yearsOfService: 33,
            retirementDate: "2024-09-30",
            imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
          },
        ];
        setRetirees(fetchedRetirees);
        setFilteredRetirees(fetchedRetirees);
      } catch (error) {
        console.error("Error fetching retirees:", error);
        Alert.alert(
          "Error",
          "Failed to load retirees. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchRetirees();
  }, []);

  useEffect(() => {
    const filtered = retirees.filter(
      (retiree) =>
        retiree.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        retiree.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRetirees(filtered);
  }, [searchQuery, retirees]);

  const handleRetireePress = useCallback((retiree) => {
    setSelectedRetiree(retiree);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedRetiree(null);
  }, []);

  const handleSendWishes = useCallback((retiree) => {
    Alert.alert(
      "Send Wishes",
      `Do you want to send retirement wishes to ${retiree.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send",
          onPress: () => {
            console.log("Wishes sent to", retiree.name);
            Alert.alert("Success", `Wishes sent to ${retiree.name}`);
          },
        },
      ]
    );
  }, []);

  const renderRetireeItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        className="bg-blue-50 rounded-lg shadow-md p-4 mb-4 flex-row items-center"
        onPress={() => handleRetireePress(item)}
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

          <Text className="text-sm text-gray-500">
            Service: {item.yearsOfService} years
          </Text>
          <Text className="text-sm text-gray-500">
            Retires: {item.retirementDate}
          </Text>
        </View>
        <Icon name="chevron-right" size={24} color="#3B82F6" />
      </TouchableOpacity>
    ),
    [handleRetireePress]
  );

  const averageYearsOfService =
    retirees.length > 0
      ? (
          retirees.reduce((sum, retiree) => sum + retiree.yearsOfService, 0) /
          retirees.length
        ).toFixed(1)
      : "N/A";

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
          <Text className="text-2xl font-semibold text-white mb-4">
            This Month - {currentMonth} {currentYear}
          </Text>

          <View className="m-4">
            <View className=" flex-row items-center bg-white rounded-lg ">
              <TextInput
                className="flex-1 px-4 py-2 rounded-full"
                placeholder="Search by name or department"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <Icon name="search" size={24} color="#9CA3AF" className="mr-3" />
            </View>
          </View>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="#3B82F6" />
        ) : (
          <FlatList
            data={filteredRetirees}
            renderItem={renderRetireeItem}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={
              <Text className="text-center text-gray-500 mt-4">
                No retirees found
              </Text>
            }
          />
        )}

        <View className="bg-blue-50 rounded-lg p-4 mt-6">
          <Text className="text-xl font-semibold text-blue-600 mb-4">
            Retirement Statistics
          </Text>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Total Retirees:</Text>
            <Text className="font-semibold text-blue-600">
              {retirees.length}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Avg. Years of Service:</Text>
            <Text className="font-semibold text-blue-600">
              {averageYearsOfService}
            </Text>
          </View>
        </View>
      </View>

      <Modal
        visible={!!selectedRetiree}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
          <View className="bg-white rounded-lg p-6 w-11/12 max-w-md">
            {selectedRetiree && (
              <>
                <Image
                  source={{ uri: selectedRetiree.imageUrl }}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <Text className="text-2xl font-bold text-center mb-2">
                  {selectedRetiree.name}
                </Text>
                <Text className="text-gray-600 text-center mb-4">
                  {selectedRetiree.position} - {selectedRetiree.department}
                </Text>
                <Text className="text-center mb-2">
                  Years of Service: {selectedRetiree.yearsOfService}
                </Text>
                <Text className="text-center mb-4">
                  Retirement Date: {selectedRetiree.retirementDate}
                </Text>
                <TouchableOpacity
                  className="bg-blue-500 py-3 px-4 rounded-md mb-2"
                  onPress={() => handleSendWishes(selectedRetiree)}
                >
                  <Text className="text-white text-center font-medium">
                    Send Wishes
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

export default Retirements;
