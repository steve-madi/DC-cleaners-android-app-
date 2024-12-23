import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDropdown}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
        <Text style={styles.location}>Blantyre Malawi</Text>
        <TouchableOpacity>
          <Icon name="notifications-outline" size={30} />
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      {isDropdownVisible && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity style={styles.dropdownItem}>
            <Icon name="person-outline" size={20} color="white" />
            <Text style={styles.dropdownText} onPress={() => navigation.navigate('profile')}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem}>
            <Icon name="log-in-outline" size={20} color="white" />
            <Text style={styles.dropdownText} onPress={() => navigation.navigate('login')}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem}>
            <Icon name="chatbubble-outline" size={20} color="white" />
            <Text style={styles.dropdownText} onPress={() => navigation.navigate('feedback')}>Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem}>
            <Icon name="person-add-outline" size={20} color="white" />
            <Text style={styles.dropdownText} onPress={() => navigation.navigate('explore')}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem}>
            <Icon name="log-out-outline" size={20} color="white" />
            <Text style={styles.dropdownText} onPress={() => navigation.navigate('login')}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Greeting */}
      <Text style={styles.greeting}>Welcome!!!</Text>
      <Text style={styles.question}>What are you looking for today?</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search what you need..." />
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Offer Section */}
      <View style={styles.offerCard}>
        <Text style={styles.offerText}>Offer cleaning Service</Text>
        <Text style={styles.offerDiscount}>Get 25%</Text>
        <TouchableOpacity style={styles.offerButton}>
          <Text style={styles.offerButtonText}>Grab Offer</Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {['carpet cleaning', 'House cleaning', 'Sofa cleaning'].map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryButton}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>See All</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Cleaning Services */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Cleaning Services</Text>
        <TouchableOpacity>
          <Text style={styles.sectionLink}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.serviceContainer}>
        <View style={styles.serviceCard}>
          <Image
            source={{ uri: 'https://th.bing.com/th/id/OIP.4FSHDXzt4ofm6C9MFS1jRAHaE7?w=223&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7' }}
            style={styles.serviceImage}
          />
          <Text style={styles.serviceTitle}>Home Cleaning</Text>
          <Text style={styles.price}>Mwk 50,000</Text>
          <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('bhome')}>
            <Text style={styles.bookButtonText}>Book</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.serviceCard}>
          <Image
            source={{ uri: 'https://th.bing.com/th/id/OIF.kJLqZtFO0lxulWMwameBgQ?w=241&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7' }}
            style={styles.serviceImage}
          />
          <Text style={styles.serviceTitle}>Carpet Cleaning</Text>
          <Text style={styles.price}>Mwk 30,000</Text>
          <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('carpet')}>
            <Text style={styles.bookButtonText}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.serviceContainer}>
        <View style={styles.serviceCard}>
          <Image
            source={{ uri: 'https://th.bing.com/th/id/OIP.4fCBHM1iQBLhdhYnRYqgbQHaE8?w=298&h=199&c=7&r=0&o=5&dpr=1.1&pid=1.7' }}
            style={styles.serviceImage}
          />
          <Text style={styles.serviceTitle}>Car Wash</Text>
          <Text style={styles.price}>Mwk 20,000</Text>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => navigation.navigate('car')}
          >
            <Text style={styles.bookButtonText}>Book</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.serviceCard}>
          <Image
            source={{ uri: 'https://th.bing.com/th/id/OIP.vYN-KZcEfnZse-9_GcUMAgHaEK?w=296&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7' }}
            style={styles.serviceImage}
          />
          <Text style={styles.serviceTitle}>Sofa Cleaning</Text>
          <Text style={styles.price}>Mwk 40,000</Text>
          <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('sofa')}>
            <Text style={styles.bookButtonText}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.serviceContainer}>
        <View style={styles.serviceCard}>
          <Image
            source={{ uri: 'https://th.bing.com/th/id/OIP._uIlYAzwdVnPhng_OjR7mwHaE7?w=247&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7' }}
            style={styles.serviceImage}
          />
          <Text style={styles.serviceTitle}>House Painting</Text>
          <Text style={styles.price}>Mwk 60,000</Text>
          <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('painting')}>
            <Text style={styles.bookButtonText}>Book</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.serviceCard}>
          <Image
            source={{ uri: 'https://th.bing.com/th/id/OIP.m7J5201e5x78AE3i2UxgFQHaFr?w=233&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7' }}
            style={styles.serviceImage}
          />
          <Text style={styles.serviceTitle}>Laundry</Text>
          <Text style={styles.price}>Mwk 15,000</Text>
          <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('laundry')}>
            <Text style={styles.bookButtonText}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.serviceContainer}>
        <View style={styles.serviceCard}>
          <Image
            source={{ uri: 'https://th.bing.com/th/id/OIP.i4QF3taNdzNgxghsifQxwQHaE8?w=255&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7' }}
            style={styles.serviceImage}
          />
          <Text style={styles.serviceTitle}>Sewage Treatment</Text>
          <Text style={styles.price}>Mwk 70,000</Text>
          <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('sewege')}>
            <Text style={styles.bookButtonText}>Book</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.serviceCard}>
          <Image
            source={{ uri: 'https://th.bing.com/th/id/OIF.ehX3vr2Qy0IG9Z9kqVw9RA?w=272&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7' }}
            style={styles.serviceImage}
          />
          <Text style={styles.serviceTitle}>Pipe Cleaning</Text>
          <Text style={styles.price}>Mwk 25,000</Text>
          <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('pipe')}>
            <Text style={styles.bookButtonText}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'orange',
    padding:20,
    borderRadius:10,
  },
  location: {
    fontSize: 16,
    fontWeight: '600',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
  },
  question: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
  },
  dropdownMenu: {
    backgroundColor: '#6200EE',
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    elevation: 3,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  offerCard: {
    backgroundColor: '#E0F7FA',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  offerText: {
    fontSize: 16,
    fontWeight: '600',
  },
  offerDiscount: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 5,
  },
  offerButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  offerButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  categoryButton: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  categoryText: {
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionLink: {
    color: '#6200EE',
  },
  serviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  serviceImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  serviceTitle: {
    marginTop: 10,
    fontWeight: '600',
  },
  price: {
    color: 'purple',
    fontSize: 16,
    marginTop: 5,
  },
  bookButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  bookButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});

export default HomePage;
