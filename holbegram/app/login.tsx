import React, { useState } from 'react';
import { View, Text, Pressable } from "react-native";
import { useRouter } from 'expo-router';

import { Loading } from '@/components/Loading';
import { CreateNewAccountLink, SignInButton } from '@/components/Buttons';
import { Logo } from '@/components/Logo';
import { EmailInput, PasswordInput } from '@/components/Inputs';
import { useAuth } from '@/components/AuthProvider';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter()

  async function login() {
    setLoading(true);
    try {
      await auth.login(email, password);
      router.replace('/(tabs)');
    } catch(err) {
      alert('Email or password is incorrect')
    }
    setLoading(false);
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#00003C' }}>
      <Logo/>
      <Text style={{  fontSize: 28, textAlign: 'center', fontFamily: 'Poppins', color: 'white'}}>Login</Text>
      <EmailInput email={email} setEmail={setEmail}/>
      <PasswordInput password={password} setPassword={setPassword}/>
      <SignInButton onPress={login}/>
      <CreateNewAccountLink/>
      {loading && <Loading/>}
    </View>
  )
}
