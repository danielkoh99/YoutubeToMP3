import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  PermissionsAndroid,
  Button,
} from "react-native";


const requestFilePermissions = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      // PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "YoURL needs access to your files " +
          "so you can download awesome songs.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the files now");
    } else {
      console.log("Permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

const Permission = () => (
  <View style={styles.container}>
    <Text style={styles.item}> Try permissions </Text>
    <Button title="request permissions" onPress={requestFilePermissions} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 20,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Permission;
