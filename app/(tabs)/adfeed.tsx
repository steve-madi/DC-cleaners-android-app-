import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const FeedbackListPage = () => {
  const navigation = useNavigation();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch feedback data from Firestore
  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const feedbackCollection = collection(db, 'feedback');
      const feedbackSnapshot = await getDocs(feedbackCollection);
      const feedbackList = feedbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFeedbacks(feedbackList);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      Alert.alert("Error", "Could not fetch feedback data.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch feedbacks when component mounts
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Render each feedback item in the FlatList
  const renderFeedbackItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.serviceType}</Text>
      <Text style={styles.tableCell}>{item.feedbackDetails}</Text>
      <Text style={styles.tableCell}>{item.contactInfo || "N/A"}</Text>
      <Text style={styles.tableCell}>{new Date(item.timestamp?.seconds * 1000).toLocaleString()}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text>Loading feedbacks...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
       <TouchableOpacity onPress={() => navigation.navigate('admindashboard')} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      <Text style={styles.title}>Feedback List</Text>
      
      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, styles.tableCell]}>Service Type</Text>
        <Text style={[styles.tableHeaderText, styles.tableCell]}>Feedback</Text>
        <Text style={[styles.tableHeaderText, styles.tableCell]}>Contact Info</Text>
        <Text style={[styles.tableHeaderText, styles.tableCell]}>Date</Text>
      </View>

      {/* Feedback List */}
      <FlatList
        data={feedbacks}
        renderItem={renderFeedbackItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.tableBody}
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
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#28A745',
    borderRadius: 8,
    marginBottom: 10,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 5,
    textAlign: 'center',
    color: '#333',
  },
  tableBody: {
    paddingBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FeedbackListPage;
