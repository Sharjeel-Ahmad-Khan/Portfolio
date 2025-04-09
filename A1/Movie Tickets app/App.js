import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, FlatList, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Card, Button as PaperButton } from 'react-native-paper';

// Stack Navigator Setup
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Home Screen
const HomeScreen = ({ navigation }) => {
  const data = [
    { 
      id: '1', 
      title: 'Movie: Avatar 2', 
      category: 'Movies', 
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1HYfK-Pi23lfLnh9_ucU81wrnnx3DzL2yk4j5v64wXn6GBlI&s',
      description: 'The sequel to the highest-grossing film of all time, Avatar 2 takes viewers back to Pandora for a new adventure.'
    },
    { 
      id: '2', 
      title: 'Event: Coldplay Concert', 
      category: 'Events', 
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX1YrN-UzDtlq_RfiqhNGnUeZn4G1JMrq8oQ&s', 
      description: 'Join Coldplay for their unforgettable concert experience with hit songs and amazing visuals!'
    },
    { 
      id: '3', 
      title: 'Flight: NY to LA', 
      category: 'Flights', 
      imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQdNbWxYwcRQayvOU3R5UPej6EJ8UA-WmCPki0Xfzlv97lYZuaX', 
      description: 'Fly comfortably with our affordable flights from New York to Los Angeles.'
    },
    { 
      id: '4', 
      title: 'Movie: The Batman', 
      category: 'Movies', 
      imageUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTiV4oMXBY5afi-fkyx2ut-tSXi7sCuHjC4QiUNEaI89Yy4ox-y', 
      description: 'A new take on Gotham’s Dark Knight, starring Robert Pattinson as Batman.'
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Available Tickets</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            <PaperButton
              icon="ticket"
              mode="contained"
              onPress={() => alert('Booking functionality not implemented yet.')}
            >
              Book Now
            </PaperButton>
          </Card>
        )}
      />
    </ScrollView>
  );
};

// Search & Filter Screen
const SearchFilterScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Search & Filter</Text>
      <TextInput
        style={styles.input}
        placeholder="Search Events, Movies, Flights"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <TextInput
        style={styles.input}
        placeholder="Filter by Date"
        value={filterDate}
        onChangeText={setFilterDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Filter by Location"
        value={filterLocation}
        onChangeText={setFilterLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Filter by Price Range"
        value={filterPrice}
        onChangeText={setFilterPrice}
      />
      <PaperButton icon="filter" mode="contained" onPress={() => alert('Filters Applied')}>
        Apply Filters
      </PaperButton>
    </ScrollView>
  );
};

// Payment Screen
const PaymentScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Payment</Text>
      <TextInput style={styles.input} placeholder="Enter promo code" />
      <PaperButton icon="cash" mode="contained" onPress={() => alert('Payment Successful')}>
        Pay Now
      </PaperButton>
    </ScrollView>
  );
};

// My Bookings Screen
const MyBookingsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Bookings</Text>
      <Text>Upcoming Booking: Movie - Avatar 2 at 7:00 PM</Text>
      <Text>Past Booking: Concert - Coldplay</Text>
      <PaperButton icon="home" mode="contained" onPress={() => alert('Booking Canceled')}>
        Cancel Booking
      </PaperButton>
      <PaperButton icon="details" mode="contained" onPress={() => alert('View Details')}>
        View Details
      </PaperButton>
    </ScrollView>
  );
};

// Profile & Settings Screen
const ProfileSettingsScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Profile & Settings</Text>
      <Text>Name: John Doe</Text>
      <Text>Email: johndoe@example.com</Text>
      <Text>Phone: +123 456 7890</Text>
      <PaperButton icon="account-edit" mode="contained" onPress={() => alert('Edit Profile')}>
        Edit Profile
      </PaperButton>
      <Text style={styles.subHeader}>Payment History</Text>
      <Text>Transaction 1: Movie - Avatar 2 - $15</Text>
      <Text>Transaction 2: Concert - Coldplay - $50</Text>
      <PaperButton icon="home" mode="contained" onPress={() => alert('View Past Transactions')}>
        View Past Transactions
      </PaperButton>
    </ScrollView>
  );
};

// Drawer Navigation Setup
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Search & Filter" component={SearchFilterScreen} />
      <Drawer.Screen name="Payment" component={PaymentScreen} />
      <Drawer.Screen name="My Bookings" component={MyBookingsScreen} />
      <Drawer.Screen name="Profile & Settings" component={ProfileSettingsScreen} />
    </Drawer.Navigator>
  );
};

// App Navigation Setup
export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    color: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#333',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  largeImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#bbb',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#333',
    padding: 10,
    marginBottom: 10,
    color: '#fff',
  },
});