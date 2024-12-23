import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const services = [
  { id: 1, name: 'Cleaning', icon: 'broom', color: '#4CAF50' },
  { id: 2, name: 'Cooking', icon: 'chef-hat', color: '#FF9800' },
  { id: 3, name: 'Wash & Fold', icon: 'tshirt-crew', color: '#00BCD4' },
  { id: 4, name: 'Painting', icon: 'roller', color: '#FF5722' },
  { id: 5, name: 'Plumbing', icon: 'pipe-wrench', color: '#2196F3' },
  { id: 6, name: 'Carpet Cleaning', icon: 'rug', color: '#673AB7' },
];

const ServiceCard = ({ name, icon, color }) => {
  return (
    <TouchableOpacity style={[styles.serviceCard, { borderColor: color }]}>
      <Icon name={icon} size={40} color={color} />
      <Text style={styles.serviceText}>{name}</Text>
    </TouchableOpacity>
  );
};

const ChooseServiceScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Image or Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Choose your Service</Text>
      </View>

      {/* Services List */}
      <View style={styles.servicesContainer}>
        {services.map(service => (
          <ServiceCard key={service.id} name={service.name} icon={service.icon} color={service.color} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F4F7FC',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    paddingVertical: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  serviceText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ChooseServiceScreen;
