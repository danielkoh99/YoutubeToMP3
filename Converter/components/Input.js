import * as React from "react";
import { useState} from "react";
import { Input, Button ,Icon} from "react-native-elements";
// import { Icon } from 'react-native-vector-icons'
import {  View, Text, StyleSheet } from "react-native";
import FadeInView from "./Animation";
import Permission from "./getPermission";
// import Permission from "./getPermission";



const InputText = () => {
  // const downloadFile = async (url) =>{ 
  //   let path = url.split('/');
  //   const file_name = path[path.length-1];
  //    FileSystem.downloadAsync(
  //     url,
  //     FileSystem.documentDirectory + file_name
  //   )
  //     .then(({ uri }) => {
  //       console.log('Finished downloading to ', uri);
  //       MediaLibrary.createAssetAsync(uri).then(asset => {
  //         console.log('asset', asset);
  //       MediaLibrary.createAlbumAsync('myfolder', asset)
  //         .then(() => {
  //           showMessage({
  //             message: t('general.success'),
  //               description: t('download.success'),
  //             type: 'success'
  //           });
  //         })
  //         .catch(error => {
  //           showMessage({
  //             message: t('general.success'),
  //               description: t('download.failed'),
  //             type: 'danger'
  //           });
  //         });
  //       });
        
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }

  
  // states
  const [url, setUrl] = useState();
  const [validator, setValidator] = useState(true);
  const [error, setError] = useState();
  const [isVisible, setIsVisible] = useState(false);

 
  // input visibility handler
  const handleRender = () => {
    setIsVisible(true);
  };

  // post data to backend
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
        alert(JSON.stringify(response.status))
        // response.json()
        setUrl('')
       setIsVisible(false)
      })
      .catch((err) => alert(err));
  };

  // validate text input
  const validate = (text) => {
    const inputString = 90;
    const REGEX = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;  
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

  return (
    <View style={styles.container}>
      {/* conditional rendering of the input field */}
      {isVisible ? (
        <FadeInView>
          <Input
            renderErrorMessage={validator}
            label="Enter youtube URL"
            placeholder="Ex:https//:youtube.com/xxx-xxx"
            maxLength={100}
            errorMessage={error}
            errorStyle={{ color: "red", fontSize: 15 }}
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
    <Permission/>
        <Button
          icon={
            <Icon
              name="add"
              type="material"
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
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#393e46",
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    marginBottom: 36,
  },
});
export default InputText;
