import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../constants/images";

const EmployeeLOP = () => {
  const navigation = useNavigation();

  const initialLOPRecords = [
    {
      id: 1,
      startDate: "2024-08-15",
      endDate: "2024-08-17",
      days: 3,
      reason: "Personal emergency",
      status: "Approved",
    },
    {
      id: 2,
      startDate: "2024-09-01",
      endDate: "2024-09-02",
      days: 2,
      reason: "Family function",
      status: "Pending",
    },
    {
      id: 3,
      startDate: "2024-07-10",
      endDate: "2024-07-10",
      days: 1,
      reason: "Medical appointment",
      status: "Rejected",
    },
  ];

  const [lopRecords, setLopRecords] = useState(initialLOPRecords);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newLOP, setNewLOP] = useState({
    startDate: "",
    endDate: "",
    days: 0,
    reason: "",
  });

  const calculateDays = (start, end) => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  };

  const handleInputChange = (field, value) => {
    setNewLOP((prev) => ({
      ...prev,
      [field]: value,
      days:
        field === "endDate"
          ? calculateDays(newLOP.startDate, value)
          : prev.days,
    }));
  };

  const handleSubmit = () => {
    const newRecord = {
      id: lopRecords.length + 1,
      ...newLOP,
      status: "Pending",
    };
    setLopRecords((prev) => [newRecord, ...prev]);
    setIsFormOpen(false);
    setNewLOP({ startDate: "", endDate: "", days: 0, reason: "" });
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center p-6 bg-blue-600">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">Employee LOP</Text>
        <Image source={images.smallLogo} className="w-10 h-10" />
      </View>

      <View className="flex-1 p-4">
        <View className="bg-white rounded-lg flex-1">
          <View className="bg-blue-600 px-4 py-6 flex-row justify-between items-center rounded-lg mb-4">
            <Text className="text-xl font-semibold text-white">
              LOP Records
            </Text>
            <TouchableOpacity
              onPress={() => setIsFormOpen(true)}
              className="bg-white text-blue-600 px-4 py-2 rounded-md flex-row items-center"
            >
              <Icon name="add" size={20} color="blue" />
              <Text className="text-blue-600">New LOP Request</Text>
            </TouchableOpacity>
          </View>

          {/* Scrollable Table */}
          <ScrollView
            horizontal={true}
            contentContainerStyle={{ paddingBottom: 50 }}
          >
            <View className="flex-col">
              <View className="flex-row p-5 bg-blue-50">
                <Text className="w-28 font-bold text-blue-600">Start Date</Text>
                <Text className="w-28 font-bold text-blue-600">End Date</Text>
                <Text className="w-16 font-bold text-blue-600">Days</Text>
                <Text className="w-44 font-bold text-blue-600">Reason</Text>
                <Text className="w-24 font-bold text-blue-600">Status</Text>
              </View>
              {lopRecords.map((record) => (
                <View
                  key={record.id}
                  className="flex-row px-1 py-2 border-b border-blue-50"
                >
                  <Text className="w-28 text-gray-900 p-2">
                    {record.startDate}
                  </Text>
                  <Text className="w-28 text-gray-900 p-2">
                    {record.endDate}
                  </Text>
                  <Text className="w-16 text-gray-900 p-2">{record.days}</Text>
                  <Text className="w-44 text-gray-900 p-2">
                    {record.reason}
                  </Text>
                  <Text
                    className={`w-24 p-2 font-bold ${
                      record.status === "Approved"
                        ? "text-green-600"
                        : record.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {record.status}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Modal for New LOP Request */}
      <Modal visible={isFormOpen} animationType="slide">
        <View className="flex-1 p-4">
          <Text className="text-2xl font-bold text-blue-600 py-3 ">
            New LOP Request
          </Text>

          {/* Start Date Section */}
          <View className="bg-blue-50 rounded-lg p-4 mb-4">
            <Text className="text-xl font-bold text-blue-600 mb-2">
              Start Date:
            </Text>
            <View className="bg-white flex-row rounded-lg p-2">
              <Icon
                name="calendar-today"
                size={24}
                color="#2563eb"
                style={{ marginHorizontal: 10 }}
              />
              <TextInput
                className="bg-white rounded-lg px-2"
                placeholder="YYYY-MM-DD"
                value={newLOP.startDate}
                onChangeText={(value) => handleInputChange("startDate", value)}
              />
            </View>
          </View>

          {/* End Date Section */}
          <View className="bg-blue-50 rounded-lg p-4 mb-4">
            <Text className="text-xl font-bold text-blue-600 mb-2">
              End Date:
            </Text>
            <View className="bg-white flex-row rounded-lg p-2">
              <Icon
                name="calendar-today"
                size={24}
                color="#2563eb"
                style={{ marginHorizontal: 10 }}
              />
              <TextInput
                className="bg-white rounded-lg px-2"
                placeholder="YYYY-MM-DD"
                value={newLOP.endDate}
                onChangeText={(value) => handleInputChange("endDate", value)}
              />
            </View>
          </View>

          {/* Reason for Leave */}
          <View className="bg-blue-50 rounded-lg p-4 mb-4">
            <Text className="text-xl font-bold text-blue-600 mb-2">
              Reason for Leave:
            </Text>

            <View className="bg-white flex-row rounded-lg p-2">
              <Icon
                name="text-snippet"
                size={24}
                color="#2563eb"
                style={{ marginHorizontal: 10 }}
              />
              <TextInput
                className="flex-1 pl-2"
                placeholder="Please specify your reason for leave"
                value={newLOP.reason}
                onChangeText={(value) => handleInputChange("reason", value)}
                multiline={true}
                numberOfLines={5}
                textAlignVertical="top"
                style={{ maxHeight: 100 }}
              />
            </View>
          </View>

          {/* Submit */}
          <View className="flex-row justify-end mt-4">
            <TouchableOpacity
              onPress={() => setIsFormOpen(false)}
              className="bg-gray-200 py-4 px-6 rounded-md mr-2"
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-blue-600 py-4 px-6 rounded-md"
            >
              <Text className="text-white">Submit Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EmployeeLOP;
