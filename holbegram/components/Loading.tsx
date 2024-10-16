import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export const Loading: React.FC = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#007bff" />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    marginTop: 20,
  },
});
