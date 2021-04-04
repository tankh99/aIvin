import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Keyboard, LogBox, StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './navigation/MainNavigator';
import {Provider} from '@ant-design/react-native';

LogBox.ignoreAllLogs();
export default function App() {
  return (
    <Provider>
      <SafeAreaProvider>
        <NavigationContainer>

          <MainNavigator/>

        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
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
