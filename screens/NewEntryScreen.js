import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export default function NewEntryScreen({ navigation, route }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const selectedDate = route.params?.selectedDate || new Date().toISOString().split('T')[0];

  const saveEntry = async () => {
    try {
      const newEntry = { id: uuid.v4(), title, content, date: selectedDate };
      const storedEntries = await AsyncStorage.getItem('diaryEntries');
      const entries = storedEntries ? JSON.parse(storedEntries) : [];
      entries.push(newEntry);
      await AsyncStorage.setItem('diaryEntries', JSON.stringify(entries));
      navigation.navigate('Home', { refresh: true });
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="Write your diary entry here..."
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={saveEntry}>
        <Text style={styles.buttonText}>Save Entry</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
  contentInput: { height: 200, textAlignVertical: 'top' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
});