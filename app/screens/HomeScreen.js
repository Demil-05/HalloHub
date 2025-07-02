import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Your one stop shop to happy schooling</Text>
      {/* Add your bars or content here */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    textAlign: "center"
  },
  text: {
    fontSize: 24,
  },
});
