import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

export default function ResourcesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Resources</Text>

      <TouchableOpacity style={styles.bar}>
        <Text style={styles.barText}>Resource 1: Getting Started Guide</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.bar}>
        <Text style={styles.barText}>Resource 2: Video Tutorials</Text>
      </TouchableOpacity>

      {/* Add more bars here */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bar: {
    backgroundColor: "#2dbd6e",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  barText: {
    color: "white",
    fontSize: 16,
  },
});
