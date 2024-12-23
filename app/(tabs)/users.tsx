import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { db } from './firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const UsersPage = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from Firestore
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching users:", error);
      Alert.alert("Error", "Could not fetch users.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a user from Firestore
  const handleDeleteUser = async (userId) => {
    Alert.alert(
      "Delete User",
      "Are you sure you want to delete this user?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'users', userId));
              setUsers(users.filter(user => user.id !== userId));
            } catch (error) {
              console.error("Error deleting user:", error);
              Alert.alert("Error", "Could not delete user.");
            }
          }
        }
      ]
    );
  };

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Render each user row in the FlatList
  const renderUserItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.username}</Text>
      <Text style={styles.tableCell}>{item.email}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteUser(item.id)}>
        <Icon name="trash-outline" size={20} color="#FFF" />
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text>Loading users...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
       <TouchableOpacity onPress={() => navigation.navigate('admindashboard')} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      <Text style={styles.title}>Users</Text>
      
      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, styles.tableCell]}>Name</Text>
        <Text style={[styles.tableHeaderText, styles.tableCell]}>Email</Text>
        <Text style={[styles.tableHeaderText, styles.deleteColumn]}>Actions</Text>
      </View>

      {/* Users List */}
      <FlatList
        data={users}
        renderItem={renderUserItem}
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

export default UsersPage;
