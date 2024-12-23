import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { db } from './firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const AdminsPage = () => {
  const navigation = useNavigation();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch admins from Firestore
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const adminsCollection = collection(db, 'admins');
      const adminSnapshot = await getDocs(adminsCollection);
      const adminList = adminSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAdmins(adminList);
    } catch (error) {
      console.error("Error fetching admins:", error);
      Alert.alert("Error", "Could not fetch admins.");
    } finally {
      setLoading(false);
    }
  };

  // Delete an admin from Firestore
  const handleDeleteAdmin = async (adminId) => {
    Alert.alert(
      "Delete Admin",
      "Are you sure you want to delete this admin?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'admins', adminId));
              setAdmins(admins.filter(admin => admin.id !== adminId));
            } catch (error) {
              console.error("Error deleting admin:", error);
              Alert.alert("Error", "Could not delete admin.");
            }
          }
        }
      ]
    );
  };

  // Fetch admins when component mounts
  useEffect(() => {
    fetchAdmins();
  }, []);

  // Render each admin row in the FlatList
  const renderAdminItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.username}</Text>
      <Text style={styles.tableCell}>{item.email}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteAdmin(item.id)}>
        <Icon name="trash-outline" size={20} color="#FFF" />
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text>Loading admins...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('admindashboard')} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      <Text style={styles.title}>Admins</Text>
      
      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, styles.tableCell]}>Name</Text>
        <Text style={[styles.tableHeaderText, styles.tableCell]}>Email</Text>
        <Text style={[styles.tableHeaderText, styles.deleteColumn]}>Actions</Text>
      </View>

      {/* Admins List */}
      <FlatList
        data={admins}
        renderItem={renderAdminItem}
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
  deleteColumn: {
    flex: 1,
    alignItems: 'center',
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
  deleteButton: {
    flexDirection: 'row',
    backgroundColor: '#FF4D4D',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AdminsPage;
