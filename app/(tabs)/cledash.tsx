import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  Modal,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { db } from './firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const CleanersDashboard = () => {
  const navigation = useNavigation();
  const [approvedServices, setApprovedServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchApprovedServices();
  }, []);

  const fetchApprovedServices = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'bookedServices'), where('status', '==', 'approved'));
      const querySnapshot = await getDocs(q);
      const services = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setApprovedServices(services);
    } catch (error) {
      Alert.alert('Error', 'Could not fetch approved services.');
      console.error("Error fetching documents: ", error);
    } finally {
      setLoading(false);
    }
  };

  const renderServiceItem = ({ item }) => (
    <View style={styles.serviceContainer}>
      <Text style={styles.serviceText}>Service: {item.serviceName}</Text>
      <Text style={styles.serviceText}>Date: {item.date}</Text>
      <Text style={styles.serviceText}>Time: {item.time}</Text>
      <Text style={styles.serviceText}>Location: {item.location}</Text>
    </View>
  );

  const handleNotificationPress = () => {
    if (approvedServices.length > 0) {
      setModalVisible(true);
    } else {
      Alert.alert('No Alerts', 'There are no approved job alerts at the moment.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Cleaner’s Dashboard</Text>
          <TouchableOpacity onPress={handleNotificationPress} style={styles.alertIcon}>
            <Icon name="notifications-outline" size={30} color="#6200EE" />
            {approvedServices.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{approvedServices.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('inventory')}>
          <Text style={styles.addButtonText}>Add Inventory</Text>
        </TouchableOpacity>

        <Text style={styles.subTitle}>Approved Booked Services</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#6200EE" style={styles.loader} />
        ) : (
          approvedServices.map(service => (
            <View key={service.id} style={styles.serviceContainer}>
              <Text style={styles.serviceText}>Service: {service.serviceName}</Text>
              <Text style={styles.serviceText}>Date: {service.date}</Text>
              <Text style={styles.serviceText}>Time: {service.time}</Text>
              <TouchableOpacity
                style={styles.locationButton}
                onPress={() => Alert.alert('Location', `Location of service: ${service.location}`)}
              >
                <Text style={styles.locationButtonText}>Show Location</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Approved Job Alerts</Text>
              <FlatList
                data={approvedServices}
                renderItem={renderServiceItem}
                keyExtractor={item => item.id}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
    marginTop:30,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  alertIcon: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -3,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    minWidth: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 20,
  },
  serviceContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  serviceText: {
    fontSize: 16,
    marginBottom: 5,
  },
  locationButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  locationButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default CleanersDashboard;
