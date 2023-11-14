import React, { useState } from 'react';
import {View, TextInput, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackScreens} from '../../App';
import { useAuth } from '../../contexts/AuthContext';
import tw from 'tailwind-react-native-classnames';
import { TouchableOpacity } from 'react-native';

export default function Login({navigation}: NativeStackScreenProps<StackScreens, 'Login'>) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { saveUserData } = useAuth();

  const handleLogin = async () => {
    setError('');
    
    try {
      const response = await fetch(`http://10.0.0.120:50000/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        await saveUserData(data.data.token, username);
        navigation.navigate('App');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.log(error)
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <View style={[tw`flex-1 bg-gray-700 justify-center items-center px-4`]}>
      <Text style={[tw`text-white text-4xl mb-8 font-bold self-start w-11/12 ml-4`]}>Login</Text>
      <TextInput
        style={[tw`w-11/12 bg-white rounded p-3 mb-4 h-12`]}
        placeholder="Enter username"
        placeholderTextColor="#333"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[tw`w-11/12 bg-white rounded p-3 mb-8 h-12`]}
        placeholder="Enter password"
        placeholderTextColor="#333"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={[tw`w-11/12 bg-green-600 rounded-full p-2`]}
        onPress={handleLogin}
      >
        <Text style={[tw`text-center text-white text-lg`]}>Login</Text>
      </TouchableOpacity>
      {error ? <Text style={[tw`text-red-500 mt-4`]}>{error}</Text> : null}
    </View>
  );
}