import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Dashboard = ({ route }) => {
  const navigation = useNavigation();
  
  const data = {
    registeredUsers: 120,
    registeredAdmins: 5,
    registeredCleaners: 30,
    feedbackCount: 45,
    paymentsCount: 200,
    inventoryCount: 150,
  };

  const handlePress = (statName) => {
    console.log(`${statName} pressed!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Admin Dashboard</Text>

        {/* Stat Grid */}
        <View style={styles.statsContainer}>
          <TouchableOpacity style={styles.statBox} onPress={() => navigation.navigate('users')}>
            <Icon name="people-outline" size={30} color="#28A745" />
            <Text style={styles.statTitle}>Users</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statBox} onPress={() => navigation.navigate('adaccount')}>
            <Icon name="person-outline" size={30} color="#28A745" />
            <Text style={styles.statTitle}>Admins</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statBox} onPress={() => navigation.navigate('cleaner')}>
            <Icon name="shirt-outline" size={30} color="#28A745" />
            <Text style={styles.statTitle}>Cleaners</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statBox} onPress={() => navigation.navigate('adfeed')}>
            <Icon name="chatbubbles-outline" size={30} color="#28A745" />
            <Text style={styles.statTitle}>Feedbacks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statBox} onPress={() => navigation.navigate('adpay')}>
            <Icon name="cash-outline" size={30} color="#28A745" />
            <Text style={styles.statTitle}>Payments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statBox} onPress={() => navigation.navigate('adinventory')}>
            <Icon name="cube-outline" size={30} color="#28A745" />
            <Text style={styles.statTitle}>Inventory</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statBox} onPress={() => navigation.navigate('adservice')}>
            <Icon name="cube-outline" size={30} color="#28A745" />
            <Text style={styles.statTitle}>Booked Services</Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Icon name="document-text-outline" size={20} color="#FFF" />
            <Text style={styles.buttonText} onPress={() => navigation.navigate('report')}>Generate Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1E6FF',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A0DAD',
    textAlign: 'center',
    marginVertical: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '100%',
  },
  statBox: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'orange',
    paddingVertical: 19,
    paddingHorizontal: 100,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Dashboard;
