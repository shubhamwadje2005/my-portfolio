import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppNavigator from './User/navigation/AppNavigator';
import { Text, View } from 'react-native';
import { env } from './config/env';

export default function App() {
  const [isDark, setIsDark] = useState(true); // Default to Dark Mode for premium aesthetic

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <Provider store={store}>
      {/* <View><Text>{env.APP_URL}</Text></View> */}
      <SafeAreaProvider>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <AppNavigator isDark={isDark} onToggleTheme={toggleTheme} />
      </SafeAreaProvider>
    </Provider>
  );
}
