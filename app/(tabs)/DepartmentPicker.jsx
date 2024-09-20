import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View, ScrollView } from "react-native";

const DepartmentPicker = ({ selectedValue, onValueChange }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const departments = [
    'Engineering',
    'Human Resources',
    'Finance',
    'IT',
    'Fire Services',
    'Marketing',
    'Sales',
    'Research and Development',
    'Legal',
    'Quality Control',
    'Security',
    'Health and Safety',
    'Training and Development',
  ];

  return (
    <View>
      <TouchableOpacity
        className="p-3 border border-gray-300 bg-white mb-3"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-lg">
          {selectedValue || 'Select Department'}
        </Text>
      </TouchableOpacity>

      {/* Modal for showing department options */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-4/5 bg-white rounded-xl p-5">
            <Text className="text-xl mb-4">Select Department</Text>
            <ScrollView>
              {departments.map((dept, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    onValueChange(dept);
                    setModalVisible(false);
                  }}
                  className="p-3 border-b border-gray-300"
                >
                  <Text>{dept}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Close Button */}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="mt-5 bg-blue-600 py-3 rounded-lg"
            >
              <Text className="text-white text-center">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DepartmentPicker;
