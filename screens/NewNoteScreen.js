import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAppContext } from '../components/AppContext';
import uuid from 'react-native-uuid'; 

export default function NewNoteScreen({ navigation }) {
  const { selectedDate, addNote } = useAppContext();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const saveNote = async () => {
    try {
      if (!title) {
        return;
      }
      const newNote = { id: uuid.v4(), title, content, date: selectedDate };
      addNote(newNote);
      navigation.navigate('Home', { refresh: true });
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={saveNote}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, saveNote]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="What's going on?"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.contentInput}
        placeholder="Thoughts? Feelings?"
        value={content}
        onChangeText={setContent}
        multiline
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff',
    padding: 16
  },
  titleInput: { 
    padding: 10, 
    marginBottom: 15, 
    fontSize: 18,
    borderBottomWidth: 1, 
    borderColor: '#eee',
    color: '#000',
  },
  contentInput: { 
    flex: 1, 
    textAlignVertical: 'top',
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1, 
    borderColor: '#eee',
    color: '#000',
  },
  doneButtonText: { 
    color: '#007AFF', 
    fontSize: 16,
    paddingRight: 15,
  },
});