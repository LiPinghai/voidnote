// components/AppContext.js
import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState([]);
  
  // This context provides global state management for selectedDate and notes.
  // It includes functions to add, delete, and edit notes, and initializes notes from AsyncStorage.
  React.useEffect(() => {
    const loadNotesFromStorage = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem('diaryNotes');
        if (storedNotes) {
          setNotes(JSON.parse(storedNotes));
        }
      } catch (error) {
        console.error("Error loading notes from storage:", error);
      }
    };

    loadNotesFromStorage();
  }, []);

  const addNote = async (note) => {
    setNotes(prevNotes => {
      const updatedNotes = [...prevNotes, note];
      AsyncStorage.setItem('diaryNotes', JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  const deleteNote = async (noteId) => {
    setNotes(prevNotes => {
      const updatedNotes = prevNotes.filter(note => note.id !== noteId);
      AsyncStorage.setItem('diaryNotes', JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  const editNote = async (updatedNote) => {
    setNotes(prevNotes => {
      const updatedNotes = prevNotes.map(note => note.id === updatedNote.id ? updatedNote : note);
      AsyncStorage.setItem('diaryNotes', JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  return (
    <AppContext.Provider value={{ selectedDate, setSelectedDate, notes, addNote, deleteNote, editNote }}>
      {children}
    </AppContext.Provider>
  );
};