import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NameHomeScreen() {
  const [homeName, setHomeName] = useState("");
  const router = useRouter();

  // const handleNext = async () => {
  //   if (homeName.trim()) {
  //     try {
  //       await AsyncStorage.setItem('homeName', homeName); // ✅ must be awaited in an async function
  //       router.push({
  //         pathname: '/setup-new-room',
  //         params: { homeName },
  //       });
  //     } catch (error) {
  //       console.error('Failed to save home name:', error);
  //       alert('Something went wrong. Please try again.');
  //     }
  //   } else {
  //     alert('Please enter a name for your home.');
  //   }
  // };

  const handleNext = async () => {
    if (homeName.trim()) {
      try {
        const response = await fetch(
          "http://146.190.130.85:8000/create-home/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              user_id: 3, // replace with actual logged-in user ID if needed
              home_name: homeName,
            }),
          }
        );

        const data = await response.json();
        if (!response.ok) throw new Error("Failed to create home");

        await AsyncStorage.setItem("homeId", data.id.toString());
        await AsyncStorage.setItem("homeName", homeName);
        router.push("/setup-new-room");
      } catch (error) {
        console.error("Failed to save home name:", error);
        alert("Something went wrong. Please try again.");
      }
    } else {
      alert("Please enter a name for your home.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("@/assets/images/SmartThingies.png")}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.title}>Get Started with SmartThingies</Text>
        <Text style={styles.subtitle}>
          First, let's create a name for your home:
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter home name"
          placeholderTextColor="#999"
          value={homeName}
          onChangeText={setHomeName}
        />

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#211D1D",
    justifyContent: "center",
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
    marginBottom: 24,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 20,
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
