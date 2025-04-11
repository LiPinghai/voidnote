import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { useAppContext } from '../components/AppContext';

function DateSelect() {
  const { selectedDate, setSelectedDate } = useAppContext();

  const [calendarVisible, setCalendarVisible] = useState(false);
  
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => setCalendarVisible(true)}>
        <Text style={styles.headerText}>{selectedDate}</Text>
      </TouchableOpacity>
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
                    setSelectedDate(new Date(day.dateString).toISOString().split('T')[0]);
                    setCalendarVisible(false);
                  }}
                  markedDates={{ [selectedDate]: { selected: true, selectedColor: '#007AFF' } }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Aligns the date to the right
    alignItems: 'center',
    padding: 10,
    paddingRight: 20, // Add some padding to the right for spacing
  },
  headerText: {
    fontSize: 18,
    color: '#007AFF',
  },
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
});

export default DateSelect;