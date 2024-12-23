import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView } from 'react-native';

const CleaningServiceScreen = () => {
  const [selectedService, setSelectedService] = useState('Cleaning');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedTime, setSelectedTime] = useState('Morning');
  const [location, setLocation] = useState('');

  const services = [
    { id: '1', name: 'Cleaning', icon: 'https://img.icons8.com/color/100/000000/vacuum-cleaner.png' },
    { id: '2', name: 'Cooking', icon: 'https://img.icons8.com/color/100/000000/cooking.png' },
    { id: '3', name: 'Wash & Fold', icon: 'https://img.icons8.com/color/100/000000/clothes.png' },
    { id: '4', name: 'Painting', icon: 'https://img.icons8.com/color/100/000000/paint.png' },
    { id: '5', name: 'Carpet Cleaning', icon: 'https://img.icons8.com/color/100/000000/carpet.png' },
    { id: '6', name: 'Plumbing', icon: 'https://img.icons8.com/color/100/000000/plumbing.png' }
  ];

  const renderService = (item) => (
    <TouchableOpacity 
      key={item.id}
      style={[styles.serviceBox, selectedService === item.name && styles.selectedService]} 
      onPress={() => setSelectedService(item.name)}>
      <Image source={{ uri: item.icon }} style={styles.serviceIcon} />
      <Text style={styles.serviceText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Choose your Service</Text>

      {/* Horizontal Scroll for Services */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.serviceScroll}>
        {services.map((service) => renderService(service))}
      </ScrollView>

      {/* Location Input */}
      <Text style={styles.sectionTitle}>Where?</Text>
      <TextInput
        style={styles.input}
        placeholder="Search Your Location"
        value={location}
        onChangeText={setLocation}
      />

      {/* Day Selection */}
      <Text style={styles.sectionTitle}>How Many Hours in the Day?</Text>
      <View style={styles.daysContainer}>
        <TouchableOpacity style={[styles.dayBox, selectedDay === 'Monday' && styles.selectedDay]} onPress={() => setSelectedDay('Monday')}>
          <Text style={styles.dayText}>Monday</Text>
          <Text style={styles.timeText}>8AM-5PM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.dayBox, selectedDay === 'Tuesday' && styles.selectedDay]} onPress={() => setSelectedDay('Tuesday')}>
          <Text style={styles.dayText}>Tuesday</Text>
          <Text style={styles.timeText}>8AM-5PM</Text>
        </TouchableOpacity>
      </View>

      {/* Time Selection */}
      <Text style={styles.sectionTitle}>Service Time?</Text>
      <View style={styles.timeContainer}>
        <TouchableOpacity style={[styles.timeBox, selectedTime === 'Morning' && styles.selectedTime]} onPress={() => setSelectedTime('Morning')}>
          <Text style={styles.timeText}>Morning</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.timeBox, selectedTime === 'Afternoon' && styles.selectedTime]} onPress={() => setSelectedTime('Afternoon')}>
          <Text style={styles.timeText}>Afternoon</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.timeBox, selectedTime === 'Evening' && styles.selectedTime]} onPress={() => setSelectedTime('Evening')}>
          <Text style={styles.timeText}>Evening</Text>
        </TouchableOpacity>
      </View>

      {/* Service Provider Info */}
      <View style={styles.providerInfo}>
        <Image source={{ uri: 'https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=CWihwAiT6S2emg&pid=ImgRaw&r=0' }} style={styles.providerImage} />
        <View style={styles.providerDetails}>
          <Text style={styles.providerName}>Cozmic</Text>
          <Text style={styles.providerExperience}>1 yr Exp</Text>
          <Text style={styles.providerPrice}>Mwk 1000 / Per Hour</Text>
        </View>
      </View>
       {/* Service Provider Info */}
       <View style={styles.providerInfo}>
        <Image source={{ uri: 'https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=CWihwAiT6S2emg&pid=ImgRaw&r=0' }} style={styles.providerImage} />
        <View style={styles.providerDetails}>
          <Text style={styles.providerName}>Tobi</Text>
          <Text style={styles.providerExperience}>5 yr Exp</Text>
          <Text style={styles.providerPrice}>Mwk 1000 / Per Hour</Text>
        </View>
      </View>

      {/* Get Started Button */}
      <TouchableOpacity style={styles.getStartedButton}>
        <Text  style={styles.getStartedText}>Get Started</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  serviceScroll: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  serviceBox: {
    backgroundColor: '#8BF0F9',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  selectedService: {
    borderColor: '#4285F4',
    borderWidth: 2,
    backgroundColor: 'orange',
  },
  serviceIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  serviceText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor:'orange',
    padding:10,
    borderRadius:20,
  },
  dayBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  selectedDay: {
    backgroundColor: '#ffedcc',
    borderColor: '#ff9800',
    borderWidth: 2,
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
  timeText: {
    fontSize: 14,
    color: '#888',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  selectedTime: {
    backgroundColor: '#cce7ff',
    borderColor: '#4285F4',
    borderWidth: 2,
  },
  providerInfo: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  providerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  providerDetails: {
    marginLeft: 15,
  },
  providerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  providerExperience: {
    fontSize: 14,
    color: '#888',
  },
  providerPrice: {
    fontSize: 16,
    color: '#4285F4',
    fontWeight: 'bold',
  },
  getStartedButton: {
    backgroundColor: 'orange', // Solid color for the button
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
  },
  getStartedText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CleaningServiceScreen;
