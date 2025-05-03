import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

// Image mapping
const imageMap = {
  "/assets/images/vacuum.png": require("@/assets/images/vacuum.png"),
  "/assets/images/bulb.png": require("@/assets/images/bulb.png"),
  "/assets/images/humidifier.png": require("@/assets/images/humidifier.png"),
  "/assets/images/unknown.png": require("@/assets/images/humidifier.png"),
};

export default function DevicesScreen() {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedDevice, setUpdatedDevice] = useState({
    name: "",
    type_id: "",
    room_id: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await axios.get(
        "http://146.190.130.85:8000/get-devices"
      );
      const mappedDevices = response.data.map((device) => ({
        ...device,
        image: imageMap[device.image] || imageMap["/assets/images/unknown.png"],
      }));
      setDevices(mappedDevices);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  const handleDevicePress = (device) => {
    setSelectedDevice(device);
    setUpdatedDevice({
      name: device.name,
      type_id: device.type_id,
      room_id: device.room_id,
    });
    setModalVisible(true);
  };

  const handleUpdateDevice = async () => {
    try {
      setLoading(true);
      await axios.put(
        `http://146.190.130.85:8000/update-device/${selectedDevice.id}`,
        updatedDevice
      );
      setModalVisible(false);
      fetchDevices();
      Alert.alert("Success", "Device updated successfully!");
    } catch (error) {
      console.error("Error updating device:", error);
      Alert.alert("Error", "Could not update the device.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(
        `http://146.190.130.85:8000/delete-device/${selectedDevice.id}`,
        {
          method: "DELETE",
        }
      );
      setModalVisible(false);
      fetchDevices();
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.title}>All Devices</Text>
        <View style={styles.rightInfo}>
          <Text style={styles.deviceCount}>{devices.length} devices</Text>
          <Ionicons
            name="wifi"
            size={18}
            color="#FFB267"
            style={styles.wifiIcon}
          />
          <Text style={styles.wifiLabel}>Resnet-5G</Text>
        </View>
      </View>

      <FlatList
        data={devices}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleDevicePress(item)}
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.type}>{item.type}</Text>
            {item.room_name && (
              <Text style={styles.room}>{item.room_name}</Text>
            )}
          </TouchableOpacity>
        )}
      />

      {/* Device Detail Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedDevice && (
              <>
                <Image
                  source={selectedDevice.image}
                  style={[
                    styles.image,
                    { width: 70, height: 70, marginBottom: 16 },
                  ]}
                />
                <Text style={[styles.name, { fontSize: 18 }]}>
                  {selectedDevice.name}
                </Text>
                <Text style={[styles.type]}>{selectedDevice.type}</Text>
                {selectedDevice.room_name && (
                  <Text style={styles.room}>{selectedDevice.room_name}</Text>
                )}
                <View style={{ marginBottom: 16 }} />

                {/* Edit form */}
                <TextInput
                  placeholder="Device Name"
                  placeholderTextColor="#888"
                  style={styles.modalInput}
                  value={updatedDevice.name}
                  onChangeText={(text) =>
                    setUpdatedDevice({ ...updatedDevice, name: text })
                  }
                />

                <Picker
                  selectedValue={String(updatedDevice.type_id || "")}
                  onValueChange={(value) =>
                    setUpdatedDevice({
                      ...updatedDevice,
                      type_id: Number(value),
                    })
                  }
                  style={styles.modalPicker}
                  dropdownIconColor="#FFB267"
                >
                  <Picker.Item label="Select Device Type" value="" />
                  <Picker.Item label="Vacuum cleaner" value="1" />
                  <Picker.Item label="Smart bulb" value="2" />
                  <Picker.Item label="Humidifier" value="3" />
                  <Picker.Item label="Unknown" value="7" />
                </Picker>

                <Picker
                  selectedValue={String(updatedDevice.room_id || "")}
                  onValueChange={(value) =>
                    setUpdatedDevice({
                      ...updatedDevice,
                      room_id: Number(value),
                    })
                  }
                  style={styles.modalPicker}
                  dropdownIconColor="#FFB267"
                >
                  <Picker.Item label="Select Room" value="" />
                  <Picker.Item label="Living Room" value="2" />
                  <Picker.Item label="Bedroom" value="3" />
                  <Picker.Item label="Dining Room" value="4" />
                </Picker>

                <Pressable
                  style={styles.modalButton}
                  onPress={handleUpdateDevice}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#211D1D" />
                  ) : (
                    <Text>Update Device</Text>
                  )}
                </Pressable>

                <Pressable style={styles.deleteBtn} onPress={handleDelete}>
                  <Text style={styles.deleteBtnText}>Delete Device</Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.modalButton,
                    { backgroundColor: "#444", marginTop: 8 },
                  ]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={[styles.modalButtonText, { color: "#FFF" }]}>
                    Close
                  </Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={fetchDevices} style={styles.refreshButton}>
        <Ionicons name="refresh" size={16} color="#211D1D" />
        <Text style={styles.refreshText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#211D1D",
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  rightInfo: {
    paddingTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  deviceCount: {
    color: "#FFB267",
    marginRight: 6,
  },
  wifiIcon: {
    marginRight: 4,
  },
  wifiLabel: {
    color: "#FFFFFF",
  },
  grid: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#282424",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    width: "48%",
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 8,
    resizeMode: "contain",
  },
  name: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  type: {
    color: "#FFB267",
    fontSize: 12,
    textAlign: "center",
  },
  room: {
    color: "#AAA",
    fontSize: 12,
    marginTop: 2,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#282424",
    borderRadius: 16,
    padding: 24,
    width: "80%",
    alignItems: "center",
  },
  modalButton: {
    backgroundColor: "#FFB267",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 10,
  },
  modalButtonText: {
    color: "#211D1D",
    fontWeight: "bold",
  },
  deleteBtn: {
    backgroundColor: "#D9534F",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 10,
  },
  deleteBtnText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFB267",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: "flex-end",
    marginBottom: 12,
  },
  refreshText: {
    marginLeft: 6,
    color: "#211D1D",
    fontWeight: "bold",
  },
  modalInput: {
    height: 40,
    borderColor: "#FFB267",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: "100%",
    marginBottom: 10,
    color: "#FFF",
  },
  modalPicker: {
    height: 50,
    width: "100%",
    backgroundColor: "#393535",
    borderRadius: 8,
    marginBottom: 10,
    color: "#FFF",
    paddingHorizontal: 10,
    justifyContent: "center",
  },
});
