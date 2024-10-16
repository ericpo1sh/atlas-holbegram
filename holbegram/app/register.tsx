import React, { useState } from 'react';
import { View, Text, Pressable } from "react-native";

import { Loading } from '@/components/Loading';
import { SignIntoAccountLink, SignUpButton } from '@/components/Buttons';
import { Logo } from '@/components/Logo';
import { EmailInput, PasswordInput, NameInput } from '@/components/Inputs';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'expo-router';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('')
  const auth = useAuth();
  const router = useRouter();

  async function login() {
    try {
      auth.register(email, password)
      router.replace("/(tabs)/")
    } catch (err) {
      alert("Unable to create account")
    }
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Logo/>
      <Text style={{  fontSize: 28, textAlign: 'center', fontFamily: 'Poppins' }}>Register</Text>
      <EmailInput email={email} setEmail={setEmail}/>
      <NameInput name={name} setName={setName}/>
      <PasswordInput password={password} setPassword={setPassword}/>
      <SignUpButton onPress={login}/>
      <SignIntoAccountLink/>
      {loading && <Loading/>}
    </View>
  )
}
