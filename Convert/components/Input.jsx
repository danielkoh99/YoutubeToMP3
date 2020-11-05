import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Input, Button, Icon } from "react-native-elements";
import { Animated, View, Text, StyleSheet, Dimensions } from "react-native";

var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;
const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 2000,
    }).start();
  }, [fadeAnim]);

  // const fadeOut = () => {
  //   Animated.timing(
  //     // Animate over time
  //     fadeAnim, // The animated value to drive
  //     {
  //       useNativeDriver: true,
  //       toValue: 0, // Animate to opacity: 1 (opaque)
  //       duration: 2000, // 2000ms
  //     }
  //   ).start();
  // };
  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};
const InputText = () => {
  const inputString = 90;
  const REGEX = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
  const [url, setUrl] = useState();
  const [validator, setValidator] = useState(true);
  const [error, setError] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const handleRender = () => {
    setIsVisible(true);
  };

  const postURL = () => {
    fetch("http://192.168.0.14:19000/download", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"url":url}),
    })
      .then((response) => {
        alert(response)
        setUrl('')
       setIsVisible(false)
      })
      .catch((err) => alert(err));
  };
  const validate = (text) => {
    let noValErr = "Field required!";
    let longInputErr = "Link too long";
    let shortInputErr = "Link too short";
    let urlErr = "This URL is not from YouTube";
    if (text === "") {
      setValidator(true);
      setError(noValErr);
      // console.warn('Field required!')
    } else if (text.length > inputString) {
      setValidator(true);
      setError(longInputErr);
    } else if (!REGEX.test(text)) {
      setValidator(true);
      setError(urlErr);
    } else if (text === "https://www.youtube.com/" || text.length < 15) {
      setValidator(true);
      setError(shortInputErr);
    } else {
      setValidator(false);
      setError();
    }
  };

  // React.useEffect(() => {
  //   Animated.timing(          // Animate over time
  //    fadeAnim,    // The animated value to drive
  //     {
  //       useNativeDriver:true,
  //       toValue: 1,           // Animate to opacity: 1 (opaque)
  //       duration: 10000,       // 4000ms
  //     }
  //   ).start();
  // }, [fadeAnim])

  //
  return (
    <View style={styles.container}>
      {/* <React.Fragment> */}
      {isVisible ? (
        <FadeInView>
          <Input
          // defaultValue=null
            label="Enter youtube URL"
            placeholder="Ex:https//:youtube.com/xxx-xxx"
            maxLength={100}
            errorMessage={error}
            errorStyle={{ color: "red", fontSize: 15 }}
            // style={}
            // inputStyle={ }
            inputContainerStyle={
              (styles.inputStyle, validator ? styles.error : null)
            }
            onChangeText={(text) => {
              validate(text);
              setUrl(text);
            }}
          />
          <Button
            type="outline"
            disabled={validator}
            title="Download"
            onPress={postURL}
            // loading={true}
          />
        </FadeInView>
      ) : (
        <Text style={{ alignSelf: "center" }}>
          Click the button to add a link
        </Text>
      )}

      <View style={styles.bottom}>
        <Button
          icon={
            <Icon
              name="add"
              size={80}
              color={("black", isVisible ? "grey" : null)}
            />
          }
          type="clear"
          disabled={isVisible}
          onPress={handleRender}
          disabledStyle={{
            height: 100,
            backgroundColor: "#e3e6e4",
            borderRadius: 50,
            width: 100,
            bottom: 0,
            alignSelf: "center",
            textAlign: "center",
          }}
          buttonStyle={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    borderColor: "red",
  },
  inputStyle: {
    borderBottomColor: "grey",
  },
  disabledButton: {
    backgroundColor: "grey",
  },
  button: {
    height: 100,
    backgroundColor: "#4ecca3",
    borderRadius: 50,
    width: 100,
    // position:"absolute",
    bottom: 0,
    // bottom:deviceWidth,
    alignSelf: "center",
    textAlign: "center",
  },
  container: {
    // height: deviceHeight,
    // width: deviceWidth,
    flex: 1,
    // flexDirection: 'column',
    justifyContent: "center",
    backgroundColor: "#393e46",
    // alignItems: 'center',
    // backgroundColor: "yellow",
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    marginBottom: 36,

    // backgroundColor: 'blue',
  },
});
export default InputText;
