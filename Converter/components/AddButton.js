import * as React from 'react';
import {useState, useEffect, useContext} from 'react';
import {Input, Button, Icon} from 'react-native-elements';
import {View, StyleSheet} from 'react-native';
import {GetFiles} from './getFiles';
import {State} from '../context/Context';

//usecontext to provide state from other component
const AddButton = ({visible}) => {
  console.log(visible);
  // input visibility handler
  // const state =  State
  // const {isVisible, setIsVisible} = useContext(State);
  const handleRender = () => {
    // setIsVisible(true);
    setIsVisible(true);
  };
  return (
    // <State.Provider>
    <Button
      icon={
        <Icon
          name="add"
          type="material"
          size={80}
          color={('black', visible ? 'grey' : null)}
        />
      }
      type="clear"
      disabled={visible}
      onPress={handleRender}
      disabledStyle={{
        height: 100,
        backgroundColor: '#e3e6e4',
        borderRadius: 50,
        width: 100,
        bottom: 0,
        alignSelf: 'center',
        textAlign: 'center',
      }}
      buttonStyle={styles.button}
    />
  );
};
const styles = StyleSheet.create({
  disabledButton: {
    backgroundColor: 'grey',
  },
  button: {
    height: 100,
    backgroundColor: '#4ecca3',
    borderRadius: 50,
    width: 100,
    // position:"absolute",
    bottom: 0,
    // bottom:deviceWidth,
    alignSelf: 'center',
    textAlign: 'center',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: 36,
  },
});
export default AddButton;
