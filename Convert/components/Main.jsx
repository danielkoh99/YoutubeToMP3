// import { s } from 'expo';
import { Button } from 'react-native-elements';
import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
  } from 'react-native';

import AppBar from './AppBar';


const Main = () =>{
    // const [text, setText] = React.useState('');

    const [currentTime, setCurrentTime] = useState(0);
    useEffect(() => {
      fetch('http://192.168.0.14:19000/time')
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          setCurrentTime(data.time);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
    return( 
        
        <ScrollView>
            <AppBar/>
            <Text>{currentTime}</Text>
            <Button title="hey"/>
        </ScrollView>
      
      
      )
}
const styles = StyleSheet.create({});
export default Main