import React from 'react';

import Main from './components/Main';
import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';
const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <>
      <Main />
    </>
  );
};

export default App;
