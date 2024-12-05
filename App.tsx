import React from 'react';
import Router from './src/router/Router';
import { QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator, Text } from 'react-native';
import { useGenres } from './src/hooks/useGenres';
import { queryClient } from './src/services/queryClient';

const AppContent = () => {
  const { data, isLoading, error } = useGenres();

  if (error) {
    return <Text>Ocorreu um erro no useGenresHook</Text>;
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return <Router />;
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
