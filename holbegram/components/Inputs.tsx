import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

interface EmailInputProps {
  email: string;
  setEmail: (email: string) => void;
}

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
}

export const EmailInput: React.FC<EmailInputProps> = ({ email, setEmail }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#FFFFFF"
      />
    </View>
  );
};

export const PasswordInput: React.FC<PasswordInputProps> = ({ password, setPassword }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor="#FFFFFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#1DD2AF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#00003C',
    color: 'white'
  },
});
