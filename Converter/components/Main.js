import React, {useEffect} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    PermissionsAndroid,
  } from 'react-native';
// import { Button } from 'react-native-elements';
import InputText from './Input';



const Main = () =>{

  // const requestFilePermissions = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.requestMultiple(
  //       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       {
  //         title: "YoURL permissions",
  //         message:
  //           "YoURL needs access to your files " +
  //           "so you can download awesome songs.",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK",
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log("You can use the files now");
  //     } else {
  //       console.log("Permission denied");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };
  




  // useEffect(() => {
  //   requestFilePermissions()
  // }, [])
    return( 
        
        <View style={styles.container}>
           <StatusBar backgroundColor="black" barStyle="light-content" />
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