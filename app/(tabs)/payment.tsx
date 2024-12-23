import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import AwesomeAlert from 'react-native-awesome-alerts';
import { db } from './firebaseConfig'; // Firebase config import
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function PaymentScreen() {
  const [showAddCard, setShowAddCard] = useState(false);
  return (
    <View style={styles.container}>
      {showAddCard ? (
        <AddNewCard setShowAddCard={setShowAddCard} />
      ) : (
        <PaymentMethods setShowAddCard={setShowAddCard} />
      )}
    </View>
  );
}

const PaymentMethods = ({ setShowAddCard }) => {
  const navigation = useNavigation();
  const services = [
    { name: 'Home Cleaning', price: 50000 },
    { name: 'Carpet Cleaning', price: 30000 },
    { name: 'Car Wash', price: 20000 },
    { name: 'Sofa Cleaning', price: 40000 },
    { name: 'House Painting', price: 60000 },
    { name: 'Laundry', price: 15000 },
    { name: 'Sewage Treatment', price: 70000 },
    { name: 'Pipe Cleaning', price: 25000 },
  ];

  const [selectedService, setSelectedService] = useState(services[0].name);
  const [price, setPrice] = useState(services[0].price);
  const [showAlert, setShowAlert] = useState(false);

  const handleServiceChange = (serviceName) => {
    setSelectedService(serviceName);
    const service = services.find((service) => service.name === serviceName);
    setPrice(service.price);
  };

  const handlePayNow = async () => {
    try {
      await addDoc(collection(db, 'payments'), {
        serviceName: selectedService,
        price: price,
        timestamp: serverTimestamp(),
        // Assuming a selected card's ID is passed here after selection
      });
      setShowAlert(true);
    } catch (error) {
      console.error("Error storing payment: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.paymentContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('index')} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
      <Text style={styles.title}>Payment Methods</Text>

      <View style={styles.serviceSelectorContainer}>
        <Text style={styles.label}>Select Service:</Text>
        <Picker
          selectedValue={selectedService}
          onValueChange={(value) => handleServiceChange(value)}
          style={styles.picker}
        >
          {services.map((service) => (
            <Picker.Item key={service.name} label={service.name} value={service.name} />
          ))}
        </Picker>
      </View>

      <Text style={styles.amountText}>Price: Mwk {price}</Text>

      <Text style={styles.otherMethodsTitle}>Other Payment Methods</Text>
      <View style={styles.otherMethods}>
        {[{ name: 'Credit / Debit Card', icon: 'credit-card' }, { name: 'Net Banking', icon: 'university' }, { name: 'Google Wallet', icon: 'google-wallet' }, { name: 'PhonePe', icon: 'mobile' }, { name: 'Other Wallets', icon: 'money' }].map((method, index) => (
          <View key={index} style={styles.methodContainer}>
            <Icon name={method.icon} size={20} color="#6A0DAD" style={styles.methodIcon} />
            <Text style={styles.methodText}>{method.name}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handlePayNow}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={() => setShowAddCard(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Payment Successful"
        message="Your payment was processed successfully!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#6A0DAD"
        onConfirmPressed={() => setShowAlert(false)}
      />
    </ScrollView>
  );
};

const AddNewCard = ({ setShowAddCard }) => {
  const navigation = useNavigation();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');

  const handleAddCard = async () => {
    try {
      await addDoc(collection(db, 'cards'), {
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cvv: cvv,
        cardHolderName: cardHolderName,
      });
      setShowAddCard(false);
      alert('Card added successfully');
    } catch (error) {
      console.error("Error adding card: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.addCardContainer}>
       <TouchableOpacity onPress={() => navigation.navigate('payment')} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
      <Text style={styles.title}>Add New Card</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Expiry Date"
            value={expiryDate}
            onChangeText={setExpiryDate}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="CVV"
            secureTextEntry
            value={cvv}
            onChangeText={setCvv}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Name on Card"
          value={cardHolderName}
          onChangeText={setCardHolderName}
        />
      </View>
      <TouchableOpacity style={styles.addCardButton} onPress={handleAddCard}>
        <Text style={styles.addCardButtonText}>Add Card</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1E6FF',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    padding: 8,
  },
  paymentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  addCardContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    margin: 20,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#6A0DAD',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardNumber: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  cardOwner: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cardType: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  inputContainer: {
    width: '100%',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: 16,
    color: '#555',
  },
  addCardButton: {
    backgroundColor: '#6A0DAD',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  addCardButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  serviceSelectorContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  picker: {
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  amountText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginVertical: 10,
  },
  otherMethodsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#6A0DAD',
  },
  otherMethods: {
    width: '100%',
    marginBottom: 20,
  },
  methodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  methodIcon: {
    marginRight: 10,
  },
  methodText: {
    fontSize: 16,
    color: '#555',
  },
  payButton: {
    backgroundColor: '#6A0DAD',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginVertical: 20,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#6A0DAD',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 70,
    right: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

