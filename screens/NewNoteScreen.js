import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export default function NewNoteScreen({ navigation, route }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const selectedDate = route.params?.selectedDate || new Date().toISOString().split('T')[0];

  const saveNote = async () => {
    try {
      const newNote = { id: uuid.v4(), title, content, date: selectedDate };
      const storedNotes = await AsyncStorage.getItem('diaryNotes');
      const notes = storedNotes ? JSON.parse(storedNotes) : [];
      notes.push(newNote);
      await AsyncStorage.setItem('diaryNotes', JSON.stringify(notes));
      navigation.navigate('Home', { refresh: true });
    } catch (error) {
      console.error("Error saving note:", error);
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
        placeholder="Write your diary note here..."
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={saveNote}>
        <Text style={styles.buttonText}>Save Note</Text>
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