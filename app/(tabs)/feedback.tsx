import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from './firebaseConfig';  // Import Firestore configuration
import { collection, addDoc } from 'firebase/firestore';

const FeedbackPage = () => {
  const [selectedService, setSelectedService] = useState('Carpet Cleaning');
  const [feedback, setFeedback] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const handleFeedbackSubmit = async () => {
    if (!feedback) {
      Alert.alert('Error', 'Please provide feedback before submitting.');
      return;
    }

    try {
      // Add feedback to Firestore in the 'feedback' collection
      await addDoc(collection(db, 'feedback'), {
        serviceType: selectedService,
        feedbackDetails: feedback,
        contactInfo: contactInfo,
        timestamp: new Date(),
      });
      
      Alert.alert('Success', 'Thank you for your feedback!');
      
      // Reset fields
      setFeedback('');
      setContactInfo('');
      setSelectedService('Carpet Cleaning');
    } catch (error) {
      Alert.alert('Error', 'Could not submit feedback. Please try again.');
      console.error("Error adding document: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://th.bing.com/th/id/OIP.oR5zHdlslXBNY6Y4TgonegHaEa?pid=ImgDet&w=172&h=102&c=7&dpr=1.1' }} 
        style={styles.image} 
      />
      <Text style={styles.title}>Submit Your Feedback</Text>
      
      <Text style={styles.label}>Select Service</Text>
      <Picker
        selectedValue={selectedService}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedService(itemValue)}
      >
        <Picker.Item label="Carpet Cleaning" value="Carpet Cleaning" />
        <Picker.Item label="House Cleaning" value="House Cleaning" />
        <Picker.Item label="Sofa Cleaning" value="Sofa Cleaning" />
        <Picker.Item label="Laundry" value="Laundry" />
      </Picker>
      
      <Text style={styles.label}>Your Feedback</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Write your feedback here..."
        value={feedback}
        onChangeText={setFeedback}
        multiline
        numberOfLines={4}
      />
      
      <Text style={styles.label}>Contact Info (Optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Your email or phone number"
        value={contactInfo}
        onChangeText={setContactInfo}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleFeedbackSubmit}>
        <Text style={styles.submitButtonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F5F5F5' },
  image: { width: '100%', height: 200, marginBottom: 20, borderRadius: 10 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', marginTop: 10 },
  picker: { height: 50, width: '100%', backgroundColor: '#FFF', borderRadius: 10, marginVertical: 10 },
  textArea: { height: 100, borderColor: '#DDD', borderWidth: 1, borderRadius: 10, padding: 10, backgroundColor: '#FFF' },
  input: { height: 50, borderColor: '#DDD', borderWidth: 1, borderRadius: 10, padding: 10, backgroundColor: '#FFF', marginTop: 10 },
  submitButton: { backgroundColor: '#6200EE', paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  submitButtonText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
  scrollContainer: {
    flexGrow: 1,
  },  
});

export default FeedbackPage;
