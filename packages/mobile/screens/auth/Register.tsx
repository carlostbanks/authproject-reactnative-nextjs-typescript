import React, { useState } from 'react';
import {View, TextInput, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackScreens} from '../../App';
import tw from 'tailwind-react-native-classnames';
import { TouchableOpacity } from 'react-native';

export default function Register({navigation}: NativeStackScreenProps<StackScreens, 'Register'>) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');
    
    try {
      const response = await fetch(`http://10.0.0.120:50000/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        navigation.navigate('Login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      console.log(error)
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <View style={[tw`flex-1 bg-gray-700 justify-center items-center px-4`]}>
      <Text style={[tw`text-white text-4xl mb-8 font-bold self-start w-11/12 ml-4`]}>Sign up</Text>
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
        onPress={handleRegister}
      >
        <Text style={[tw`text-center text-white text-lg`]}>Sign up</Text>
      </TouchableOpacity>
      {error ? <Text style={[tw`text-red-500 mt-4`]}>{error}</Text> : null}
    </View>
  );
}