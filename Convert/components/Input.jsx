import * as React from "react";
import { useState } from "react";
import { Input, Button } from "react-native-elements";
import { View, Text, StyleSheet } from "react-native";

const InputText = () => {
  const inputString = 60;
  const REGEX = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
  const [url, setUrl] = useState();
const [validator, setValidator] = useState(true)
  const [error, setError] = useState();

  //  const validate = () =>{
  //     const errors ={}
  //   if (state.inputText === "") {
  //   errors.noInputError = "Field required"

  //     } else if (state.inputText > inputString) {

  //     // return (<Text>Link too long</Text>)
  //   }
  //   setstate({errorMsg:errors})
  //  }
  const validate = (text) => {
    let noValErr = "Field required!";
    let longInputErr = "Link too long";
    let urlErr="This URL is not from YouTube"
    if (text === "") {
        setValidator(true)
      setError(noValErr);
      // console.warn('Field required!')
    } else if (text.length > inputString) {
     setValidator(true)
      setError(longInputErr);
    } else if(!REGEX.test(text)){
setValidator(true)
setError(urlErr)
    }
    else {
      setValidator(false)
      setError();
    }
  };
  return (
    <View>
      {/* <Tooltip popover={<Text>Info here</Text>}>
            <Text>Press me</Text> */}
      {/* </Tooltip> */}

      <Input
        //   defaultValue=""
        //   onFocus={validate}
        
        label="Enter youtube URL"
        placeholder="Ex:https//:youtube.com/xxx-xxx"
        maxLength={100}
        // errorProps={state.errorMsg}
        errorMessage={error}
        errorStyle={{ color: "red", fontSize: 15 }}
        inputContainerStyle={
          styles.inputStyle,
          validator ? styles.error : null
        }
        // renderErrorMessage={state.ifError}
        onChangeText={(text) => {
          validate(text);
          setUrl(text);
        }}
      />
      {/* <Button title="hey"/> */}
      <Button
      type="outline"
      disabled={validator}
        title="hey"
        // onPress={}
      />
      <Text>{url}</Text>
      <Text>{validator}</Text>
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
});
export default InputText;
