import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useDeviceContext } from "@/context/DeviceContext";
import { useAuth } from "../../context/AuthContext";

export default function SettingsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { deviceState, toggleDevice } = useDeviceContext();
  const notifications = [
    { id: 1, message: "Replace filter in Humidifier" },
    { id: 2, message: "Air Purifier needs maintenance" },
  ];
  console.log("User from context:", user);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.rightInfo}>
          <Ionicons
            name="wifi"
            size={18}
            color="#FFB267"
            style={styles.wifiIcon}
          />
          <Text style={styles.wifiLabel}>Resnet-5G</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* User Profile */}
        <View style={styles.profileSection}>
          <Image
            source={require("@/assets/images/user-placeholder.png")} // Replace with real user image
            style={styles.avatar}
          />
          <View>
            <Text style={styles.userName}>{user?.full_name || "Guest"}</Text>
            <Text style={styles.userEmail}>
              {user?.email || "noemail@unknown.com"}
            </Text>
          </View>
        </View>

        {/* Settings Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
          {[
            { label: "Notifications", icon: "notifications-outline" },
            { label: "Theme", icon: "color-palette-outline" },
            { label: "Language", icon: "globe-outline" },
          ].map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.item}
              onPress={
                item.label === "Notifications"
                  ? () => {
                      notifications.forEach((notif) =>
                        Alert.alert(notif.message)
                      );
                    }
                  : undefined
              }
            >
              <Ionicons
                name={item.icon}
                size={20}
                color="#FFB267"
                style={styles.itemIcon}
              />
              <Text style={styles.itemLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color="#888" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {[
            { label: "Change Password", icon: "lock-closed-outline" },
            { label: "Manage Devices", icon: "hardware-chip-outline" },
            { label: "Connected Services", icon: "link-outline" },
          ].map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.item}
              onPress={
                item.label === "Manage Devices"
                  ? () => {
                      router.replace("/(tabs)/devices");
                    }
                  : undefined
              }
            >
              <Ionicons
                name={item.icon}
                size={20}
                color="#FFB267"
                style={styles.itemIcon}
              />
              <Text style={styles.itemLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color="#888" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Support</Text>
          {[
            { label: "Privacy Policy", icon: "shield-outline" },
            { label: "Help Center", icon: "help-circle-outline" },
            { label: "Send Feedback", icon: "chatbubble-ellipses-outline" },
          ].map((item) => (
            <TouchableOpacity key={item.label} style={styles.item}>
              <Ionicons
                name={item.icon}
                size={20}
                color="#FFB267"
                style={styles.itemIcon}
              />
              <Text style={styles.itemLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color="#888" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => router.replace("/login")}
      >
        <Text style={styles.logoutText}>Log out</Text>
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
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
    backgroundColor: "#393535",
  },
  userName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    color: "#AAA",
    fontSize: 14,
    marginTop: 2,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    color: "#FFB267",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#282424",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  itemIcon: {
    marginRight: 12,
  },
  itemLabel: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
  },
  logoutButton: {
    backgroundColor: "#FFB267",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 12,
  },
  logoutText: {
    color: "#211D1D",
    fontWeight: "bold",
    fontSize: 16,
  },
});
