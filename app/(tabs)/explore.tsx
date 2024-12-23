import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { db } from './firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';

const RegisterScreen = ({ route }) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('User'); // Default role
  const [loading, setLoading] = useState(false); // Loader state

  const handleRegister = async () => {
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
      Alert.alert('Error', 'Please fill out all fields.');
    } else if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
    } else {
      setLoading(true); // Start loader
      try {
        // Determine the collection based on selected role
        const collectionName = role.toLowerCase() + 's'; // "admins", "users", or "cleaners"
        await addDoc(collection(db, collectionName), {
          username,
          email,
          password, // Be cautious with plaintext passwords
          role,
        });
        Alert.alert('Registration Successful!', 'Press OK to proceed!', [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'OK',
            onPress: () => {
              setLoading(false); // Stop loader on success
              navigation.navigate('login');
            },
          },
        ]);
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setRole('User'); // Reset role to default
      } catch (error) {
        Alert.alert('Error', 'Could not register. Please try again.');
        console.error("Error adding document: ", error);
      } finally {
        setLoading(false); // Stop loader
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <Text style={styles.subtitle}>Create your account</Text>

      <View style={styles.inputContainer}>
        <Icon name="account-outline" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="email-outline" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock-outline" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}  // Password characters hidden
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock-check-outline" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}  // Password characters hidden
        />
      </View>

      {/* Role Picker */}
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="User" value="User" />
          <Picker.Item label="Cleaner" value="Cleaner" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.registerButtonText}>Sign up</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FDFDFD',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginRight: 10,
  },
  picker: {
    flex: 1,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default RegisterScreen;
