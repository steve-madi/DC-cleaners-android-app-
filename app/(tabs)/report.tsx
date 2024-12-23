import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// Helper function to format Firestore timestamps
const formatTimestamp = (timestamp) => {
  if (timestamp && timestamp.seconds) {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }
  return 'N/A'; // If timestamp is not valid, return a placeholder
};

const ReportPage = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    users: [],
    bookedServices: [],
    admins: [],
    cleaners: [],
    inventory: [],
    payments: [],
    feedback: [],
  });

  // Fetch data from Firestore
  const fetchData = async () => {
    setLoading(true);
    try {
      const fetchCollection = async (collectionName) => {
        const collectionRef = collection(db, collectionName);
        const snapshot = await getDocs(collectionRef);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      };

      const [users, bookedServices, admins, cleaners, inventory, payment, feedback] = await Promise.all([
        fetchCollection('users'),
        fetchCollection('bookedServices'),
        fetchCollection('admins'),
        fetchCollection('cleaners'),
        fetchCollection('inventory'),
        fetchCollection('payments'),
        fetchCollection('feedback'),
      ]);

      setData({ users, bookedServices, admins, cleaners, inventory, payment, feedback });
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Could not fetch data for the report.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sections = [
    { title: 'Users', data: data.users },
    { title: 'Booked Services', data: data.bookedServices },
    { title: 'Admins', data: data.admins },
    { title: 'Cleaners', data: data.cleaners },
    { title: 'Inventory', data: data.inventory },
    { title: 'Payments', data: data.payment },
    { title: 'Feedback', data: data.feedback },
  ];

  const renderSection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{item.title}</Text>
      {item.data.length > 0 ? (
        <FlatList
          data={item.data}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              {Object.keys(item).map((key) => (
                <Text key={key} style={styles.itemText}>
                  {key}: {typeof item[key] === 'object' && item[key].seconds ? formatTimestamp(item[key]) : item[key]}
                </Text>
              ))}
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.noDataText}>No data available</Text>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6A0DAD" />
        <Text>Loading report data...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('admindashboard')} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Service Report</Text>
      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.reportContainer}
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
  reportContainer: {
    paddingBottom: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReportPage;
