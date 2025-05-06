// Register Screen

// Import components
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext"; // Adjust path as needed

// This screen allows new users to register for the app by providing their name, email, and password.
export default function RegisterScreen() {
  // Get access to navigation so we can redirect the user to the next setup screen after registering.
  const router = useRouter();
  // Use the authentication context to save user info throughout the app after successful registration.
  const { setUser } = useAuth();
  // Manage the state of the input fields for the registration form.
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // This function handles the registration process when the user presses "Sign Up".
  const handleRegister = async () => {
    // Check that all fields are filled in. If not, show an alert.
    if (!fullName || !email || !password) {
      Alert.alert("Missing Fields", "Please fill out all fields.");
      return;
    }
    
    try {
      // Send a POST request to the backend with the registration data.
      const response = await fetch("http://146.190.130.85:8000/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: fullName,
          email: email,
          password: password,
        }),
      });

      // Send a POST request to the backend with the registration data.
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Registration failed");
      }

      // Parse the response data from the server.
      const data = await response.json();
      console.log("Success:", data);

      // Save the returned user info (name and email) in global context for access across the app.
      setUser({
        full_name: data.full_name,
        email: data.email,
      });

      // Save a login flag to local storage so the app knows the user is logged in next time.
      await AsyncStorage.setItem("isLoggedIn", "true");

      // Navigate the user to the home setup screen after registration.
      router.replace("/setup-new-home");

    } catch (error: any) {
      // If the request fails for any reason, show an error message to the user.

      console.error("Error:", error.message);
      Alert.alert("Registration Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Title and subtitle displayed at the top of the screen */}
      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Create your new profile below</Text>

      {/* The main form area with styled input fields and a button */}
      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        {/* Input field for user's full name */}
        <TextInput
          style={styles.input}
          placeholder="First and Last Name"
          placeholderTextColor="#999"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={[styles.label, { marginTop: 12 }]}>Email</Text>
        {/* Input field for user's email address */}
        <TextInput
          style={styles.input}
          placeholder="johndoe@example.com"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />

        {/* Input field for user's password */}
        <Text style={[styles.label, { marginTop: 12 }]}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Sign Up button that triggers the registration handler */}
        <TouchableOpacity style={styles.signupButton} onPress={handleRegister}>
          <Text style={styles.signupText}>Sign Up</Text>
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
    padding: 24,
    justifyContent: "center",
  },
  wifi: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    left: 24,
    color: "#AAA",
    fontSize: 12,
  },
  title: {
    fontSize: 22,
    color: "#FFB267",
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#DDD",
    marginBottom: 24,
    textAlign: "center",
  },
  form: {
    backgroundColor: "#1A1616",
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
  },
  label: {
    color: "#FFB267",
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 14,
  },
  signupButton: {
    backgroundColor: "#FFB267",
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  signupText: {
    color: "#211D1D",
    fontSize: 16,
    fontWeight: "600",
  },
});
