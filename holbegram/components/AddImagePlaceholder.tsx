import { StyleSheet, View, Image } from 'react-native';
import React from 'react';

interface AddImagePlaceholderProps {
  image: string | undefined;
}

export const AddImagePlaceholder: React.FC<AddImagePlaceholderProps> = ({ image }) => {
  return (
    <View style={styles.container}>
      <Image
        source={image ? { uri: image } : require('@/assets/images/upload-placeholder.png')}
        style={styles.placeholder}
        resizeMode="contain"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  placeholder: {
    width: 300,
    height: 300,
    borderRadius: 20,
    borderColor: '#1DD2AF',
    borderWidth: 1
  },
});
