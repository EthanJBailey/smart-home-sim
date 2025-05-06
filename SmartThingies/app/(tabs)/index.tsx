// Home Tab

// Import components
import React, { useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import Slider from "@react-native-community/slider";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "@/context/AuthContext";
import { useDeviceContext } from "@/context/DeviceContext";
import { useSliderContext } from "@/context/SliderContext";

// Available room options
const ROOMS = ["Living Room", "Bedroom", "Dining Room"];

// Room image map
const ROOM_IMAGES: { [key: string]: any } = {
  "Dining Room": require("@/assets/images/diningroom.jpg"),
  Bedroom: require("@/assets/images/bedroom.jpg"),
  "Living Room": require("@/assets/images/livingroom.jpg"),
};

// Device description and icon map
const DEVICE_TYPE_MAP: {
  [type: string]: {
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    functionType: string;
  };
} = {
  "vacuum cleaner": {
    icon: "vacuum",
    functionType: "Clean home autonomously.",
  },
  "smart bulb": {
    icon: "lightbulb-on-outline",
    functionType: "Lighting for room.",
  },
  humidifier: {
    icon: "air-humidifier",
    functionType: "Adjusts humidity of room.",
  },
};

export default function HomeScreen() {
  // Show living room by default
  const [selectedRoom, setSelectedRoom] = useState("Living Room");
  // Holds fetched devices
  const [devices, setDevices] = useState([]);
  // Load state of tab
  const [loading, setLoading] = useState(true);
  // User info from AuthContext
  const { setUser } = useAuth();
  const scrollRef = useRef<ScrollView>(null);
  const notificationRef = useRef<View>(null);
  // Navigation control
  const router = useRouter();
  // Device toggle state from context
  const { deviceState, toggleDevice } = useDeviceContext();
  // Slider states (light values) from context
  const {
    mainLightValue,
    floorLampValue,
    setMainLightValue,
    setFloorLampValue,
  } = useSliderContext();

  // Redirect to login if user is not set
  const checkUser = () => {
    if (!setUser) {
      router.replace("./login");
    }
  };

  // Fetch devices from server
  const fetchDevices = async () => {
    try {
      const response = await fetch("http://146.190.130.85:8000/get-devices");
      const data = await response.json();
      setDevices(data);
    } catch (error) {
      console.error("Failed to fetch devices:", error);
    } finally {
      setLoading(false);
    }
  };
  // Re-fetch devices every time screen gains focus
  useFocusEffect(
    useCallback(() => {
      checkUser();
      fetchDevices();
    }, [])
  );

  // Display alerts for each notification
  const handleBellPress = () => {
    notifications.forEach((notif) => Alert.alert(notif.message));
  };

  // Filter devices by selected room
  const roomDevices = devices.filter(
    (device) => device.room_name === selectedRoom
  );

  const notifications = [
    { id: 1, message: "Replace filter in Humidifier" },
    { id: 2, message: "Air Purifier needs maintenance" },
  ];

  return (
    <ScrollView ref={scrollRef} style={styles.container}>
      {/* Background image header based on room */}
      <ImageBackground
        source={ROOM_IMAGES[selectedRoom] || ROOM_IMAGES.livingroom}
        style={styles.headerImage}
        resizeMode="cover"
      >
        {/* Top bar with room selection and bell icon */}
        <View style={styles.topBar}>
          <View style={styles.roomTabsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.roomTabsContent}
            >
              {/* Room selection tabs */}
              {ROOMS.map((room) => (
                <TouchableOpacity
                  key={room}
                  onPress={() => setSelectedRoom(room)}
                >
                  <Text
                    style={[
                      styles.tab,
                      selectedRoom === room && styles.selectedTab,
                    ]}
                  >
                    {room}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Notifications bell */}
          <TouchableOpacity onPress={handleBellPress} style={styles.bell}>
            <Feather name="bell" size={24} color="#FFB267" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Device Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{selectedRoom} Devices</Text>
        {loading ? (
          <Text style={styles.loadingText}>Loading devices...</Text>
        ) : roomDevices.length === 0 ? (
          <Text style={styles.loadingText}>No devices found in this room.</Text>
        ) : (
          <View style={styles.deviceGrid}>
            {roomDevices.map((device) => {
              const deviceType = device.type?.toLowerCase(); // Ensure it's lowercase for matching
              const info = DEVICE_TYPE_MAP[deviceType] || {
                icon: "cog",
                functionType: "Unknown",
              };

              return (
                <View key={device.id} style={styles.deviceCard}>
                  <View style={styles.iconRow}>
                    <MaterialCommunityIcons
                      name={info.icon}
                      size={24}
                      color="#FFB267"
                    />
                    <Text style={styles.deviceTitle}>
                      {deviceState[device.id]?.isOn ? "Running" : "Standby"}
                    </Text>
                  </View>
                  <Text style={styles.deviceSubtitle}>{device.name}</Text>
                  <Text style={styles.functionType}>{info.functionType}</Text>
                  <View style={styles.switchRow}>
                    <Text style={styles.modeLabel}>
                      {device.mode || "Power"}
                    </Text>
                    <Switch
                      value={deviceState[device.id]?.isOn || false}
                      onValueChange={() => toggleDevice(device.id)}
                      thumbColor={
                        deviceState[device.id]?.isOn ? "#FFB267" : "#888"
                      }
                    />
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View>

      {/* Light Control Sliders */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Light Controls</Text>

        {/* Main light slider */}
        <View style={styles.sliderRow}>
          <Feather name="sun" size={20} color="#FFB267" />
          <Text style={styles.sliderLabel}>Main Light</Text>
        </View>
        <Slider
          value={mainLightValue}
          onSlidingComplete={(value) => {
            setMainLightValue(value);
          }}
          // Prevent shaking of slider when stuck between 2 steps
          step={0.05}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFB267"
          maximumTrackTintColor="#393535"
        />

        {/* Floor lamp slider */}
        <View style={styles.sliderRow}>
          <Feather name="moon" size={20} color="#FFB267" />
          <Text style={styles.sliderLabel}>Floor Lamp</Text>
        </View>
        <Slider
          value={floorLampValue}
          onSlidingComplete={(value) => {
            setFloorLampValue(value);
          }}
          step={0.05}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFB267"
          maximumTrackTintColor="#393535"
        />
      </View>

      {/* Notifications Section */}
      <View ref={notificationRef} style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        {notifications.map((notif) => (
          <View key={notif.id} style={styles.notificationItem}>
            <MaterialCommunityIcons name="bell" size={24} color="#FFB267" />
            <Text style={styles.notificationText}>{notif.message}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// Define visual styles for all parts of the screen (colors, spacing, fonts, layout).
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#211D1D",
  },
  headerImage: {
    width: "auto",
    height: 320,
    paddingTop: "10%",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  roomTabs: {
    flexDirection: "row",
    paddingLeft: "14%",
  },
  tab: {
    color: "#FFFFFFAA",
    fontSize: 16,
    marginRight: 16,
    fontWeight: "500",
  },
  selectedTab: {
    color: "#FFB267",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#FFB267",
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionTitle: {
    color: "#FFB267",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  loadingText: {
    color: "#FFFFFFAA",
    fontStyle: "italic",
    paddingVertical: 8,
  },
  deviceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  deviceCard: {
    backgroundColor: "#282424",
    borderRadius: 12,
    padding: 16,
    width: "48%",
    marginBottom: 16,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  deviceTitle: {
    color: "#FFB267",
    fontSize: 20,
    marginLeft: "30%",
    paddingRight: 20,
    fontWeight: "bold",
  },
  deviceSubtitle: {
    color: "#FFFFFF",
    marginTop: 4,
    marginBottom: 8,
    fontSize: 14,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modeLabel: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  sliderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  sliderLabel: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  notificationText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  roomTabsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  roomTabsContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  bell: {
    marginLeft: 12,
  },
  functionType: {
    color: "#AAA",
    fontSize: 13,
    marginBottom: 8,
  },
});
