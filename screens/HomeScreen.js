import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateSelect from '../components/DateSelect';
export default function HomeScreen({ navigation, route }) {
  const [notes, setNotes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const loadNotes = async (date) => {
    const storedNotes = await AsyncStorage.getItem('diaryNotes');
    const allNotes = storedNotes ? JSON.parse(storedNotes) : [];
    const filteredNotes = allNotes.filter(note => note.date === date);
    setNotes(filteredNotes);
  };

  useEffect(() => {
    loadNotes(selectedDate);
    navigation.setParams({ selectedDate }); // Update the header title with the selected date
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
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Note', { note: item })}>
            <Text style={styles.note}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NewNote', { selectedDate })}>
        <Text style={styles.buttonText}>Add New Note</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: '90%',
  },
  note: { fontSize: 18, marginVertical: 10 },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 16 },
});