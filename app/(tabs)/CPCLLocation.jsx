import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { images } from "../../constants/images";
import * as Location from "expo-location";

const locations = [
  {
    id: 1,
    name: "Manali Refinery",
    address: "Manali, Chennai, Tamil Nadu 600068",
    phone: "+91 44 2594 4000",
    email: "manali@cpcl.co.in",
    description: "Main refinery complex with a capacity of 10.5 MMTPA.",
    coordinates: { latitude: 13.162068, longitude: 80.269695 },
  },
  {
    id: 2,
    name: "Cauvery Basin Refinery",
    address: "Nagapattinam, Tamil Nadu 611002",
    phone: "+91 4365 256 800",
    email: "cbr@cpcl.co.in",
    description: "Secondary refinery with a capacity of 1 MMTPA.",
    coordinates: { latitude: 10.7663, longitude: 79.8345 },
  },
  {
    id: 3,
    name: "Corporate Office",
    address: "536, Anna Salai, Teynampet, Chennai 600018",
    phone: "+91 44 2434 6807",
    email: "corporate@cpcl.co.in",
    description: "CPCL headquarters and administrative center.",
    coordinates: { latitude: 13.0377, longitude: 80.2634 },
  },
  {
    id: 4,
    name: "R&D Centre",
    address: "Manali, Chennai, Tamil Nadu 600068",
    phone: "+91 44 2594 4500",
    email: "rnd@cpcl.co.in",
    description:
      "Center for innovation and technological advancements in refining.",
    coordinates: { latitude: 13.162, longitude: 80.269 },
  },
];

const CPCLLocation = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setLocationPermission(true);
        const location = await Location.getCurrentPositionAsync({});
        setCurrentPosition(location.coords); // Store user's current location
      } else {
        setLocationPermission(false);
        Alert.alert(
          "Location Permission",
          "Permission to access location was denied."
        );
      }
    })();
  }, []);

  const handleLocationSelect = (location) => {
    if (location.coordinates) {
      setSelectedLocation(location);
      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude: location.coordinates.latitude,
            longitude: location.coordinates.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          1000
        );
      }
    } else {
      console.error("Coordinates not defined for this location.");
    }
  };

  const handleGetDirections = async () => {
    if (selectedLocation) {
      const { latitude, longitude } = selectedLocation.coordinates;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Unable to open directions in Maps.");
      }
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row justify-between items-center p-6 bg-blue-600">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">CPCL Location</Text>
        <Image source={images.smallLogo} className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1 px-4 py-8">
        <View className="rounded-lg">
          <View className="bg-blue-600 p-6 rounded-lg">
            <Text className="text-xl font-semibold text-white">
              CPCL Locations
            </Text>
          </View>
          <View className="py-6">
            <View className="flex-row flex-wrap justify-between">
              {locations.map((location) => (
                <TouchableOpacity
                  key={location.id}
                  className="w-[48%] rounded-lg p-4 mb-4 bg-blue-50"
                  onPress={() => handleLocationSelect(location)}
                >
                  <Text className="font-bold text-blue-600">
                    {location.name}
                  </Text>
                  <Text className="text-sm text-gray-600 mt-2">
                    {location.address.split(",")[0]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {selectedLocation && (
          <View className="bg-white shadow-lg rounded-lg overflow-hidden">
            <View className="bg-blue-600 p-6 rounded-lg">
              <Text className="text-xl font-semibold text-white">
                {selectedLocation.name}
              </Text>
            </View>
            <View className="pb-6">
              {selectedLocation.coordinates && (
                <MapView
                  ref={mapRef}
                  className="rounded-lg my-4"
                  style={{ height: 300, borderRadius: 8 }}
                  initialRegion={{
                    latitude: selectedLocation.coordinates.latitude,
                    longitude: selectedLocation.coordinates.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                >
                  <Marker
                    coordinate={selectedLocation.coordinates}
                    title={selectedLocation.name}
                    description={selectedLocation.description}
                  />
                </MapView>
              )}

              <View className="space-y-4 bg-blue-50 p-4 rounded-lg">
                <View className="flex-row items-center">
                  <Icon name="location-on" size={20} color="#3B82F6" />
                  <Text className="ml-2 text-gray-700">
                    {selectedLocation.address}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Icon name="phone" size={20} color="#3B82F6" />
                  <Text className="ml-2 text-gray-700">
                    {selectedLocation.phone}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Icon name="email" size={20} color="#3B82F6" />
                  <Text className="ml-2 text-gray-700">
                    {selectedLocation.email}
                  </Text>
                </View>
                <Text className="text-gray-600">
                  {selectedLocation.description}
                </Text>
                <TouchableOpacity
                  onPress={handleGetDirections}
                  className="mt-4 mb-7 bg-blue-600 rounded-lg p-4"
                >
                  <Text className="text-white text-center">Get Directions</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CPCLLocation;
