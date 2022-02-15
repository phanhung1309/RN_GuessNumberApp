import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import colors from '../styles/colors';

interface Props {
  onPress: () => void;
}

const MainButton: React.FC<Props> = ({children, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
  },
});
