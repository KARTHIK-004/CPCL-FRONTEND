import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../constants/images";
import MapView, { Marker } from "react-native-maps";

const CPCLLocation = () => {
  const navigation = useNavigation();

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 13.162068145057114,
    longitude: 80.26969585183697,
    title: "Corporate and Registered Office",
    description: "Chennai Petroleum Corporation Ltd",
  });

  const locations = [
    {
      title: "Corporate and Registered Office",
      address: "#536, Anna Salai, Teyanampet",
      city: "Chennai - 600018",
      telephone: "EPABX-24340181",
      fax: "-",
      coordinates: {
        latitude: 13.162068145057114,
        longitude: 80.26969585183697,
      },
      description: "Corporate office located in Teyanampet, Chennai.",
    },
    {
      title: "Refineries and Administrative Office",
      address: "Manali",
      city: "Chennai - 600068",
      telephone: "EPABX-25940000-9",
      fax: "-",
      coordinates: { latitude: 13.161, longitude: 80.26 },
      description: "Refinery and admin office situated in Manali.",
    },
    {
      title: "Cauvery Basin Refinery",
      address: "Panangudi, Nagapattinam Taluk",
      city: "Nagapattinam - 611002",
      telephone: "(04365)256416",
      fax: "-",
      coordinates: { latitude: 10.7668, longitude: 79.847 },
      description: "Cauvery Basin Refinery located in Nagapattinam.",
    },
    {
      title: "Additional Location",
      address: "Another Place, Chennai",
      city: "Chennai - 600069",
      telephone: "EPABX-25940000-9",
      fax: "-",
      coordinates: { latitude: 13.16, longitude: 80.261 },
      description: "An additional location in Chennai.",
    },
  ];

  const handleLocationSelect = (location) => {
    setSelectedLocation({
      latitude: location.coordinates.latitude,
      longitude: location.coordinates.longitude,
      title: location.title,
      description: location.description,
    });
  };

  return (
    <ScrollView className="bg-white flex-1">
      {/* Header */}
      <View className="flex-row justify-between items-center p-6 bg-blue-600">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-back" size={24} className="text-white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold ">CPCL Location</Text>
        <Image source={images.smallLogo} className="w-10 h-10 " />
      </View>
      {/* Location Items */}
      <View className="p-5">
        <View className="pb-5">
          {selectedLocation && (
            <View className="bg-blue-50 rounded-lg shadow-lg overflow-hidden">
              <View className="p-4 bg-blue-600 text-white">
                <Text className="text-xl font-semibold text-white">
                  Selected Location
                </Text>
              </View>
              <View className="p-4">
                <MapView
                  style={{ height: 300, borderRadius: 8 }}
                  initialRegion={{
                    latitude: selectedLocation.latitude,
                    longitude: selectedLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: selectedLocation.latitude,
                      longitude: selectedLocation.longitude,
                    }}
                    title={selectedLocation.title}
                    description={selectedLocation.description}
                  />
                </MapView>

                <Text className="text-lg font-semibold text-blue-600 my-2">
                  {selectedLocation.title}
                </Text>
                <Text className="text-gray-600 mb-2">
                  {selectedLocation.description}
                </Text>
                <TouchableOpacity className="mt-4 px-20 py-4 items-center flex-row  bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out ">
                  <Icon
                    name="pin-drop"
                    size={20}
                    color="white"
                    className="mr-2"
                  />
                  <Text className="text-white">Get Directions</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        {locations.map((location, index) => (
          <TouchableOpacity
            key={`${location.title}-${index}`}
            onPress={() => handleLocationSelect(location)}
            className="bg-blue-50 p-4 mb-4 shadow-lg rounded-md"
          >
            <Text className="text-[#2563eb] text-2xl font-extrabold mb-4 ">
              {location.title}
            </Text>
            <Text className="text-gray-700 text-lg">
              <Text className="font-bold text-lg">Address: </Text>
              {location.address}
            </Text>
            <Text className="text-gray-700 text-lg">
              <Text className="font-bold text-lg">City: </Text>
              {location.city}
            </Text>
            <Text className="text-gray-700 text-lg">
              <Text className="font-bold">Telephone: </Text>
              {location.telephone}
            </Text>
            <Text className="text-gray-700 text-lg">
              <Text className="font-bold text-lg">Fax: </Text>
              {location.fax}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/*  */}
    </ScrollView>
  );
};

export default CPCLLocation;
