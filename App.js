import React, { createContext, useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ChatView from './view/ChatView';
import LoginView from './view/LoginView';
import RegisterView from './view/RegisterView';
import HomeView from './view/HomeView'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/Firebase';
import { ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator()
const AuthenticatedUserContext = createContext()
const AuthenticatedUserProvider = ({children}) => {
  const [user, setUser] = useState(null)
  return (
    <AuthenticatedUserContext.Provider value={{user, setUser}}>
      {children}
    </AuthenticatedUserContext.Provider>
  )
}
function ChatStack() {
  return (
    <Stack.Navigator defaultScreenOptions={HomeView}>
      <Stack.Screen name="Home" component={HomeView}/>
      <Stack.Screen name="Chat" component={ChatView}/>
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator defaultScreenOptions={LoginView} screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginView}/>
      <Stack.Screen name="Register" component={RegisterView }/>
    </Stack.Navigator>
  )
}

function RootNavigator() {
  const {user, setUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setLoading(false)
      });
      return () => unsubscribe()
  }, [user]);
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }
  return (
    <NavigationContainer>
      {user ? <ChatStack/> : <AuthStack/>}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator/>
    </AuthenticatedUserProvider>
  )
}