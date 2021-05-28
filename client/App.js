import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AudioPlayer   from './screens/AudioPlayer'
import AudioRecorder from './screens/AudioRecorder'

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Record">
          <Tab.Screen name="Record" component={AudioRecorder} />
          <Tab.Screen name="Playlist" component={AudioPlayer} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
