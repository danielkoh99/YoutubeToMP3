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
import DeviceInfo from 'react-native-device-info';
// import getUniqueId from 'react-native-device-info';
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
import {fileDownload} from './getFiles';
let uniqueId = DeviceInfo.getUniqueId();
// let name = DeviceInfo.getFreeDiskStorage();
console.log(uniqueId);
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
  const [url, setUrl] = useState();
  const [validator, setValidator] = useState(true);
  const [error, setError] = useState();
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [responseData, setResponseData] = useState({
    filename: '',
    downloadUrl: '',
  });
  const [fileName, setfileName] = useState(responseData.filename);
  const [isVisible, setIsVisible] = useState(false);
  const [isloading, setisloading] = useState(false);
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
    setIsDownloaded(false);
  };
  // states

  // const [disablebutton, setdisablebutton] = useState(true);
  // if (fileName != '') {
  //   setdisablebutton(false);
  // }
  // let durl = `http://192.168.0.14:19000/download-file?id=${uniqueId}`;
  const submitFileName = () => {
    fileDownload(responseData.downloadUrl, responseData.filename)
      .then(() => {
        wait(2000).then(setIsDownloaded(false));
      })
      .then(setIsVisible(false));
  };
  // if (fileName != '') {
  //   fileDownload(fileName)
  //     .then(() => {
  //       wait(2000).then(setIsDownloaded(false));
  //     })
  //     .then(setIsVisible(false));
  // }

  // post data to backend
  const postURLAndDownload = () => {
    // fetch('http://192.168.0.14:19000/download', {
    fetch('https://converter.loca.lt/download', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Bypass-Tunnel-Reminder': 'true',
      },
      body: JSON.stringify({url: url, deviceID: uniqueId}),
    })
      .then(
        (response) => response.json(),
        setisloading(true),
        setValidator(true),
        // response.json()
        // if (JSON.stringify(response.status) === 500) {
        //   alert('Internal server error');
        // }

        //get resp url, must share with getFiles component
        // console.log(response.json());
        // if (response.status === '200') {
        //   setIsDownloaded(true);
        // }
        // setIsDownloaded(true);
        // response.json()

        // setIsVisible(false);
      )
      .then((result) => {
        setResponseData({
          filename: result.originalName,
          downloadUrl: result.downloadUrl,
        }),
          setfileName(result.originalName);
        setTimeout(() => {
          setisloading(false);
        }, 3000);
      })

      .then(() => {
        setIsDownloaded(true);
        // wait(2000).then(() => {
        //   setIsDownloaded(true);
        //   // setIsVisible(false);
        // });
      })
      .catch((err) => alert(err));
  };

  // validate text input
  const validate = (text) => {
    const inputString = 90;
    const REGEX = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    let noValErr = 'Field required!';
    let longInputErr = 'Link too long';
    let shortInputErr = 'Link too short';
    let urlErr = 'This URL is not from YouTube';
    if (text === '') {
      setValidator(true);
      setError(noValErr);
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
                <Card style={styles.card}>
                  <Text>Please give a name to the song</Text>
                  <Input
                    disabled
                    value={fileName}
                    // onChangeText={(text) => {
                    //   setfileName(text);
                    // }}
                  />

                  <Button
                    onPress={submitFileName}
                    title="Submit"
                    color="primary"
                    // disabled={disablebutton}
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
                  loading={isloading}
                />
              </>
            )}
          </FadeInView>
        ) : (
          <FadeInView>
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
          </FadeInView>
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
