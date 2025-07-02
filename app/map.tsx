import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MapScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* ---------- Header ---------- */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={26} onPress={() => router.back()} />
        <Text style={styles.title}>Student Map</Text>
      </View>

      {/* ---------- Google Map ---------- */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 52.5200,        // Example: Berlin
          longitude: 13.4050,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {/* Example Marker */}
        <Marker
          coordinate={{ latitude: 52.5200, longitude: 13.4050 }}
          title="Berlin Center"
          description="Example Marker Location"
        />
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    marginLeft: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  map: {
    flex: 1,
  },
});