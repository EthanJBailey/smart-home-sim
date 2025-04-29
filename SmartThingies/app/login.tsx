import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    try {
      const response = await axios.post('http://146.190.130.85:8000/login', { email, password });
      if (rememberMe) {
        await AsyncStorage.setItem('userEmail', email);
      }
      await AsyncStorage.setItem('isLoggedIn', 'true');
      router.replace('/(tabs)');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Login Failed', error.response?.data?.detail || 'An error occurred.');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.wifi}>Wifi: Resnet-5G</Text>

      <Text style={styles.title}>Welcome to SmartThingies</Text>
      <Text style={styles.subtitle}>Sign in or create your profile below</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={[styles.label, { marginTop: 12 }]}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.checkboxRow}>
          <TouchableOpacity
            style={[styles.checkboxBox, rememberMe && styles.checkboxChecked]}
            onPress={() => setRememberMe(!rememberMe)}
            activeOpacity={0.8}
          >
            {rememberMe && <View style={styles.checkboxTick} />}
          </TouchableOpacity>
          <Text style={styles.rememberText}>Remember me</Text>

          <TouchableOpacity style={{ marginLeft: 'auto' }}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupButton} onPress={() => router.push('/register')}>
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
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
  },
  checkboxBox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: '#FFB267',
    borderRadius: 4,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FFB267',
  },
  checkboxTick: {
    width: 10,
    height: 10,
    backgroundColor: '#211D1D',
    borderRadius: 2,
  },
  rememberText: {
    color: '#FFF',
    marginLeft: 8,
  },
  forgotText: {
    color: '#AAA',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#FFB267',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  loginText: {
    color: '#211D1D',
    fontSize: 16,
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: '#555',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
