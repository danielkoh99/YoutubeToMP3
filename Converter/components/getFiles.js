const RNFS = require('react-native-fs');
import {Alert} from 'react-native';
export const fileDownload = async (fileName) => {
  // alert(fileName);
  // await fileName;
  // const [state, setstate] = useState();
  // var path = RNFS.ExternalStorageDirectoryPath +"/Download" + '/dusk.mp4';
  // RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
  // .then((success) => {
  //     setstate(success)
  //   console.log('FILE WRITTEN!');
  // })
  // .catch((err) => {
  //   console.log(err.message);
  // });
  //   PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
  //   .then(success=>{
  // console.log('permission ok')
  //   }).catch(err=>{
  //   console.log(err)
  //   })
  // const granted =
  //   PermissionsAndroid.check(
  //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //   ) == true;

  // if(granted){
  //
  // dialog box to ask file name
  RNFS.downloadFile({
    fromUrl: 'http://192.168.0.14:19000/download',
    toFile: `${RNFS.ExternalStorageDirectoryPath}/Download/${fileName}.mp3`,
    progressInterval: 100,
    progressDivider: 10,
    background: true,
    // begin
  })
    .promise.then((file) => {
      // setstate(file)
      let fileSize = Math.pow(10, -6) * file.bytesWritten;
      let formattedSize = Math.round(fileSize * 10) / 10;
      Alert.alert(
        'Download',
        fileName + ' downloaded \n' + 'Size: ' + formattedSize + ' mb',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
      // open in music app
      // alert(fileName + ' downloaded \n' + 'Size: ' + formattedSize + ' mb');
    })
    .then(() => {
      fetch('http://192.168.0.14:19000/delete').then((res) => console.log(res));

      //  fetch('http://192.168.0.14:19000/delete').then((res) =>
      //   console.log(res),
      // )}
    });
};
