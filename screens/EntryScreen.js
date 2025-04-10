import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function EntryScreen({ route }) {
  const { entry } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{entry.title}</Text>
      <Text style={styles.content}>{entry.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  content: { fontSize: 16 },
});