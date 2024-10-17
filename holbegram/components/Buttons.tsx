import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";


interface SignInButtonProps {
  onPress: () => void;
}

interface addPhotoButtonProps {
  onPress: () => void;
}

export const SignInButton: React.FC<SignInButtonProps> = ({ onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Sign In</Text>
    </Pressable>
  );
};

export const CreateNewAccountLink: React.FC = () => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.replace('/register')}>
      <Text style={{ color: 'white' }}>Don't have an account? <Text style={styles.linkText}>Sign Up</Text></Text>
    </Pressable>
  );
};

export const SignIntoAccountLink: React.FC = () => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.replace('/login')}>
      <Text style={{ color: 'white' }}>Already have an account? <Text style={styles.linkText}>Sign In</Text></Text>
    </Pressable>
  );
};

export const SignUpButton: React.FC<SignInButtonProps> = ({ onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Create account</Text>
    </Pressable>
  );
};

export const AddPhotoButton: React.FC<addPhotoButtonProps> = ({ onPress }) => {
  return (
    <Pressable style={styles.addPhotoButton} onPress={onPress}>
      <View style={styles.addPhotoButtonContent}>
        <Ionicons name="images-outline" size={26} color="white" />
        <Text style={styles.buttonText}>Choose a photo</Text>
      </View>
    </Pressable>
  )
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1DD2AF',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
  addPhotoButton: {
    backgroundColor: '#1DD2AF',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
  addPhotoButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#1DD2AF',
    marginTop: 20,
    cursor: 'pointer',
    fontFamily: 'Poppins'
  },
});
