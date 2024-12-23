import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { db } from './firebaseConfig';
import Icon from 'react-native-vector-icons/Ionicons';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const InventoryItemsPage = () => {
  const navigation = useNavigation();
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch items from the Firestore database
  const fetchInventoryItems = async () => {
    try {
      setLoading(true);
      const itemsCollection = collection(db, 'inventory');
      const itemsSnapshot = await getDocs(itemsCollection);
      const itemsList = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInventoryItems(itemsList);
    } catch (error) {
      console.error("Error fetching inventory items:", error);
      Alert.alert("Error", "Could not fetch inventory items.");
    } finally {
      setLoading(false);
    }
  };

  // Update item status to "Checked"
  const checkItem = async (itemId) => {
    try {
      const itemDocRef = doc(db, 'inventory', itemId);
      await updateDoc(itemDocRef, { status: 'Checked' });

      // Update local state to reflect the change
      setInventoryItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, status: 'Checked' } : item
        )
      );

      Alert.alert("Success", "Item checked successfully!");
    } catch (error) {
      console.error("Error checking item:", error);
      Alert.alert("Error", "Could not update item status.");
    }
  };

  // Fetch items on component mount
  useEffect(() => {
    fetchInventoryItems();
  }, []);

  // Render each inventory item
  const renderInventoryItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>Name: {item.itemName}</Text>
      <Text style={styles.itemDescription}>Description: {item.description}</Text>
      <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
      <Text style={styles.itemPrice}>Price: Mwk{item.price}</Text>
      <Text style={styles.itemStatus}>
        Status: {item.status === 'Checked' ? 'Checked' : 'Pending'}
      </Text>

      {item.status !== 'Checked' && (
        <TouchableOpacity style={styles.checkButton} onPress={() => checkItem(item.id)}>
          <Text style={styles.checkButtonText}>Check</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6A0DAD" />
        <Text>Loading inventory items...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
       <TouchableOpacity onPress={() => navigation.navigate('admindashboard')} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      <Text style={styles.title}>Inventory Items</Text>
      <FlatList
        data={inventoryItems}
        renderItem={renderInventoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.itemsList}
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
  itemsList: {
    paddingBottom: 10,
  },
  itemContainer: {
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
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: 'purple',
    marginBottom: 5,
  },
  itemStatus: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  checkButton: {
    backgroundColor: '#6A0DAD',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  checkButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InventoryItemsPage;
