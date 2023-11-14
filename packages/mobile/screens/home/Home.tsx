import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackScreens} from '../../App';
import {StatusBar} from 'expo-status-bar';
import {useCallback} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useAuth } from '../../contexts/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home({navigation}: NativeStackScreenProps<StackScreens, 'Home'>) {
  
  const { username, token, removeUserData } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      `You successfully logged out of username: ${username}`,
      [
        {
          text: "OK",
          onPress: async () => {
            await removeUserData();
            navigation.replace('Home');
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleLoginPress = useCallback(() => navigation.navigate('Login'), [navigation?.navigate]);
  const handleRegisterPress = useCallback(() => navigation.navigate('Register'), [navigation?.navigate]);
  const handleWebviewPress = useCallback(() => navigation.navigate('App'), [navigation?.navigate]);

  return (
    <View style={[tw`flex-1 bg-gray-700 justify-center items-center px-4`]}>
      <Text style={[tw`text-white text-4xl mb-8 text-center`]}>Atllas Inc. React Native Take Home Assessment - Carlos Banks</Text>
      <View style={[tw`flex-row justify-around w-full px-4 mb-6`]}>
        <TouchableOpacity
          style={[tw`bg-white border border-green-500 rounded-full px-6 py-2 w-1/2 mr-2`]}
          onPress={handleRegisterPress}
        >
          <Text style={[tw`text-black text-center text-lg`]}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[tw`bg-green-500 rounded-full px-6 py-2 w-1/2 ml-2`]}
          onPress={handleLoginPress}
        >
          <Text style={[tw`text-white text-center text-lg`]}>Login</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[tw`bg-red-500 rounded-full px-6 py-2 w-11/12 self-center`]}
        onPress={handleWebviewPress}
      >
        <Text style={[tw`text-white text-center text-lg`]}>Skip to Webview</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
      {token && (
        <View style={[tw`absolute bottom-0 inset-x-0 pb-5 items-center`]}>
          <TouchableOpacity
            style={[tw`bg-gray-400 py-2 px-4 rounded-full flex-row items-center justify-center`]}
            onPress={handleLogout}
          >
            <Text style={[tw`text-black text-center`]}>{'Log Out   '}</Text>
            <Icon name="sign-out" size={16} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}