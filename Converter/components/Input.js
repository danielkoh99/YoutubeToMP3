import * as React from 'react';
import {useState, useEffect} from 'react';
import {Input, Button, Icon, Card} from 'react-native-elements';
// import { Icon } from 'react-native-vector-icons'
// import {
//   Animated,
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
// } from 'react-native-reanimated';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Dimensions,
  TouchableOpacityBase,
  ActivityIndicator,
} from 'react-native';
import FadeInView from './Animation';
import GetFiles, {fileDownload} from './getFiles';
// import {State} from '../context/Context';
// import fileDownload from './getFiles';
// import {downloadFile} from 'react-native-fs';
// import AddButton from './AddButton';
// import requestFilePermission from "./getPermission";
// import Permission from "./getPermission";
const deviceHeight = Dimensions.get('window').height;
async function requestFilePermissions() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    const grantedReq = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the files now');
    } else {
      console.log('Permission denied');
    }
    if (grantedReq === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the files now');
    } else {
      console.log('Permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}
// const input = React.createRef();
const InputText = () => {
  // const animation = useSharedValue(0);
  // const animatedStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {translateX: withTiming(translateX.value)},
  //       {translateY: translateY.value},
  //     ],
  //   };
  // });

  function wait(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

  const handleRender = () => {
    setIsVisible(true);
  };
  // states
  const [url, setUrl] = useState();
  const [validator, setValidator] = useState(true);
  const [error, setError] = useState();
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [fileName, setfileName] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const submitFileName = () => {
    if (fileName != '') {
      fileDownload(fileName)
        .then(() => {
          wait(2000).then(setIsDownloaded(false));
        })
        .then(setIsVisible(false));
    }
  };
  // post data to backend
  const postURLAndDownload = () => {
    fetch('http://192.168.0.14:19000/download', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({url: url}),
    })
      .then((response) => {
        if (JSON.stringify(response.status) === 500) {
          alert('Internal server error');
        }

        // if (response.status === '200') {
        //   setIsDownloaded(true);
        // }
        // setIsDownloaded(true);
        // response.json()

        // setIsVisible(false);
      })
      .then(() => {
        wait(2000)
          .then(() => {
            setIsDownloaded(true);
            // setIsVisible(false);
          })
          .then(wait(3000).then(submitFileName()));
        // .then(() => {
        //   if (isDownloaded === false) {
        //     fetch('http://192.168.0.14:19000/delete').then((res) =>
        //       console.log(res),
        //     );
        //   }
        //   //  fetch('http://192.168.0.14:19000/delete').then((res) =>
        //   //   console.log(res),
        //   // )}
        // });
      })
      .catch((err) => alert(err));
  };

  // validate text input
  const validate = (text) => {
    const inputString = 90;
    const REGEX = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    // const REGEX = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    let noValErr = 'Field required!';
    let longInputErr = 'Link too long';
    let shortInputErr = 'Link too short';
    let urlErr = 'This URL is not from YouTube';
    if (text === '') {
      setValidator(true);
      setError(noValErr);
      // console.warn('Field required!')
    } else if (text.length > inputString) {
      setValidator(true);
      setError(longInputErr);
    } else if (!REGEX.test(text)) {
      setValidator(true);
      setError(urlErr);
    } else if (text === 'https://www.youtube.com/' || text.length < 15) {
      setValidator(true);
      setError(shortInputErr);
    } else {
      setValidator(false);
      setError();
    }
  };

  useEffect(() => {
    requestFilePermissions();
  }, []);

  return (
    // <State.Provider value={{isVisible, setIsVisible}}>
    <>
      <View style={styles.container}>
        {/* conditional rendering of the input field */}
        {isVisible ? (
          <FadeInView>
            {isDownloaded ? (
              // <Animated.View style={animatedStyle}>
              <>
                <ActivityIndicator animating={true} size="large" />
                <Card style={styles.card}>
                  <Input
                    onChangeText={(text) => {
                      setfileName(text);
                    }}
                  />

                  <Button
                    onPress={submitFileName}
                    title="Submit"
                    color="primary"
                  />
                </Card>
              </>
            ) : (
              // </Animated.View>
              <>
                <Input
                  renderErrorMessage={validator}
                  label="Enter youtube URL"
                  placeholder="Ex:https//:youtube.com/xxx-xxx"
                  maxLength={100}
                  errorMessage={error}
                  errorStyle={{color: 'red', fontSize: 15}}
                  inputContainerStyle={
                    (styles.inputStyle, validator ? styles.error : null)
                  }
                  onChangeText={(text) => {
                    validate(text);
                    setUrl(text);
                  }}
                  // ref={input}
                />
                <Button
                  buttonStyle={styles.downloadBtn}
                  type="clear"
                  disabled={validator}
                  title="Download"
                  titleStyle={{color: 'black', fontSize: 20}}
                  onPress={postURLAndDownload}

                  // loading={true}
                />
              </>
            )}
          </FadeInView>
        ) : (
          <>
            <Text style={styles.text}>Click the button to add a link</Text>
            <View style={styles.bottom}>
              {/* <TouchableOpacityBase> */}
              <Button
                icon={
                  <Icon
                    name="add"
                    type="material"
                    size={80}
                    color={('black', isVisible ? 'grey' : null)}
                  />
                }
                type="clear"
                disabled={isVisible}
                onPress={handleRender}
                disabledStyle={styles.disabledMainBtn}
                buttonStyle={styles.button}
              />
              {/* </TouchableOpacityBase> */}
            </View>
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    borderColor: 'red',
  },
  inputStyle: {
    borderBottomColor: 'grey',
  },
  text: {
    alignSelf: 'center',
    fontStyle: 'italic',
    fontSize: 20,
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    backgroundColor: '#303F7F',
    // bottom:0,
    height: deviceHeight * 0.95,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  disabledButton: {
    backgroundColor: 'grey',
  },
  button: {
    height: 100,
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    width: 100,
    // position:"absolute",
    bottom: 0,
    // bottom:deviceWidth,
    alignSelf: 'center',
    textAlign: 'center',
  },
  disabledMainBtn: {
    height: 100,
    backgroundColor: '#e3e6e4',
    borderRadius: 50,
    width: 100,
    bottom: 0,
    alignSelf: 'center',
    textAlign: 'center',
  },
  downloadBtn: {
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#4CAF50',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: 36,
  },
  card: {
    zIndex: 999,
  },
});
export default InputText;
