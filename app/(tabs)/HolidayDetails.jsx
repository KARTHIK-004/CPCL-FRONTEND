import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { images } from "../../constants/images";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const HolidayDetails = () => {
  const [expandedHoliday, setExpandedHoliday] = useState(null);
  const navigation = useNavigation();

  const holidays = [
    {
      date: "2024-01-01",
      name: "New Year's Day",
      description: "Celebration of the new year",
      type: "National",
    },
    {
      date: "2024-01-15",
      name: "Pongal",
      description: "Harvest festival celebrated in South India",
      type: "Regional",
    },
    {
      date: "2024-01-26",
      name: "Republic Day",
      description: "Commemorates the adoption of the Constitution of India",
      type: "National",
    },
    {
      date: "2024-04-09",
      name: "Ugadi",
      description:
        "New Year's Day for the states of Andhra Pradesh and Karnataka",
      type: "Regional",
    },
    {
      date: "2024-08-15",
      name: "Independence Day",
      description: "Celebrates India's independence from British rule",
      type: "National",
    },
    {
      date: "2024-10-02",
      name: "Gandhi Jayanti",
      description: "Birthday of Mahatma Gandhi",
      type: "National",
    },
    {
      date: "2024-10-12",
      name: "Ayudha Puja",
      description: "Worship of implements and machines",
      type: "Regional",
    },
    {
      date: "2024-11-01",
      name: "CPCL Foundation Day",
      description:
        "Celebrates the founding of Chennai Petroleum Corporation Limited",
      type: "Company",
    },
    {
      date: "2024-12-25",
      name: "Christmas",
      description: "Celebration of the birth of Jesus Christ",
      type: "National",
    },
  ];

  const toggleHolidayDetails = (date) => {
    setExpandedHoliday(expandedHoliday === date ? null : date);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row justify-between items-center p-6 bg-blue-600">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text className="text-white text-2xl font-bold">Holiday Details</Text>
        <Image source={images.smallLogo} className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1 px-5 py-8">
        <View className="bg-white shadow-lg rounded-lg overflow-hidden">
          <View className="bg-blue-600 p-6 flex-row justify-between items-center rounded-lg">
            <Text className="text-xl font-semibold text-white">
              Holiday Details
            </Text>
          </View>
          <View className="py-6">
            <View className="space-y-4">
              {holidays.map((holiday) => (
                <View key={holiday.date} className=" bg-blue-50 rounded-lg">
                  <TouchableOpacity
                    className="w-full px-4 py-3 flex-row justify-between items-center"
                    onPress={() => toggleHolidayDetails(holiday.date)}
                  >
                    <View>
                      <Text className="font-bold text-blue-600">
                        {holiday.name}
                      </Text>
                      <Text className="text-sm text-gray-500">
                        {new Date(holiday.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <View
                        className={`px-2 py-1 rounded-full ${
                          holiday.type === "National"
                            ? "bg-green-100"
                            : holiday.type === "Regional"
                            ? "bg-yellow-100"
                            : "bg-blue-100"
                        }`}
                      >
                        <Text
                          className={`text-xs font-semibold ${
                            holiday.type === "National"
                              ? "text-green-800"
                              : holiday.type === "Regional"
                              ? "text-yellow-800"
                              : "text-blue-800"
                          }`}
                        >
                          {holiday.type}
                        </Text>
                      </View>
                      <Icon
                        name={
                          expandedHoliday === holiday.date
                            ? "expand-less"
                            : "expand-more"
                        }
                        size={24}
                        color="#9CA3AF"
                        className="ml-2"
                      />
                    </View>
                  </TouchableOpacity>
                  {expandedHoliday === holiday.date && (
                    <View className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                      <Text className="text-sm text-gray-700">
                        {holiday.description}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HolidayDetails;
