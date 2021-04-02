const RNFS = require('react-native-fs');
import {Alert} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const fileDownload = async (downloadUrl, originalFileName) => {
  let uniqueId = DeviceInfo.getUniqueId();
  console.log(downloadUrl, originalFileName);
  // let name = DeviceInfo.getFreeDiskStorage();
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
  // fetch(`http://192.168.0.14:19000/download-file?id=${uniqueId}`)
  //   .then((res) => console.log(res))
  //   .then(
  // let url = 'http://192.168.0.14:19000/download-file?id=' + uniqueId;
  // fetch('http://192.168.0.14:19000/download-file?id=' + uniqueId)
  // fetch('http://192.168.0.14:19000/download');
  //   .then((res) => console.log(res))
  //   .then((data) => alert(data))
  //   .catch((err) => alert(err));
  const getStorageInfo = RNFS.getFSInfo().then((info) => console.log(info));
  console.log(getStorageInfo);
  RNFS.downloadFile({
    // fromUrl: 'http://192.168.0.14:19000/download',
    // fromUrl: url,
    fromUrl: downloadUrl,
    toFile: `${RNFS.ExternalStorageDirectoryPath}/Download/${originalFileName}.mp3`,
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
        originalFileName + ' downloaded \n' + 'Size: ' + formattedSize + ' mb',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );

      // open in music app
      // alert(fileName + ' downloaded \n' + 'Size: ' + formattedSize + ' mb');
    })
    .then(() => {
      setTimeout(() => {
        // fetch(`http://192.168.0.14:19000/delete?id=${uniqueId}`);
        fetch(`https://converter.loca.lt/delete?id=${uniqueId}`, {
          headers: {'Bypass-Tunnel-Reminder': 'true'},
        });
        // console.log(res),
      }, 2000);

      //  fetch('http://192.168.0.14:19000/delete').then((res) =>
      //   console.log(res),
      // )}
    })
    .catch((err) => console.log(err));
  // )
};
