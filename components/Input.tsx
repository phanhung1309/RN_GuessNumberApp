import React from 'react';
import {TextInput, TextInputProps, StyleSheet} from 'react-native';

interface InputProps extends TextInputProps {
  style?: {};
}

const Input: React.FC<InputProps> = props => {
  return <TextInput {...props} style={{...styles.input, ...props.style}} />;
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default Input;
