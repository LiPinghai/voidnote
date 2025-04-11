// components/NoteList.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppContext } from './AppContext';
import { Swipeable } from 'react-native-gesture-handler';

function NoteList({ onNotePress, onDeleteNote }) {
  const { selectedDate, notes } = useAppContext();
  const filteredNotes = notes.filter(note => note.date === selectedDate);

  const renderRightActions = (noteId) => (
    <TouchableOpacity onPress={() => onDeleteNote(noteId)} style={styles.deleteButton}>
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {filteredNotes.length === 0 ? (
        <Text style={styles.emptyHint}>No notes for the selected date.</Text>
      ) : (
        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Swipeable renderRightActions={() => renderRightActions(item.id)}>
              <TouchableOpacity onPress={() => onNotePress(item)}>
                <View style={styles.card}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.content}>{item.content}</Text>
                </View>
              </TouchableOpacity>
            </Swipeable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
    color: '#666',
  },
  emptyHint: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 100,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default NoteList;