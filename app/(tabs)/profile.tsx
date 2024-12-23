import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { db } from './firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ProfilePage = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Personal Info');
  const [completedServices, setCompletedServices] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  }; 

  const fetchUserInfo = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, where('loggedIn', '==', true));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        setUserInfo(userDoc.data());
      } else {
        Alert.alert("Error", "No logged-in user found.");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      Alert.alert("Error", "Could not fetch user information.");
    }
  };

  const fetchCompletedServices = async () => {
    try {
      const servicesCollection = collection(db, 'bookedServices');
      const q = query(servicesCollection, where('status', 'in', ['approved', 'completed']));
      const querySnapshot = await getDocs(q);
      const servicesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        serviceName: doc.data().serviceName,
        status: doc.data().status
      }));
      setCompletedServices(servicesList);
    } catch (error) {
      console.error("Error fetching completed services:", error);
      Alert.alert("Error", "Could not fetch completed services.");
    }
  };

  useEffect(() => {
    if (activeTab === 'Personal Info') {
      fetchUserInfo();
    } else if (activeTab === 'Activities') {
      fetchCompletedServices();
    }
  }, [activeTab]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('index')} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://www.bing.com/ck/a?!&&p=5a86f01754a3c813e33d6c70910b2a6fca5f8abd1efce13aa762ebecde6cf6fbJmltdHM9MTczMDg1MTIwMA&ptn=3&ver=2&hsh=4&fclid=2368443a-4c43-6b21-1333-57f54d436ab2&u=a1L2ltYWdlcy9zZWFyY2g_cT1wcm9maWxlJTIwaWNvbiZGT1JNPUlRRlJCQSZpZD04QkJFM0E1NEEyNkJFREZGRTYxMDgwNkNFMUU1MERCMjI2QUQ1RDAw&ntb=1' }} 
          style={styles.profileImage} 
        />
        <Text style={styles.name}>{userInfo ? userInfo.username : 'User'}</Text>
        <Text style={styles.role}>Potential Customer</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="whatsapp" size={24} color="#3DDC84" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="email" size={24} color="#7B5CF5" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="phone" size={24} color="#3B82F6" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Personal Info' && styles.activeTab]} 
          onPress={() => handleTabSwitch('Personal Info')}
        >
          <Text style={[styles.tabText, activeTab === 'Personal Info' && styles.activeTabText]}>Personal Info</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Activities' && styles.activeTab]} 
          onPress={() => handleTabSwitch('Activities')}
        >
          <Text style={[styles.tabText, activeTab === 'Activities' && styles.activeTabText]}>Activities</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'Personal Info' && userInfo && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Email: {userInfo.email}</Text>
          <Text style={styles.infoText}>Reference: {userInfo.loginNumber}</Text>
        </View>
      )}

      {activeTab === 'Activities' && (
        <View style={styles.activityContainer}>
          {completedServices.length > 0 ? (
            completedServices.map(service => (
              <View key={service.id} style={styles.activityItem}>
                <Text style={styles.activityTitle}>{service.serviceName}</Text>
                <Text style={styles.activitySubtitle}>
                  Status: {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noActivitiesText}>No completed services available.</Text>
          )}
        </View>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.buttonText}>Edit Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.historyButton}>
          <Text style={styles.buttonText}>History</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    padding: 20, 
    backgroundColor: '#F2F3F8', 
    alignItems: 'center' 
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    padding: 8,
  },
  header: { 
    alignItems: 'center', 
    marginBottom: 20 
  },
  profileImage: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    marginBottom: 10 
  },
  name: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  role: { 
    fontSize: 16, 
    color: '#888', 
    marginBottom: 10 
  },
  iconRow: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginVertical: 10 
  },
  iconButton: { 
    marginHorizontal: 10, 
    padding: 10, 
    borderRadius: 30, 
    backgroundColor: '#FFF', 
    elevation: 3 
  },
  tabContainer: { 
    flexDirection: 'row', 
    width: '100%', 
    marginBottom: 20 
  },
  tab: { 
    flex: 1, 
    paddingVertical: 10, 
    alignItems: 'center', 
    backgroundColor: '#F2F3F8', 
    borderRadius: 8 
  },
  activeTab: { 
    backgroundColor: '#FFF', 
    borderBottomWidth: 2, 
    borderBottomColor: '#3B82F6' 
  },
  tabText: { 
    fontSize: 16, 
    color: '#999' 
  },
  activeTabText: { 
    color: '#3B82F6', 
    fontWeight: 'bold' 
  },
  infoContainer: { 
    width: '100%', 
    padding: 20, 
    backgroundColor: '#FFF', 
    borderRadius: 15, 
    elevation: 3 
  },
  infoText: { 
    fontSize: 16, 
    color: '#444', 
    marginVertical: 5 
  },
  activityContainer: { 
    width: '100%', 
    padding: 20, 
    backgroundColor: '#FFF', 
    borderRadius: 15, 
    elevation: 3 
  },
  activityItem: { 
    marginVertical: 10 
  },
  activityTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  activitySubtitle: { 
    fontSize: 14, 
    color: '#777' 
  },
  noActivitiesText: {
    textAlign: 'center',
    color: '#777',
    fontSize: 16,
  },
  buttonRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: '100%', 
    marginTop: 20 
  },
  editButton: { 
    backgroundColor: '#4CAF50', 
    paddingVertical: 10, 
    paddingHorizontal: 30, 
    borderRadius: 30 
  },
  historyButton: { 
    backgroundColor: '#FF9800', 
    paddingVertical: 10, 
    paddingHorizontal: 30, 
    borderRadius: 30 
  },
  buttonText: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});

export default ProfilePage;
