import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList } from "react-native";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://192.168.249.56:3000/api/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const getTodayBirthdays = (users) => {
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth() + 1;
    return users.filter((user) => {
      const userBirthday = new Date(user.dob);
      return (
        userBirthday.getDate() === todayDate &&
        userBirthday.getMonth() + 1 === todayMonth
      );
    });
  };

  const renderItem = ({ item }) => (
    <View className="p-4 border-b border-gray-200">
      <Image source={{ uri: item.photo }} style={{ width: 50, height: 50 }} />
      <Text className="text-lg font-semibold">{item.name}</Text>
      <Text>PR No: {item.prno}</Text>
      <Text>Mobile No: {item.mobileNo}</Text>
      <Text>Department: {item.department}</Text>
      <Text>DOB: {item.dob}</Text>
      {item.role && <Text>Role: {item.role}</Text>}
    </View>
  );

  const todayBirthdays = getTodayBirthdays(users);

  return (
    <FlatList
      data={todayBirthdays}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      ListEmptyComponent={
        <Text className="text-center p-4">No birthdays today!</Text>
      }
    />
  );
};

export default UserList;
