import { Alert, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../config/Firebase'
import { SafeAreaView } from 'react-native-safe-area-context';

const backImage = require("../assets/backImage.png");

export default function LoginView({navigation}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (email !== "" && password !== ""){
            auth
            .signInWithEmailAndPassword(email, password)
            .then(() => console.log("Login succeeded"))
            .catch(err => Alert.alert(err.message));
        }
    }

    return (
        <View style={styles.container}>
            <Image source={backImage} style={styles.backImage}/>
            <View style={styles.whiteSheet}/>
            <SafeAreaView style={styles.form}>
              <Text style={styles.title}>Login</Text>
              <TextInput 
                style={styles.input}
                placeholder='Enter email'
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                autoFocus={true}
                value={email}
                onChangeText={(text) => setEmail(text)}/>
              <TextInput 
                style={styles.input}
                placeholder='Enter password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                textContentType='password'
                value={password}
                onChangeText={(text) => setPassword(text)}/>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={{fontWeight: 'bold', color:'#fff', fontSize: 18}}>Log in</Text>
            </TouchableOpacity>

            <View
            style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
              <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Dont have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={{color: 'orange', fontWeight: '600', fontSize: 14}}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: "orange",
      alignSelf: "center",
      paddingBottom: 24,
    },
    input: {
      backgroundColor: "#F6F7FB",
      height: 58,
      marginBottom: 20,
      fontSize: 16,
      borderRadius: 10,
      padding: 12,
    },
    backImage: {
      width: "100%",
      height: 340,
      position: "absolute",
      top: 0,
      resizeMode: 'cover',
    },
    whiteSheet: {
      width: '100%',
      height: '75%',
      position: "absolute",
      bottom: 0,
      backgroundColor: '#fff',
      borderTopLeftRadius: 60,
    },
    form: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 30,
    },
    button: {
      backgroundColor: '#f57c00',
      height: 58,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
  });