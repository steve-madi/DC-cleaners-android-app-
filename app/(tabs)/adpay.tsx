import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { db } from './firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const PaymentHistoryPage = () => {
  const navigation = useNavigation();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch payment data from Firestore
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const paymentCollection = collection(db, 'payments');
      const paymentSnapshot = await getDocs(paymentCollection);
      const paymentList = paymentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPayments(paymentList);
    } catch (error) {
      console.error("Error fetching payments:", error);
      Alert.alert("Error", "Could not fetch payment data.");
    } finally {
      setLoading(false);
    }
  };

  // Approve payment function
  const approvePayment = async (paymentId) => {
    try {
      const paymentDocRef = doc(db, 'payments', paymentId);
      await updateDoc(paymentDocRef, { status: 'approved' });

      // Update local state to reflect the change
      setPayments(prevPayments =>
        prevPayments.map(payment =>
          payment.id === paymentId ? { ...payment, status: 'approved' } : payment
        )
      );

      Alert.alert("Success", "Payment approved successfully!");
    } catch (error) {
      console.error("Error approving payment:", error);
      Alert.alert("Error", "Could not approve payment.");
    }
  };

  // Fetch payments when component mounts
  useEffect(() => {
    fetchPayments();
  }, []);

  // Render each payment item in the FlatList
  const renderPaymentItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.serviceName}</Text>
      <Text style={styles.tableCell}>Mwk {item.price}</Text>
      <Text style={styles.tableCell}>{new Date(item.timestamp?.seconds * 1000).toLocaleString()}</Text>
      <Text style={styles.tableCell}>{item.status === 'approved' ? 'Approved' : 'Pending'}</Text>
      {item.status !== 'approved' && (
        <TouchableOpacity style={styles.approveButton} onPress={() => approvePayment(item.id)}>
          <Text style={styles.approveButtonText}>Approve</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6A0DAD" />
        <Text>Loading payments...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('admindashboard')} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      <Text style={styles.title}>Payment History</Text>
      
      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, styles.tableCell]}>Service</Text>
        <Text style={[styles.tableHeaderText, styles.tableCell]}>Amount</Text>
        <Text style={[styles.tableHeaderText, styles.tableCell]}>Date</Text>
        <Text style={[styles.tableHeaderText, styles.tableCell]}>Status</Text>
        <Text style={styles.tableHeaderText}>Action</Text>
      </View>

      {/* Payment List */}
      <FlatList
        data={payments}
        renderItem={renderPaymentItem}
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
    color: '#6A0DAD',
    textAlign: 'center',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    color: 'orange',
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
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  approveButton: {
    backgroundColor: '#6A0DAD',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
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

export default PaymentHistoryPage;
