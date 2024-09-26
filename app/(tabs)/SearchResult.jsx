import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { images } from "../../constants/images";

const SearchResult = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, prNumber, department } = route.params || {};

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`http://192.168.4.56:3000/search?name=${name}&prno=${prNumber}&department=${department}`);
        const result = await response.json();
        if (result.status === 'ok') {
          setEmployees(result.data);
        } else {
          console.error("Error fetching employees:", result.data);
        }
      } catch (error) {
        console.error("Error fetching employees:", error.message);
      }
    };

    fetchEmployees();
  }, [name, prNumber, department]);

  return (
    <ScrollView className="bg-[#F2F2F2] flex-1">
      {/* Header */}
      <View className="flex-row justify-between items-center p-6 bg-white">
        <TouchableOpacity onPress={() => navigation.navigate("EmployeeDirectory")}>
          <Icon name="arrow-back" size={24} className="text-black" />
        </TouchableOpacity>
        <Text className="text-[#2563eb] text-2xl font-bold">Search Result</Text>
        <Image source={images.smallLogo} className="w-10 h-10" />
      </View>

      {/* Search Result */}
      <ScrollView className="space-y-4 p-4">
        {employees.length > 0 ? (
          employees.map((employee, index) => (
            <View
              key={index}
              className="flex-row items-center border border-gray-300 rounded-lg p-4 bg-white"
            >
              {/* Image Section */}
              <Image
                source={{ uri: "https://via.placeholder.com/150" }}
                className="w-32 h-32 rounded-full mr-4"
              />
              {/* Text Section */}
              <View className="flex-1">
                <Text className="text-lg font-bold text-[#2563eb]">{employee.name}</Text>
                <Text>{employee.prno}</Text>
                <Text className="uppercase">{employee.department}</Text>
                <Text>{employee.mobileNo}</Text>
              </View>
            </View>
          ))
        ) : (
          <View className="flex-1 justify-center items-center p-4">
            <Text className="text-center text-gray-500 text-lg">No results found</Text>
          </View>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default SearchResult;
