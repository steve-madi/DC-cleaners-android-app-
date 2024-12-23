import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { db } from './firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }

    setLoading(true);

    try {
      const collectionsToCheck = [
        { name: 'admins', navigateTo: 'admindashboard' },
        { name: 'cleaners', navigateTo: 'cledash' },
        { name: 'users', navigateTo: 'index' },
      ];

      let userFound = false;

      for (const { name, navigateTo } of collectionsToCheck) {
        const userRef = collection(db, name);
        const q = query(userRef, where('username', '==', username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          for (const docSnapshot of querySnapshot.docs) {
            const userData = docSnapshot.data();

            // Confirm if password matches
            if (userData.password === password) {
              userFound = true;
              const userID = docSnapshot.id;

              // Generate a unique logged-in number for tracking sessions
              const loggedInNumber = Date.now();

              // Update the user's logged-in status in Firestore
              const userDocRef = doc(db, name, userID);
              await updateDoc(userDocRef, {
                loggedIn: true,
                loginNumber: loggedInNumber,
              });

              Alert.alert('Login Successfully!', 'Press OK to proceed!', [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'OK',
                  onPress: () => {
                    setLoading(false);
                    // Pass user-specific data to the dashboard
                    navigation.navigate(navigateTo, { userID, userName: userData.name || 'User' });
                  },
                },
              ]);

              break;
            }
          }

          if (userFound) break;
        }
      }

      if (!userFound) {
        Alert.alert('Error', 'Incorrect username or password.');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      Alert.alert('Error', 'An error occurred while logging in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome !!!</Text>
      <Text style={styles.subtitle}>Enter your credentials to log in</Text>

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
        <Icon name="lock-outline" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={hidePassword}
        />
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <Icon name={hidePassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#666" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.loginButtonText}>Login Now</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('explore')}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#FDFDFD' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#333' },
  subtitle: { fontSize: 16, color: '#999', textAlign: 'center', marginBottom: 30 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0', padding: 15, marginBottom: 15, borderRadius: 10, backgroundColor: '#FAFAFA' },
  input: { flex: 1, fontSize: 16, color: '#333' },
  icon: { marginRight: 10 },
  loginButton: { backgroundColor: '#6200EE', padding: 15, borderRadius: 30, alignItems: 'center', marginBottom: 20 },
  loginButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  signupButton: { backgroundColor: 'orange', padding: 15, borderRadius: 30, alignItems: 'center', marginBottom: 20  },
  signupButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default LoginScreen;
