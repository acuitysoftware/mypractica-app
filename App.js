import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { useFonts, Poppins_400Regular, Poppins_700Bold, Poppins_600SemiBold, Poppins_500Medium } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react';
import { AuthProvider } from './src/context/AuthContext';
import Toast from 'react-native-toast-message';
SplashScreen.preventAutoHideAsync();
export default function App() {


  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_500Medium// Bold variant
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();
  return (
    <AuthProvider>
      <AppNavigator onLayout={onLayoutRootView} />
      <Toast />
    </AuthProvider>
  );
}


