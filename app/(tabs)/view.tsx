import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const MapScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState({
    latitude: -15.786111, // Default: New York City
    longitude: 35.005833,
  });

  const fetchCoordinates = async () => {

    try {
      const apiKey = '696d02dbddf24d2abd3ba0debcfcfe61'; // Replace with your OpenCage API key
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const result = data.results[0].geometry;
        setCoordinates({
          latitude: result.lat,
          longitude: result.lng,
        });
      } else {
        Alert.alert('Location not found', 'Please enter a valid country or city name.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch location data. Check your API key or network connection.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <MapView
        style={styles.map}
        region={{
          ...coordinates,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={coordinates}
          title={location || 'Selected Location'}
          description={`Coordinates: ${coordinates.latitude}, ${coordinates.longitude}`}
        />
      </MapView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter city or country name"
          value={location}
          onChangeText={setLocation}
        />
        <Button title="Search" onPress={fetchCoordinates} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    padding: 8,
    zIndex: 10,
  },
  map: {
    flex: 1,
    marginTop: 60,
  },
  inputContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default MapScreen;
