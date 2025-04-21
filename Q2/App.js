import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const characters = [
  {
    id: '1',
    name: 'Ollie the Panda',
    imageUrl: 'https://i.imgur.com/CYVpZqi.png',
    film: 'Panda Picnic',
  },
  {
    id: '2',
    name: 'Mimi the Koala',
    imageUrl: 'https://i.imgur.com/MzL3K8P.png',
    film: 'Treehouse Friends',
  },
  {
    id: '3',
    name: 'Leo the Lion',
    imageUrl: 'https://i.imgur.com/HbBz5jP.png',
    film: 'Jungle Roar',
  },
  {
    id: '4',
    name: 'Lila the Cat',
    imageUrl: 'https://i.imgur.com/QYqX1Zk.png',
    film: 'Whisker World',
  },
  {
    id: '5',
    name: 'Toby the Turtle',
    imageUrl: 'https://i.imgur.com/Fo5ShQj.png',
    film: 'Shell Tales',
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>✨ Animal Explorer ✨</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        {characters.map((char) => (
          <View key={char.id} style={styles.card}>
            <Image
              source={{
                uri: char.imageUrl,
              }}
              style={styles.image}
            />
            <Text style={styles.name}>{char.name}</Text>
            <Text style={styles.subtext}>🎬 {char.film}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF7',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3B3B98',
    textAlign: 'center',
    marginBottom: 20,
  },
  scroll: {
    alignItems: 'center',
    paddingBottom: 50,
  },
  card: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: '#222',
  },
  subtext: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
});