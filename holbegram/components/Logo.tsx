import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export const Logo: React.FC = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require('@/assets/images/holberton-logo.webp')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
  },
});
