import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import NoteScreen from './screens/NoteScreen';
import NewNoteScreen from './screens/NewNoteScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="Note" component={NoteScreen} />
        <Stack.Screen name="NewNote" component={NewNoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


