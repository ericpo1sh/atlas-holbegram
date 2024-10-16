import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

interface SignInButtonProps {
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
      <Text>Don't have an account? <Text style={styles.linkText}>Sign Up</Text></Text>
    </Pressable>
  );
};

export const SignIntoAccountLink: React.FC = () => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.replace('/login')}>
      <Text>Already have an account? <Text style={styles.linkText}>Sign In</Text></Text>
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


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DC3C30',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#DC3C30',
    marginTop: 20,
    cursor: 'pointer',
    fontFamily: 'Poppins'
  },
});
