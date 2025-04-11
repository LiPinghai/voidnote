// components/NoteList.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { useSelectedDate } from './SelectedDateContext'; // Import the context
import { useAppContext } from './AppContext';

function NoteList({ onNotePress }) {
  const { selectedDate, notes } = useAppContext();
  // Filter notes to only include those created on the selected date
  const filteredNotes = notes.filter(note => {
    return note.date === selectedDate;
  });

  return (
    <View style={styles.container}>
      {filteredNotes.length === 0 ? (
        <Text style={styles.emptyHint}>No notes for the selected date.</Text>
      ) : (
        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onNotePress(item)}>
              <View style={styles.card}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.content}>{item.content}</Text>
              </View>
            </TouchableOpacity>
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
});

export default NoteList;