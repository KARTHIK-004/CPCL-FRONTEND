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
  ActivityIndicator,
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
  const [loading, setLoading] = useState(true); // Manage loading state
  const [filteredEmployees, setFilteredEmployees] = useState(users);
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage, setEmployeesPerPage] = useState(5);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedroles, setSelectedroles] = useState([]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isPerPageModalVisible, setIsPerPageModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEmployeeModalVisible, setIsEmployeeModalVisible] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://cpcl.onrender.com/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false when data is fetched
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
      const employeeMobile = employee.mobileNo || "";
      const employeeEmail = employee.email?.toLowerCase() || "";

      return (
        (searchTerm === "" ||
          employeeName.includes(searchTerm.toLowerCase()) ||
          employeeDepartment.includes(searchTerm.toLowerCase()) ||
          employeeRole.includes(searchTerm.toLowerCase()) ||
          employeePrno.includes(searchTerm) ||
          employeeMobile.includes(searchTerm) ||
          employeeEmail.includes(searchTerm.toLowerCase())) &&
        (selectedDepartments.length === 0 ||
          selectedDepartments.includes(employee.department)) &&
        (selectedroles.length === 0 || selectedroles.includes(employee.role))
      );
    });

    setFilteredEmployees(filtered);
    setCurrentPage(1); // Reset to the first page whenever filters are applied
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
      const aValue = a[sortColumn] || "";
      const bValue = b[sortColumn] || "";
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
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

  const renderSortIcon = (column) => {
    if (sortColumn === column) {
      return (
        <Icon
          name={sortDirection === "asc" ? "arrow-upward" : "arrow-downward"}
          size={14}
          color="#2563eb"
        />
      );
    }
    return null;
  };

  const handleEmployeePress = (employee) => {
    setSelectedEmployee(employee);
    setIsEmployeeModalVisible(true);
  };

  const renderEmployeeItem = ({ item }) => (
    <View className="flex-row border-b border-blue-50 p-2 items-center align-middle">
      <TouchableOpacity
        className="w-36 flex-row items-center"
        onPress={() => handleEmployeePress(item)}
      >
        <Image
          source={{ uri: item.photo }}
          className="w-10 h-10 rounded-full mr-3"
        />
        <Text className="text-sm font-medium">{item.name}</Text>
      </TouchableOpacity>
      <View className="w-32 flex-row items-center">
        <Text className="text-sm">{item.department}</Text>
      </View>
      <View className="w-32 flex-row items-center">
        <Text className="text-sm">{item.role}</Text>
      </View>
      <View className="w-32 flex-row items-center">
        <Text className="text-sm">{item.prno}</Text>
      </View>
      <View className="w-32 flex-row items-center">
        <Text className="text-sm">{item.mobileNo}</Text>
      </View>
      <View className="w-56 flex-row items-center">
        <Text className="text-sm text-blue-600">{item.email}</Text>
      </View>
    </View>
  );

  // Loading Spinner when data is fetching
  if (loading) {
    return (
      <View className="bg-white flex-1">
        <View className="flex-row justify-between items-center p-6 bg-blue-600">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Icon name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold">
            Telephone Directory
          </Text>
          <Image source={images.smallLogo} className="w-10 h-10" />
        </View>
        <View className="flex-1 justify-center items-center bg-white">
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      </View>
    );
  }

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

      {/* Search and Filters */}
      <View className="p-4">
        <View className="mb-4 ">
          <View className="bg-blue-600 px-6 py-4 rounded-lg">
            <Text className="text-xl font-semibold text-white">
              Search Employee :
            </Text>
            <View className="relative pt-2">
              <TextInput
                className="bg-white px-10 py-2 rounded-lg shadow-sm"
                placeholder="Search by name, dept, role, Id, mobile..."
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

      {/* Directory Content */}
      <ScrollView horizontal className="px-4">
        <View>
          <View className="flex-row bg-blue-50 py-2 mb-2 p-4">
            <TouchableOpacity
              className="w-32 flex-row items-center"
              onPress={() => handleSort("name")}
            >
              <Text className="font-bold text-blue-600 mr-1">NAME</Text>
              {renderSortIcon("name")}
            </TouchableOpacity>
            <TouchableOpacity
              className="w-32 flex-row items-center"
              onPress={() => handleSort("department")}
            >
              <Text className="font-bold text-blue-600 mr-1">DEPARTMENT</Text>
              {renderSortIcon("department")}
            </TouchableOpacity>
            <TouchableOpacity
              className="w-32 flex-row items-center"
              onPress={() => handleSort("role")}
            >
              <Text className="font-bold text-blue-600 mr-1">ROLE</Text>
              {renderSortIcon("role")}
            </TouchableOpacity>
            <TouchableOpacity
              className="w-32 flex-row items-center"
              onPress={() => handleSort("prno")}
            >
              <Text className="font-bold text-blue-600 mr-1">EMP ID</Text>
              {renderSortIcon("prno")}
            </TouchableOpacity>
            <TouchableOpacity
              className="w-32 flex-row items-center"
              onPress={() => handleSort("mobileNo")}
            >
              <Text className="font-bold text-blue-600 mr-1">MOBILE NO</Text>
              {renderSortIcon("mobileNo")}
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => handleSort("email")}
            >
              <Text className="font-bold text-blue-600 mr-1">EMAIL</Text>
              {renderSortIcon("email")}
            </TouchableOpacity>
          </View>
          <FlatList
            data={currentEmployees}
            renderItem={renderEmployeeItem}
            keyExtractor={(item) => item._id.toString()}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      {/* Pagination */}
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

      {/* Modals */}
      {/* Filter Modal */}
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
              <Text className="font-medium mb-2 text-blue-600">Roles</Text>
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

      {/* Per Page Modal */}
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

      {/* Employee Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEmployeeModalVisible}
        onRequestClose={() => setIsEmployeeModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-white bg-opacity-50">
          <View className="bg-blue-50 rounded-lg p-6 w-11/12 max-w-md">
            {selectedEmployee && (
              <>
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-2xl font-bold text-blue-600">
                    Employee Details
                  </Text>
                  <TouchableOpacity
                    onPress={() => setIsEmployeeModalVisible(false)}
                  >
                    <Icon name="close" size={24} color="#4B5563" />
                  </TouchableOpacity>
                </View>
                <View className="bg-blue-50 rounded-lg p-4 mb-6">
                  <View className="bg-blue-50 rounded-lg p-4 mb-6 flex flex-col items-center">
                    <View className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                      <Image
                        source={{
                          uri:
                            selectedEmployee.profile ||
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                        }}
                        className="w-full h-full rounded-full"
                      />
                    </View>
                    <Text className="text-2xl font-bold mb-1 text-blue-600">
                      {selectedEmployee.name}
                    </Text>
                    <Text className="text-gray-600 mb-2">
                      {selectedEmployee.role}
                    </Text>
                    <Text className="text-sm bg-blue-600 text-white px-3 py-1 rounded-full">
                      Employee ID: {selectedEmployee.prno}
                    </Text>
                  </View>
                  <View className="space-y-4">
                    {[
                      {
                        icon: "business",
                        label: "Department",
                        value: selectedEmployee.department,
                      },
                      {
                        icon: "email",
                        label: "Email",
                        value: selectedEmployee.email,
                      },
                    ].map(({ icon, label, value }, index) => (
                      <View key={index} className="flex flex-row items-center ">
                        <Icon name={icon} size={24} color="#2563eb" />
                        <View>
                          <Text className="text-gray-600 text-sm ml-3">
                            {label}
                          </Text>
                          <Text className="text-gray-800 ml-3">{value}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
