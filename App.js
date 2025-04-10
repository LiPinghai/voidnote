import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import EntryScreen from './screens/EntryScreen';
import { TouchableOpacity, Text } from 'react-native';
import NewEntryScreen from './screens/NewEntryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ route }) => ({
            header: (props) => <CustomHeader {...props} />,
          })}
        />
        <Stack.Screen name="Entry" component={EntryScreen} />
        <Stack.Screen name="NewEntry" component={NewEntryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function CustomHeader({ navigation, route }) {
  const selectedDate = route.params?.selectedDate || new Date().toISOString().split('T')[0];

  return (
    <TouchableOpacity style={styles.headerContainer} onPress={() => navigation.setParams({ calendarVisible: true })}>
      <Text style={styles.headerText}>{selectedDate}</Text>
    </TouchableOpacity>
  );
}

const styles = {
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    color: '#007AFF',
  },
};