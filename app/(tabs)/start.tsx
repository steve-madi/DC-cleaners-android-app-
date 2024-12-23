import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const StartPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clean Home</Text>
      <Text style={styles.subtitle}>Clean Life</Text>
      <Image
        source={{
          uri: 'https://clipart-library.com/newhp/13-133435_cleaning-clipart-worker-window-cleaning-clip-art.png',
        }}
        style={styles.illustration}
      />
       <Text style={styles.subtitle}> "Hey there! We're thrilled to have you on board. Let's get your home shining together!"
       </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8C00', // Solid orange color
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: 200,
    height: 250,
    marginBottom: 30,
    borderRadius:20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f9a825', // Slightly different yellowish tone for the button
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default StartPage;
