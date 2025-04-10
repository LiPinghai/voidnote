import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateSelect from '../components/DateSelect';
import NoteList from '../components/NoteList'; // Import the NoteList component

export default function HomeScreen({ navigation, route }) {
  const [notes, setNotes] = useState([]);
  const [selectedDate] = useState(new Date().toISOString().split('T')[0]);

  const loadNotes = async (date) => {
    const storedNotes = await AsyncStorage.getItem('diaryNotes');
    const allNotes = storedNotes ? JSON.parse(storedNotes) : [];
    const filteredNotes = allNotes.filter(note => note.date === date);
    setNotes(filteredNotes);
  };

  useEffect(() => {
    loadNotes(selectedDate);
    navigation.setParams({ selectedDate });
  }, [selectedDate]);

  useEffect(() => {
    if (route.params?.refresh) {
      loadNotes(selectedDate);
    }
    if (route.params?.calendarVisible !== undefined) {
      setCalendarVisible(route.params.calendarVisible);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <DateSelect navigation={navigation} route={route} />
      <NoteList notes={notes} onNotePress={(note) => navigation.navigate('Note', { note })} />
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