// Login Screen

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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext";

// This screen allows users to log into the SmartThingies app using their email and password.
export default function LoginScreen() {
  // Allows navigation to other screens (e.g., home screen after successful login).
  const router = useRouter();
  // Provides a function to store the logged-in user's info in global app context.
  const { setUser } = useAuth();
  // Local states to hold input values: email, password, and whether the user wants to be remembered.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // This function runs when the user presses "Login". It validates input, sends a login request, stores 
  // user info, and redirects to the home screen.
  const handleLogin = async () => {
    // Make sure both fields are filled in before continuing. If not, show an alert.
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing fields", "Please enter your email and password.");
      return;
    }
    try {
      // Send the email and password to the backend server for verification.
      const response = await axios.post("http://146.190.130.85:8000/login", {
        email,
        password,
      });

      // Log data to ensure proper data is retrieved from the database.
      console.log("Login response data:", response.data);

      // Save user in context
      setUser({
        full_name: response.data.user.full_name,
        email: response.data.user.email,
      });

      // Store login info if needed
      if (rememberMe) {
        await AsyncStorage.setItem("userEmail", email);
      }
      await AsyncStorage.setItem("isLoggedIn", "true");

      // Navigate to tabs
      router.replace("/(tabs)");
    } catch (error: any) {
      console.error(error);
      Alert.alert(
        "Login Failed",
        error.response?.data?.detail || "An error occurred."
      );
    }
  };

  // Render the login screen layout, including input fields, buttons, and optional "Remember me" and "Forgot Password?" features.
  return (
    <View style={styles.container}>
      {/* App title and subtitle welcoming the user.*/}
      <Text style={styles.title}>Welcome to SmartThingies</Text>
      <Text style={styles.subtitle}>Sign in or create your profile below</Text>

      {/*Form section containing the input fields and action buttons.*/}
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        {/*Email and password input fields with placeholder text and styling.*/}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />


        <Text style={[styles.label, { marginTop: 12 }]}>Password</Text>
        {/*Email and password input fields with placeholder text and styling.*/}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/*Row containing the custom "Remember me" checkbox and the "Forgot Password?" link.*/}
        <View style={styles.checkboxRow}>
          <TouchableOpacity
            style={[styles.checkboxBox, rememberMe && styles.checkboxChecked]}
            onPress={() => setRememberMe(!rememberMe)}
            activeOpacity={0.8}
          >
            {rememberMe && <View style={styles.checkboxTick} />}
          </TouchableOpacity>
          <Text style={styles.rememberText}>Remember me</Text>

          <TouchableOpacity
            style={{ marginLeft: "auto" }}
            onPress={() =>
              Alert.alert("Oh no!\nWrite your password down next time!")
            }
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/*Login button that triggers the login handler when pressed.*/}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        
        {/*Button to navigate to the registration screen if the user doesn't have an account.*/}
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => router.push("/register")}
        >
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
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
  },
  checkboxBox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: "#FFB267",
    borderRadius: 4,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#FFB267",
  },
  checkboxTick: {
    width: 10,
    height: 10,
    backgroundColor: "#211D1D",
    borderRadius: 2,
  },
  rememberText: {
    color: "#FFF",
    marginLeft: 8,
  },
  forgotText: {
    color: "#AAA",
    fontSize: 13,
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: "#FFB267",
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  loginText: {
    color: "#211D1D",
    fontSize: 16,
    fontWeight: "600",
  },
  signupButton: {
    backgroundColor: "#555",
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  signupText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
