import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const BookingSewage = ({ route }) => {
  const navigation = useNavigation();
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const service = route?.params?.service || {
    name: 'Sewage Treatment',
    price: 'Mwk 70,000',
    description: 'Professional sewage treatment to remove full sewage tanks and treat the sewage.',
    imageUrl: 'https://th.bing.com/th/id/OIP.i4QF3taNdzNgxghsifQxwQHaE8?w=255&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7',
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const handleBooking = async () => {
    if (location === '' || address === '') {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const bookingData = {
      serviceName: service.name,
      servicePrice: service.price,
      location,
      address,
      date: date.toLocaleDateString(),
      time: time.toLocaleTimeString(),
    };

    try {
      await addDoc(collection(db, 'bookedServices'), bookingData);
      Alert.alert(
        'Service Booked Successfully!',
        'Do you want to proceed to payment?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'OK', onPress: () => navigation.navigate('payment') },
        ]
      );

      setLocation('');
      setAddress('');
      setDate(new Date());
      setTime(new Date());
    } catch (error) {
      console.error('Error booking service:', error);
      Alert.alert('Booking Failed', 'There was an error booking the service. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>

    <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.navigate('index')} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      <Text style={styles.title}>Book a Service</Text>

      <Image source={{ uri: service.imageUrl }} style={styles.serviceImage} />
      <Text style={styles.serviceTitle}>{service.name}</Text>
      <Text style={styles.servicePrice}>{service.price}</Text>
      <Text style={styles.serviceDescription}>{service.description}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your location"
        value={location}
        onChangeText={setLocation}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
      />

      {/* Date Picker */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
        <Text style={styles.datePickerText}>{date.toLocaleDateString()}</Text>
        <Icon name="calendar-outline" size={20} color="#6200EE" />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Time Picker */}
      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.datePicker}>
        <Text style={styles.datePickerText}>{time.toLocaleTimeString()}</Text>
        <Icon name="time-outline" size={20} color="#6200EE" />
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}

      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  serviceImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  
  serviceTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
  },
  servicePrice: {
    fontSize: 18,
    color: 'purple',
    marginTop: 5,
  },
  serviceDescription: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  input: {
    height: 50,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
  },
  bookButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default BookingSewage;
