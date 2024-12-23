import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { db } from './firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const InventoryForm = () => {
  const navigation = useNavigation();
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedItemCount, setCheckedItemCount] = useState(0);

  useEffect(() => {
    fetchCheckedItems();
  }, []);

  const handleAddItem = async () => {
    if (itemName === '' || description === '' || quantity === '' || price === '') {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'inventory'), {
        itemName: itemName,
        description: description,
        quantity: parseInt(quantity, 10),
        price: parseFloat(price),
        status: 'Pending', // Set initial status as "Pending"
      });

      Alert.alert('Item Added', 'The item has been successfully added to the inventory.');
      
      setItemName('');
      setDescription('');
      setQuantity('');
      setPrice('');
      fetchCheckedItems(); // Refresh the checked items count
    } catch (error) {
      Alert.alert('Error', 'Could not add item. Please try again.');
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCheckedItems = async () => {
    try {
      const q = query(collection(db, 'inventory'), where('status', '==', 'Checked'));
      const querySnapshot = await getDocs(q);
      const checkedItemsList = querySnapshot.docs.map(doc => doc.data().itemName);
      setCheckedItems(checkedItemsList);
      setCheckedItemCount(checkedItemsList.length); // Update badge count
    } catch (error) {
      console.error("Error fetching checked items:", error);
    }
  };

  const showAlert = () => {
    if (checkedItems.length > 0) {
      Alert.alert(
        'Checked Items',
        `Checked Items:\n${checkedItems.join(', ')}\n\nTotal Checked Items: ${checkedItems.length}`
      );
    } else {
      Alert.alert('Checked Items', 'No items have been checked yet.');
    }
  };

  const showAssignedWork = () => {
    Alert.alert('Assigned Work', 'Here are the details of the assigned work.');
  };

  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={() => navigation.navigate('cledash')} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      <Text style={styles.title}>Add Inventory Item</Text>

      {/* Alert Icon with Badge positioned below the title */}
      <View style={styles.alertContainer}>
        <TouchableOpacity onPress={showAlert} style={styles.alertIcon}>
          <Icon name="alert-circle-outline" size={30} color="#6200EE" />
          {checkedItemCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{checkedItemCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: 'https://th.bing.com/th/id/OIP.nam97gGdyTjGpLe-QdcDkQHaE8?w=1024&h=683&rs=1&pid=ImgDetMain' }}
        style={styles.cleanerImage}
      />

      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddItem} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.addButtonText}>Add Item</Text>
        )}
      </TouchableOpacity>

     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
    marginTop:30,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 20,
    padding: 8,
  },
  alertContainer: {
    alignItems: 'left',
    marginBottom: 20,
  },
  alertIcon: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -10,
    left: 17,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    minWidth: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cleanerImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default InventoryForm;
