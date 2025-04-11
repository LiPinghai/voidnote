import React from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function NoteScreen({ route, navigation }) {
  const { note } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('NewNote', { note })}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, note]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content}>{note.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff',
    padding: 16
  },
  title: { 
    fontSize: 18,
    fontWeight: 'bold', 
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
    padding: 10,
    color: '#000',
  },
  content: { 
    fontSize: 16,
    padding: 10,
  },
  editButtonText: { 
    color: '#007AFF', 
    fontSize: 16,
    paddingRight: 15,
  },
});