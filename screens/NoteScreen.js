import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function NoteScreen({ route }) {
  const { note } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content}>{note.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  content: { fontSize: 16 },
});