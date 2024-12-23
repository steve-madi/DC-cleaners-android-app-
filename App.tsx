import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './app/(tabs)/index';
import CleaningServiceScreen from './app/(tabs)/service';
import LoginScreen from './app/(tabs)/login';
import RegisterScreen from './app/(tabs)/explore';
import BookingHome from './app/(tabs)/bhome';
import BookingCar from './app/(tabs)/car';
import BookingCarpet from './app/(tabs)/carpet';
import BookingLaundry from './app/(tabs)/laundry';
import BookingSofa from './app/(tabs)/sofa';
import BookingPipe from './app/(tabs)/pipe';
import BookingSewege from './app/(tabs)/sewege';
import BookingPainting from './app/(tabs)/painting';
import FeedbackPage from './app/(tabs)/feedback';
import ProfilePage from './app/(tabs)/profile';
import StartPage from './app/(tabs)/start';
import PaymentScreen from './app/(tabs)/payment';
import UsersPage from './app/(tabs)/users';
import Dashboard from './app/(tabs)/admindashboard';
import FeedbackListPage from './app/(tabs)/adfeed';
import PaymentHistoryPage from './app/(tabs)/adpay';
import AdminsPage from './app/(tabs)/adaccount';
import CleanersPage from './app/(tabs)/cleaner';
import InventoryForm from './app/(tabs)/inventory';
import BookedServicesPage from './app/(tabs)/adservice';
import InventoryItemsPage from './app/(tabs)/adinventory';
import CleanersDashboard from './app/(tabs)/cledash';
import MapScreen from './app/(tabs)/view';
import ReportPage from './app/(tabs)/report';
import firebaseConfig from './app/(tabs)/firebaseConfig';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{ headerShown: false }} // Hide navigation bar on Login screen
        />
        <Stack.Screen name="index" component={HomePage} options={{ title: 'Home' }} />
        <Stack.Screen name="service" component={CleaningServiceScreen} options={{ title: 'Service' }} />
        <Stack.Screen name="explore" component={RegisterScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="bhome" component={BookingHome} options={{ title: 'Booking Home' }} />
        <Stack.Screen name="car" component={BookingCar} options={{ title: 'Car Booking' }} />
        <Stack.Screen name="carpet" component={BookingCarpet} options={{ title: 'Carpet Booking' }} />
        <Stack.Screen name="laundry" component={BookingLaundry} options={{ title: 'Laundry Booking' }} />
        <Stack.Screen name="sofa" component={BookingSofa} options={{ title: 'Sofa Booking' }} />
        <Stack.Screen name="pipe" component={BookingPipe} options={{ title: 'Pipe Booking' }} />
        <Stack.Screen name="sewege" component={BookingSewege} options={{ title: 'Sewage Booking' }} />
        <Stack.Screen name="painting" component={BookingPainting} options={{ title: 'Painting Booking' }} />
        <Stack.Screen name="feedback" component={FeedbackPage} options={{ title: 'Feedback' }} />
        <Stack.Screen name="profile" component={ProfilePage} options={{ title: 'Profile' }} />
        <Stack.Screen name="start" component={StartPage} options={{ title: 'Start' }} />
        <Stack.Screen name="payment" component={PaymentScreen} options={{ title: 'Payment' }} />
        <Stack.Screen name="users" component={UsersPage} options={{ title: 'Users' }} />
        <Stack.Screen name="admindashboard" component={Dashboard} options={{ title: 'Admin Dashboard' }} />
        <Stack.Screen name="adfeed" component={FeedbackListPage} options={{ title: 'Admin Feedback' }} />
        <Stack.Screen name="adpay" component={PaymentHistoryPage} options={{ title: 'Payment History' }} />
        <Stack.Screen name="adaccount" component={AdminsPage} options={{ title: 'Admin Account' }} />
        <Stack.Screen name="cleaner" component={CleanersPage} options={{ title: 'Cleaner' }} />
        <Stack.Screen name="inventory" component={InventoryForm} options={{ title: 'Inventory' }} />
        <Stack.Screen name="adservice" component={BookedServicesPage} options={{ title: 'Booked Services' }} />
        <Stack.Screen name="adinventory" component={InventoryItemsPage} options={{ title: 'Inventory Items' }} />
        <Stack.Screen name="cledash" component={CleanersDashboard} options={{ title: 'Cleaners Dashboard' }} />
        <Stack.Screen name="view" component={MapScreen} options={{ title: 'Map' }} />
        <Stack.Screen name="report" component={ReportPage} options={{ title: 'Report' }} />
        <Stack.Screen name="firebaseConfig" component={firebaseConfig} options={{ title: 'Report' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
