// screens/AddScreen.tsx
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { uploadImageToBucket } from '../services/BucketService';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const AddScreen = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // <-- fix
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!image) return Alert.alert('Choose an image first');
    if (!title.trim()) return Alert.alert('Please add a title');

    try {
      setSaving(true);
      // 1) Upload to Storage
      const imageUrl = await uploadImageToBucket(image, `memory-${Date.now()}.jpg`);
      // 2) Save doc in Firestore
      await addDoc(collection(db, 'memories'), {
        title: title.trim(),
        imageUrl,
        createdAt: serverTimestamp(),
      });
      // 3) Reset UI
      setTitle('');
      setImage(null);
      Alert.alert('Saved!', 'Your memory was added.');
    } catch (err: any) {
      console.log(err);
      Alert.alert('Error', err?.message ?? 'Could not save memory');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputField}
        placeholder="Memory Title"
        onChangeText={setTitle}
        value={title}
      />

      <Button title="Pick an Image" onPress={pickImage} />

      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20 }} />
      )}

      <TouchableOpacity style={[styles.button, saving && { opacity: 0.6 }]} onPress={handleSave} disabled={saving}>
        <Text style={styles.buttonText}>{saving ? 'Saving…' : 'Add Memory'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  inputField: { borderWidth: 2, borderColor: 'black', marginTop: 15, padding: 10 },
  button: { backgroundColor: 'green', textAlign: 'center', padding: 15, marginTop: 30 },
  buttonText: { textAlign: 'center', color: 'white' },
});
