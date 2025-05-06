// Setup New Account Screen: Page 2 --> Setup new room
// -----------------------------------------------------
// Part 2 of the Setup process, choose a room from the list to
// add a new device to.

// Import components
import React, { useState } from "react";
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
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddRoomScreen() {
  // Stores the home name to display in the header
  const [homeName, setHomeName] = useState("");
  // Navigation control
  const router = useRouter();
  // Stores the selected room name
  const [selectedRoom, setSelectedRoom] = useState("");

  // Load stored home name on component mount
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

  // Called when the user presses the "Next" button
  const handleNext = async () => {
    console.log("Room selected:", selectedRoom);
    // Require a room selection
    if (selectedRoom == null) {
      alert("Please select a room before continuing.");
      return;
    } else {
      try {
        // Map room names to backend room IDs
        const roomId =
          selectedRoom === "Living Room"
            ? 2
            : selectedRoom === "Bedroom"
            ? 3
            : selectedRoom === "Dining Room"
            ? 4
            : null;

        if (!roomId) {
          alert("Invalid room selected.");
          return;
        }
        // Save selected room to local storage and continue to device setup
        await AsyncStorage.setItem("selectedRoom", selectedRoom);
        router.replace("/setup-new-device");
      } catch (error) {
        console.error("Error saving selected room:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Card layout to group and style inner content */}
      <View style={styles.card}>
        {/* Display app icon */}
        <Image
          source={require("@/assets/images/SmartThingies.png")}
          style={styles.icon}
          resizeMode="contain"
        />

        {/* Display the current home name and instructions */}
        <Text style={styles.title}>{`${homeName}`}</Text>
        <Text style={styles.subtitle}>Next, add a room to your home:</Text>

        {/* Dropdown for selecting a room */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedRoom}
            onValueChange={(itemValue) => setSelectedRoom(itemValue)}
            style={styles.picker}
            dropdownIconColor="#211D1D"
          >
            {/* Placeholder option when nothing is selected */}
            {selectedRoom === "" && (
              <Picker.Item
                label="Select room from list"
                value=""
                enabled={false}
                color="#999"
              />
            )}
            {/* Available room options */}
            <Picker.Item label="Living Room" value="Living Room" />
            <Picker.Item label="Bedroom" value="Bedroom" />
            <Picker.Item label="Dining Room" value="Dining Room" />
          </Picker>
        </View>

        {/* Button to continue to the next setup screen */}
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
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
  buttonText: {
    color: "#211D1D",
    fontSize: 16,
    fontWeight: "600",
  },
});
