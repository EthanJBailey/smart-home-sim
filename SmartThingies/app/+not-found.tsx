// Not-Found Screen
// This file renders an error screen if a defined navigational route isn't found (e.g. trying to
// use the router to go to a screen called 'update' when it doesn't exist)

// Import components
import { Link, Stack } from "expo-router";
import React, { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// This screen is shown when a user tries to access a route that doesn't exist.
export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

// Define visual styles for all parts of the screen (colors, spacing, fonts, layout).
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
