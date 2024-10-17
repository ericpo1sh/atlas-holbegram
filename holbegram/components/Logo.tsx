import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export const Logo: React.FC = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require('@/assets/images/logo.png')}
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
    width: 200,
    height: 150,
  },
});
