import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import { useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'
import Colors from '../Colors'
import { AntDesign } from '@expo/vector-icons'
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore'
import { auth, database } from '../config/Firebase'

export default function ChatView() {
  const [messages, setMessages] = React.useState([]);
  const navigation = useNavigation();
  const onSignOut = () => {
    signOut(auth).catch(error => console.log(error));
  }

  useLayoutEffect(() => {
    navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity 
        style={{marginRight:10}}
        onPress={() => onSignOut()}
      >
        <AntDesign name='logout' size={24} color={Colors.grey} style={{marginRight:10}}/>
      </TouchableOpacity>  
    )
  })}, [navigation])

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      console.log('querySnapshot unsusbscribe');
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      );
    });
    return unsubscribe;
  }, []);
  
  const onSend = useCallback((messages = []) => {
    setMessages(previousChanges => GiftedChat.append(previousChanges, messages))

    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user
    })
  })

  return (
    <GiftedChat 
    messages={messages}
    onSend={messages => onSend(messages)}
    user={{
      _id: auth?.currentUser?.email,
      avatar: 'https://i.pravatar.cc/300'}}
    messageContainerStyle={{backgroundColor: 'white'}}
    />
  )
}

const styles = StyleSheet.create({})