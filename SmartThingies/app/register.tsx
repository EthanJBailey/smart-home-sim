import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      Alert.alert('Missing Fields', 'Please fill out all fields.');
      return;
    }

    try {
      const response = await fetch('http://146.190.130.85:8000/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: fullName,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
      }

      const data = await response.json();
      console.log('Success:', data);

      await AsyncStorage.setItem('isLoggedIn', 'true');
      router.replace('/setup-new-home'); // ⬅️ Go to setup-new-home immediately after register
    } catch (error: any) {
      console.error('Error:', error.message);
      Alert.alert('Registration Error', error.message);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Create your new profile below</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="First and Last Name"
          placeholderTextColor="#999"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={[styles.label, { marginTop: 12 }]}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="johndoe@example.com"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={[styles.label, { marginTop: 12 }]}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleRegister}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211D1D',
    padding: 24,
    justifyContent: 'center',
  },
  wifi: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 24,
    color: '#AAA',
    fontSize: 12,
  },
  title: {
    fontSize: 22,
    color: '#FFB267',
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#DDD',
    marginBottom: 24,
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#1A1616',
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
  },
  label: {
    color: '#FFB267',
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 14,
  },
  signupButton: {
    backgroundColor: '#FFB267',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#211D1D',
    fontSize: 16,
    fontWeight: '600',
  },
});
