// Setup New Account Screen: Page 3 --> Setup new device
// -----------------------------------------------------
// Part 3 of the Setup process, choose a device from the list to
// add to room chosen in Part 2

// Import components
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function AddDeviceScreen() {
  // Navigation control
  const router = useRouter();

  // States to track selected device, room, and home name
  const [selectedDevice, setSelectedDevice] = useState("");
  const [homeName, setHomeName] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  // Load selected room from local storage on mount
  useEffect(() => {
    const loadSelectedRoom = async () => {
      try {
        const storedRoom = await AsyncStorage.getItem("selectedRoom");
        if (storedRoom) {
          setSelectedRoom(storedRoom);
        }
      } catch (error) {
        console.error("Failed to load selected room:", error);
      }
    };

    loadSelectedRoom();
  }, []);
  // Load home name from local storage on mount
  useEffect(() => {
    const loadHomeName = async () => {
      try {
        const storedHomeName = await AsyncStorage.getItem("homeName");
        if (storedHomeName) {
          setHomeName(storedHomeName);
        }
      } catch (error) {
        console.error("Failed to load home name:", error);
      }
    };

    loadHomeName();
  }, []);

  // Handle logic when user clicks "Next"
  const handleNext = async () => {
    if (!selectedDevice) {
      alert("Please select a device before continuing.");
      return;
    }

    // Map selected room name to corresponding backend room ID
    try {
      const roomId =
        selectedRoom === "Living Room"
          ? 2
          : selectedRoom === "Bedroom"
          ? 3
          : selectedRoom === "Dining Room"
          ? 4
          : "";

      if (!roomId) {
        alert("Invalid room selected.");
        return;
      }

      let deviceTypeId;

      // Map selected device to corresponding device type ID
      switch (selectedDevice) {
        case "Smart bulb":
          deviceTypeId = 2; // Smart bulb ID
          break;
        case "Vacuum cleaner":
          deviceTypeId = 1; // Vacuum cleaner ID
          break;
        case "Humidifier":
          deviceTypeId = 3; // Humidifier ID
          break;
        default:
          deviceTypeId = 7; // Unknown device ID
          break;
      }

      // Send POST request to create device
      const response = await fetch("http://146.190.130.85:8000/create-device", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: selectedDevice,
          type_id: deviceTypeId,
          room_id: roomId,
        }),
      });

      // Retrieve server response
      const data = await response.json();

      if (response.ok) {
        alert("Device added successfully!");
        console.log("Device added:", data);
        router.replace("/(tabs)"); // Navigate back to the main tabs
      } else {
        alert("Failed to add device.");
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the device.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Card layout to hold the image, text, picker, and button */}
      <View style={styles.card}>
        <Image
          source={require("@/assets/images/SmartThingies.png")}
          style={styles.icon}
          resizeMode="contain"
        />

        {/* Title and subtitle prompting user to add a device */}
        <Text style={styles.title}>Add Your First Device</Text>
        <Text style={styles.subtitle}>Next, add a device to your room:</Text>

        <View style={styles.pickerWrapper}>
          {/* Device selection dropdown */}
          <Picker
            selectedValue={selectedDevice}
            onValueChange={(value) => setSelectedDevice(value)}
            style={styles.picker}
            dropdownIconColor="#211D1D"
          >
            {/* Disabled default option shown when nothing is selected */}
            {selectedDevice === "" && (
              <Picker.Item
                label="Select device from list"
                value=""
                enabled={false}
                color="#999"
              />
            )}
            <Picker.Item label="Vacuum cleaner" value="Vacuum cleaner" />
            <Picker.Item label="Smart bulb" value="Smart bulb" />
            <Picker.Item label="Humidifier" value="Humidifier" />
          </Picker>
        </View>

        {/* "Next" button to proceed after selecting a device */}
        <TouchableOpacity
          style={[styles.button, !selectedDevice && styles.buttonDisabled]}
          onPress={handleNext}
          disabled={!selectedDevice}
        >
          <Text
            style={[
              styles.buttonText,
              !selectedDevice && styles.buttonTextDisabled,
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Define visual styles for all parts of the screen (colors, spacing, fonts, layout).
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#211D1D",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  wifi: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    left: 24,
    color: "#AAA",
    fontSize: 12,
  },
  card: {
    width: "100%",
    backgroundColor: "#1A1616",
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 10,
    padding: 24,
    alignItems: "center",
  },
  icon: {
    width: 64,
    height: 64,
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  title: {
    color: "#FFB267",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    color: "#DDD",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  pickerWrapper: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 6,
    marginBottom: 20,
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: 50,
    color: "#211D1D",
  },
  button: {
    backgroundColor: "#FFB267",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#888",
  },
  buttonText: {
    color: "#211D1D",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextDisabled: {
    color: "#ccc",
  },
});
