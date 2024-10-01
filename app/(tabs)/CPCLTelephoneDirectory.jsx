import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { images } from "../../constants/images";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

export default function TelephoneDirectory() {
  const departments = [
    "Engineering",
    "Human Resources",
    "Finance",
    "IT",
    "Fire Services",
    "Marketing",
    "Sales",
    "Research and Development",
    "Legal",
    "Quality Control",
    "Security",
    "Health and Safety",
    "Training and Development",
  ];

  const roles = ["Admin", "Staff", "Intern", "Hr", "Manager", "Developer"];

  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredEmployees, setFilteredEmployees] = useState(users);
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage, setEmployeesPerPage] = useState(5);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedroles, setSelectedroles] = useState([]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isPerPageModalVisible, setIsPerPageModalVisible] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://192.168.249.56:3000/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredEmployees(users);
  }, [users]);

  useEffect(() => {
    const filtered = users.filter((employee) => {
      const employeeName = employee.name?.toLowerCase() || "";
      const employeeDepartment = employee.department?.toLowerCase() || "";
      const employeeRole = employee.role?.toLowerCase() || "";
      const employeePrno = employee.prno || "";

      return (
        (searchTerm === "" ||
          employeeName.includes(searchTerm.toLowerCase()) ||
          employeeDepartment.includes(searchTerm.toLowerCase()) ||
          employeeRole.includes(searchTerm.toLowerCase()) ||
          employeePrno.includes(searchTerm)) &&
        (selectedDepartments.length === 0 ||
          selectedDepartments.includes(employee.department)) &&
        (selectedroles.length === 0 || selectedroles.includes(employee.role))
      );
    });

    setFilteredEmployees(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedDepartments, selectedroles, users]);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedEmployees = useMemo(() => {
    return [...filteredEmployees].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn])
        return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn])
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredEmployees, sortColumn, sortDirection]);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = sortedEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderEmployeeItem = ({ item }) => (
    <View className="flex-row border-b border-blue-50 p-2 items-center align-middle">
      <View className="w-36 flex-row items-center">
        <Image
          source={{ uri: item.photo }}
          className="w-10 h-10 rounded-full mr-3"
        />
        <Text className="text-sm font-medium">{item.name}</Text>
      </View>
      <View className="w-32">
        <Text className="text-sm">{item.department}</Text>
      </View>
      <View className="w-32">
        <Text className="text-sm">{item.role}</Text>
      </View>
      <View className="w-32">
        <Text className="text-sm">{item.prno}</Text>
      </View>
      <View className="w-32">
        <Text className="text-sm">{item.mobileNo}</Text>
      </View>
      <View className="w-56">
        <Text className="text-sm text-blue-600">{item.email}</Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      {/* Header */}
      <View className="flex-row justify-between items-center p-6 bg-blue-600">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">
          Telephone Directory
        </Text>
        <Image source={images.smallLogo} className="w-10 h-10" />
      </View>

      <View className="p-4">
        <View className="mb-4 ">
          <View className="bg-blue-600 px-6 py-4 rounded-lg">
            <Text className="text-xl font-semibold text-white">
              Search Employee :
            </Text>
            <View className="relative pt-2">
              <TextInput
                className="bg-white px-10 py-2 rounded-lg shadow-sm"
                placeholder="Search by name, dept, role, Id..."
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
              <View className="absolute left-3 top-5">
                <Icon name="search" color="gray" size={20} />
              </View>
            </View>
          </View>
        </View>
        <View className="flex-row justify-between items-center mb-4">
          <TouchableOpacity
            className="bg-blue-600 px-4 py-2 rounded-lg flex flex-row"
            onPress={() => setIsFilterModalVisible(true)}
          >
            <Icon name="filter-list" size={20} color="white" />
            <Text className="text-white pl-2">Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-blue-600 px-4 py-2 rounded-lg flex flex-row"
            onPress={() => setIsPerPageModalVisible(true)}
          >
            <Text className="text-white pr-2">
              Per Page: {employeesPerPage}
            </Text>
            <Icon name="arrow-drop-down" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Text className="text-sm text-gray-600 ">
          Showing {indexOfFirstEmployee + 1} to{" "}
          {Math.min(indexOfLastEmployee, filteredEmployees.length)} of{" "}
          {filteredEmployees.length}
        </Text>
      </View>

      <ScrollView horizontal className="px-4">
        <View>
          <View className="flex-row bg-blue-50 py-2 mb-2 p-4  ">
            <Text className="w-32 font-bold text-blue-600">Name</Text>
            <Text className="w-32 font-bold text-blue-600">Department</Text>
            <Text className="w-32 font-bold text-blue-600">Role</Text>
            <Text className="w-36 font-bold text-blue-600">Employee ID</Text>
            <Text className="w-32 font-bold text-blue-600">Mobile</Text>
            <Text className=" font-bold text-blue-600">Email</Text>
          </View>
          <FlatList
            data={currentEmployees}
            renderItem={renderEmployeeItem}
            keyExtractor={(item) => item._id.toString()}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      <View className="flex-row justify-center items-center py-4">
        {Array.from(
          { length: Math.ceil(filteredEmployees.length / employeesPerPage) },
          (_, i) => (
            <TouchableOpacity
              key={i}
              className={`mx-1 px-3 py-1 rounded-full ${
                currentPage === i + 1 ? "bg-blue-600" : "bg-blue-50"
              }`}
              onPress={() => paginate(i + 1)}
            >
              <Text
                className={
                  currentPage === i + 1 ? "text-white" : "text-slate-700"
                }
              >
                {i + 1}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => setIsFilterModalVisible(false)}
      >
        <View className="flex-1 justify-end">
          <View className="bg-white rounded-t-lg p-4">
            <Text className="text-lg font-bold mb-4 text-blue-600">
              Filter Options
            </Text>
            <View className="mb-4">
              <Text className="font-medium mb-2 text-blue-600">
                Departments
              </Text>
              <ScrollView className="max-h-40">
                {departments.map((dept) => (
                  <TouchableOpacity
                    key={dept}
                    className={`p-2 rounded-md mb-2 ${
                      selectedDepartments.includes(dept)
                        ? "bg-blue-600"
                        : "bg-blue-50"
                    }`}
                    onPress={() => {
                      setSelectedDepartments((prev) =>
                        prev.includes(dept)
                          ? prev.filter((d) => d !== dept)
                          : [...prev, dept]
                      );
                    }}
                  >
                    <Text
                      className={
                        selectedDepartments.includes(dept)
                          ? "text-white"
                          : "text-black"
                      }
                    >
                      {dept}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View className="mb-4">
              <Text className="font-medium mb-2 text-blue-600">roles</Text>
              <ScrollView className="max-h-40">
                {roles.map((pos) => (
                  <TouchableOpacity
                    key={pos}
                    className={`p-2 rounded-md mb-2 ${
                      selectedroles.includes(pos) ? "bg-blue-600" : "bg-blue-50"
                    }`}
                    onPress={() =>
                      setSelectedroles((prev) =>
                        prev.includes(pos)
                          ? prev.filter((p) => p !== pos)
                          : [...prev, pos]
                      )
                    }
                  >
                    <Text
                      className={
                        selectedroles.includes(pos)
                          ? "text-white"
                          : "text-black"
                      }
                    >
                      {pos}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <TouchableOpacity
              className="bg-blue-600 p-2 rounded-md"
              onPress={() => setIsFilterModalVisible(false)}
            >
              <Text className="text-white text-center">Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isPerPageModalVisible}
        onRequestClose={() => setIsPerPageModalVisible(false)}
      >
        <View className="flex-1 justify-end">
          <View className="bg-white rounded-t-lg p-4 ">
            <Text className="text-lg font-bold mb-4 text-blue-600">
              Employees Per Page
            </Text>
            {[4, 8].map((number) => (
              <TouchableOpacity
                key={number}
                className={`p-2 rounded-md mb-2 ${
                  employeesPerPage === number ? "bg-blue-600" : "bg-blue-50"
                }`}
                onPress={() => {
                  setEmployeesPerPage(number);
                  setIsPerPageModalVisible(false);
                }}
              >
                <Text
                  className={
                    employeesPerPage === number ? "text-white" : "text-black"
                  }
                >
                  {number}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}
