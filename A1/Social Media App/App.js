import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Hardcoded user profile data
const userProfile = {
  name: 'sharjeel',
  email: 'sharjeel@gmail.com',
  bio: 'Software Developer | React Native Enthusiast',
  friendsCount: 120,
  postsCount: 45,
  // Paste your profile picture URL here
  profilePic: 'data:image/jpeg;base64,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', // Replace with your URL
  // Paste your cover photo URL here
  coverPhoto: 'https://img.freepik.com/free-vector/app-development-banner_33099-1720.jpg', // Replace with your URL
};

// Hardcoded post data
const posts = [
  {
    id: '1',
    user: 'sharjeel',
    text: 'This is my first post on MAD!',
    image: 'https://www.credencys.com/wp-content/uploads/2020/02/mobile-app-development-lifecycle-steps.jpg', // Replace with your URL
    likes: 10,
    comments: 2,
  },
  {
    id: '2',
    user: 'sharjeel',
    text: 'Enjoying the weekend!',
    image: 'data:image/jpeg;base64,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', // Replace with your URL
    likes: 5,
    comments: 1,
  },
];

// Hardcoded chat messages
const chatMessages = [
  { id: '1', text: 'Hey, how are you?', sender: 'user' },
  { id: '2', text: 'I am good, thanks!', sender: 'other' },
];

// Hardcoded friend requests
const friendRequests = [
  { id: '1', name: 'Ahmed', mutualFriends: 5 },
  { id: '2', name: 'Khawaja', mutualFriends: 2 },
];

// Dark theme styles
const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#FFFFFF',
    backgroundColor: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  coverPhoto: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  email: {
    fontSize: 16,
    color: '#888',
  },
  bio: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  stats: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  postContainer: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  postText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: '#FFFFFF',
    marginLeft: 5,
  },
  chatContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  chatBubble: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#4CAF50',
    alignSelf: 'flex-end',
  },
  otherBubble: {
    backgroundColor: '#333',
    alignSelf: 'flex-start',
  },
  chatText: {
    color: '#FFFFFF',
  },
  notificationText: {
    fontSize: 16,
    color: '#FFFFFF',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  friendRequestContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  friendRequestText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'sharjeel' && password === '123') {
      navigation.replace('MainApp');
    } else {
      alert('Invalid Credentials');
    }
  };

  return (
    <View style={darkStyles.container}>
      <Text style={darkStyles.title}>Login to MAD</Text>
      <TextInput
        style={darkStyles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={darkStyles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={darkStyles.button} onPress={handleLogin}>
        <Text style={darkStyles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <ScrollView style={darkStyles.container}>
      {/* Cover Photo */}
      <Image source={{ uri: userProfile.coverPhoto }} style={darkStyles.coverPhoto} />
      {/* Profile Picture */}
      <Image source={{ uri: userProfile.profilePic }} style={darkStyles.profilePic} />
      <Text style={darkStyles.name}>{userProfile.name}</Text>
      <Text style={darkStyles.email}>{userProfile.email}</Text>
      <Text style={darkStyles.bio}>{userProfile.bio}</Text>
      <Text style={darkStyles.stats}>{userProfile.friendsCount} Friends • {userProfile.postsCount} Posts</Text>
    </ScrollView>
  );
};

const FeedScreen = () => (
  <ScrollView style={darkStyles.container}>
    {posts.map((post) => (
      <View key={post.id} style={darkStyles.postContainer}>
        <Text style={darkStyles.postText}>{post.user}: {post.text}</Text>
        <Image source={{ uri: post.image }} style={darkStyles.postImage} />
        <View style={darkStyles.postActions}>
          <TouchableOpacity style={darkStyles.actionButton}>
            <Ionicons name="heart-outline" size={20} color="#FFFFFF" />
            <Text style={darkStyles.actionText}>{post.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={darkStyles.actionButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#FFFFFF" />
            <Text style={darkStyles.actionText}>{post.comments}</Text>
          </TouchableOpacity>
        </View>
      </View>
    ))}
  </ScrollView>
);

const ChatScreen = () => (
  <View style={darkStyles.chatContainer}>
    <FlatList
      data={chatMessages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View
          style={[
            darkStyles.chatBubble,
            item.sender === 'user' ? darkStyles.userBubble : darkStyles.otherBubble,
          ]}
        >
          <Text style={darkStyles.chatText}>{item.text}</Text>
        </View>
      )}
    />
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
      <TextInput
        style={[darkStyles.input, { flex: 1, marginRight: 10 }]}
        placeholder="Type a message"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={darkStyles.button}>
        <Ionicons name="send" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  </View>
);

const NotificationsScreen = () => (
  <ScrollView style={darkStyles.container}>
    <Text style={darkStyles.notificationText}>New friend request from John Doe</Text>
    <Text style={darkStyles.notificationText}>You have a new message</Text>
    <Text style={darkStyles.notificationText}>Your post got 10 likes</Text>
  </ScrollView>
);

const FriendListScreen = () => (
  <ScrollView style={darkStyles.container}>
    {friendRequests.map((request) => (
      <View key={request.id} style={darkStyles.friendRequestContainer}>
        <Text style={darkStyles.friendRequestText}>{request.name} ({request.mutualFriends} mutual friends)</Text>
        <TouchableOpacity style={darkStyles.button}>
          <Text style={darkStyles.buttonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    ))}
  </ScrollView>
);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#121212' },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tab.Screen name="Feed" component={FeedScreen} options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        )
      }} />
      <Tab.Screen name="Chat" component={ChatScreen} options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="chatbubbles" size={size} color={color} />
        )
      }} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="notifications" size={size} color={color} />
        )
      }} />
      <Tab.Screen name="Friends" component={FriendListScreen} options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="people" size={size} color={color} />
        )
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" size={size} color={color} />
        )
      }} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainApp" component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}