// screens/HomeScreen.tsx
import { Pressable, ScrollView, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

type Memory = { id: string; title: string; imageUrl: string };

const HomeScreen = () => {
  const navigation: any = useNavigation();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  // Real-time updates
  useEffect(() => {
    const q = query(collection(db, 'memories'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const data: Memory[] = snap.docs.map((d) => ({
        id: d.id,
        title: d.get('title') ?? '',
        imageUrl: d.get('imageUrl') ?? '',
      }));
      setMemories(data);
      setLoading(false);
    }, () => setLoading(false));
    return unsub;
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Pressable onPress={() => navigation.navigate('Add')} style={{ alignSelf: 'flex-end', marginBottom: 12 }}>
        <MaterialIcons name="add-photo-alternate" size={28} color="green" />
      </Pressable>

      {loading && <ActivityIndicator />}

      {memories.map((m) => (
        <View key={m.id} style={styles.card}>
          <Image style={styles.img} source={{ uri: m.imageUrl }} />
          <Text style={{ marginTop: 8 }}>{m.title}</Text>
        </View>
      ))}

      {!loading && memories.length === 0 && (
        <Text>No memories yet. Tap the + icon to add one.</Text>
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: {
    backgroundColor: 'white',
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 8,
    elevation: 1,
  },
  img: { width: '100%', height: 200, resizeMode: 'cover', borderRadius: 6 },
});
