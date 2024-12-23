import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { db } from './firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const BookedServicesPage = () => {
  const navigation = useNavigation();
  const [bookedServices, setBookedServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch booked services from Firestore
  const fetchBookedServices = async () => {
    try {
      setLoading(true);
      const servicesCollection = collection(db, 'bookedServices');
      const servicesSnapshot = await getDocs(servicesCollection);
      const servicesList = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookedServices(servicesList);
    } catch (error) {
      console.error("Error fetching booked services:", error);
      Alert.alert("Error", "Could not fetch booked services.");
    } finally {
      setLoading(false);
    }
  };

  // Approve booking function
  const approveBooking = async (bookingId) => {
    try {
      const bookingDocRef = doc(db, 'bookedServices', bookingId);
      await updateDoc(bookingDocRef, { status: 'approved' });

      // Update local state to reflect the change
      setBookedServices(prevServices =>
        prevServices.map(service =>
          service.id === bookingId ? { ...service, status: 'approved' } : service
        )
      );

      Alert.alert("Success", "Service approved!");
    } catch (error) {
      console.error("Error approving service:", error);
      Alert.alert("Error", "Could not approve the service.");
    }
  };

  // Fetch booked services when component mounts
  useEffect(() => {
    fetchBookedServices();
  }, []);

  // Render each booked service item
  const renderServiceItem = ({ item }) => (
    <View style={styles.serviceContainer}>
      <Text style={styles.serviceName}>Service: {item.serviceName}</Text>
      <Text style={styles.servicePrice}>Price: {item.servicePrice}</Text>
      <Text style={styles.serviceLocation}>Location: {item.location}</Text>
      <Text style={styles.serviceAddress}>Address: {item.address}</Text>
      <Text style={styles.serviceDate}>Date: {item.date}</Text>
      <Text style={styles.serviceTime}>Time: {item.time}</Text>
      <Text style={styles.serviceStatus}>
        Status: {item.status === 'approved' ? 'Approved' : 'Pending'}
      </Text>

      <TouchableOpacity style={styles.approveButton} onPress={() => approveBooking(item.id)}>
        <Text style={styles.approveButtonText}>Approve</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6A0DAD" />
        <Text>Loading booked services...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('admindashboard')} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Booked Services</Text>
      <FlatList
        data={bookedServices}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.servicesList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5F6F5',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A0DAD',
    textAlign: 'center',
    marginBottom: 20,
  },
  servicesList: {
    paddingBottom: 10,
  },
  serviceContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  servicePrice: {
    fontSize: 16,
    color: 'purple',
    marginBottom: 5,
  },
  serviceLocation: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  serviceAddress: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  serviceDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  serviceTime: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  serviceStatus: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  approveButton: {
    backgroundColor: '#6A0DAD',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  approveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BookedServicesPage;
