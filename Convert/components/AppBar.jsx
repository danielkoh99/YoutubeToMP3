import * as React from "react";
import { Header } from "react-native-elements";
// import MaterialIcons from '../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';
// import MaterialIcons from '../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';
// import {Font} from 'expo';
// import { useEffect } from 'react';
const AppBar = () => {
  // useEffect(() => {
  //    Font.loadAsync({
  //     'Material Icons': require('@expo/vector-icons/MaterialIcons.js')
  //   })
  // }, [])

  return (
    <Header
      placement="left"
      leftComponent={{ icon: "menu", color: "#fff" }}
      centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
      rightComponent={{ icon: "home", color: "#fff" }}
    />
  );
};

export default AppBar;

// export default class AppBar extends React.Component {
//   state = {
//     fontLoaded: false,
//   };

//   async componentWillMount() {
//     try {
//       await Font.loadAsync({
//         'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf')
//       })

//       this.setState({fontLoaded: true});
//     } catch (error) {
//       console.log('error loading icon fonts', error);
//     }
//   }
// }
