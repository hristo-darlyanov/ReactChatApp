import React, { createContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ChatView from './view/ChatView';
import LoginView from './view/LoginView';
import RegisterView from './view/RegisterView';
import HomeView from './view/HomeView'

const Stack = createNativeStackNavigator()
const AuthenticatedUserContext = createContext()

function ChatStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Register" component={RegisterView}/>
      {/* <Stack.Screen name="Chat" component={ChatView}/> */}
    </Stack.Navigator>
  );
}

function RootNavigator() {
  return (
    <NavigationContainer>
      <ChatStack/>
    </NavigationContainer>
  );
}

export default function App() {
  return <RootNavigator/>
}