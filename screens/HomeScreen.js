import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import DateSelect from '../components/DateSelect';
import NoteList from '../components/NoteList'; // Import the NoteList component
import { useAppContext } from '../components/AppContext';

export default function HomeScreen({ navigation }) {
  const { notes, deleteNote, editNote, selectedDate } = useAppContext();

  return (
    <View style={styles.container}>
      <DateSelect/>
      <NoteList
         notes={notes}
         onNotePress={(note) => navigation.navigate('Note', { note })}
         onDeleteNote={deleteNote}
         onEditNote={editNote}
       />
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('NewNote', { selectedDate })}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  addButton: {
    backgroundColor: '#FFFFFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  addButtonText: {
    color: '#ccc',
    fontSize: 28,
    lineHeight: 28,
  },
});