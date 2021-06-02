import React                        from 'react';
import { NavigationContainer }      from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AudioPlayer                  from './screens/AudioPlayer'
import AudioRecorder                from './screens/AudioRecorder'
import HeaderBar                    from './screens/HeaderBar';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <React.Fragment>
      <HeaderBar />
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Record">
          <Tab.Screen name="Record"   component={AudioRecorder} />
          <Tab.Screen name="Playlist" component={AudioPlayer} />
        </Tab.Navigator>
      </NavigationContainer>
    </React.Fragment>
  );
}
