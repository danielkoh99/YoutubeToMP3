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
import InputText from './Input';


const Main = () =>{
    return( 
        
        <View style={styles.container}>
           <StatusBar style="auto" />
           <InputText/>
        </View>
      
      
      )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#393e46',
  },
  // button: {
  //   height: 30,
  //   backgroundColor: "#4ecca3",
  //   borderRadius: 20,
  //   width: 50,
  //   alignSelf: "center",
  // },
});
export default Main