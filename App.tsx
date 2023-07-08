import {  Button, Text, TextInput, View } from 'react-native';
import {styles} from './styles'
import { MMKV, useMMKVString } from 'react-native-mmkv';
import { useEffect, useState } from 'react';

const storage = new MMKV({ id: 'myapp' }) 

type User = {
  name: string;
  email: string;
}

export default function App() {
  const [name, setName] = useMMKVString('user.name') 
  const [email, setEmail] = useMMKVString('user.email')
  const [user, setUser] = useState<User>()

  function handleSave (){
    storage.set('user', JSON.stringify({name, email})) 
   
  }

  function fetchUser(){
    const data = storage.getString('user');
    setUser(data ? JSON.parse(data) : {})
  }

  useEffect(() => {
      const listener = storage.addOnValueChangedListener((changedKey) => {
      const newValue = storage.getString(changedKey);

      console.log('NOVO VALOR =>', newValue)
      
    })

      return () => listener.remove();
  }, [])

  return (
    <View style={styles.container}>
      <TextInput 
      placeholder="Nome..." 
      style={styles.input} 
      onChangeText={setName}
      value={name}
      />
      <TextInput 
      placeholder="Email..." 
      style={styles.input} 
      onChangeText={setEmail}
      value={email}
      />
      <Button title='Salvar' onPress={handleSave} />
      <Text style={styles.text}>
        {name} - {email}
      </Text>
    </View>
  );
}


