import { Tabs, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check user login status when the app starts
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken'); // Retrieve token from AsyncStorage
        const loggedIn = !!token; // If token exists, the user is logged in
        setIsLoggedIn(loggedIn);

        // Redirect to login page if not logged in
        if (!loggedIn) {
          router.replace('/login'); // Replace current route with login page
        }
      } catch (error) {
        console.error('Failed to check login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        // Hide the tab bar on the login page
        tabBarStyle: ['login', 'explore'].includes(route.name) ? { display: 'none' } : {},
      })}
    >
      {/* Dashboard Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
 {/* Payment Tab */}
 <Tabs.Screen
        name="payment"
        options={{
          title: 'Payment',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'card' : 'card-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="view"
        options={{
          title: 'Location',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'location' : 'location-outline'} color={color} />
          ),
        }}
      />
      {/* Login Tab */}
      <Tabs.Screen
        name="login"
        options={{
          title: 'Logout',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'log-out-outline' : 'log-in-outline'} color={color} />
          ),
        }}
      />
      

      {/* Service Tab - Hidden from the tab bar */}
      <Tabs.Screen
        name="service"
        options={{
          title: 'Service',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bhome"
        options={{
          title: 'book',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'register',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="car"
        options={{
          title: 'bookc',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="carpet"
        options={{
          title: 'bookcr',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="feedback"
        options={{
          title: 'feed',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="laundry"
        options={{
          title: 'laundry',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="painting"
        options={{
          title: 'paint',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pipe"
        options={{
          title: 'pipe',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sewege"
        options={{
          title: 'sewege',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sofa"
        options={{
          title: 'sofa',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="start"
        options={{
          title: 'start',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="default"
        options={{
          title: 'Service',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="users"
        options={{
          title: 'users',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="adfeed"
        options={{
          title: 'adfeed',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="adpay"
        options={{
          title: 'adpay',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="adaccount"
        options={{
          title: 'adaccount',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="cleaner"
        options={{
          title: 'cleaner',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: 'inventory',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="adservice"
        options={{
          title: 'adservice',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="adinventory"
        options={{
          title: 'adservice',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cledash"
        options={{
          title: 'cledash',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="admindashboard"
        options={{
          title: 'admindashboard',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="firebaseConfig"
        options={{
          title: 'firebaseConfig',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'report',
          tabBarButton: () => null,  // Hides the tab button for the Service tab
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
