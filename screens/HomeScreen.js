import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';

export default function HomeScreen({ navigation, route }) {
  const [entries, setEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const loadEntries = async (date) => {
    const storedEntries = await AsyncStorage.getItem('diaryEntries');
    const allEntries = storedEntries ? JSON.parse(storedEntries) : [];
    const filteredEntries = allEntries.filter(entry => entry.date === date);
    setEntries(filteredEntries);
  };

  useEffect(() => {
    loadEntries(selectedDate);
    navigation.setParams({ selectedDate }); // Update the header title with the selected date
  }, [selectedDate]);

  useEffect(() => {
    if (route.params?.refresh) {
      loadEntries(selectedDate);
    }
    if (route.params?.calendarVisible !== undefined) {
      setCalendarVisible(route.params.calendarVisible);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Modal
        visible={calendarVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCalendarVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setCalendarVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.calendarContainer}>
                <Calendar
                  onDayPress={(day) => {
                    setSelectedDate(day.dateString);
                    setCalendarVisible(false);
                    navigation.setParams({ calendarVisible: false });
                  }}
                  markedDates={{ [selectedDate]: { selected: true, selectedColor: '#007AFF' } }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Entry', { entry: item })}>
            <Text style={styles.entry}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NewEntry', { selectedDate })}>
        <Text style={styles.buttonText}>Add New Entry</Text>
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
  entry: { fontSize: 18, marginVertical: 10 },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 16 },
});