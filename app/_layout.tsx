import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AlertProvider } from '@/template';
import { ProjectProvider } from '@/contexts/ProjectContext';

export default function RootLayout() {
  return (
    <AlertProvider>
      <SafeAreaProvider>
        <ProjectProvider>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#0a0e1a' },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="configure" options={{ headerShown: true, title: 'Configure Video', headerStyle: { backgroundColor: '#1a1f2e' }, headerTintColor: '#d4af37' }} />
            <Stack.Screen name="export-success" options={{ headerShown: false }} />
          </Stack>
        </ProjectProvider>
      </SafeAreaProvider>
    </AlertProvider>
  );
}
