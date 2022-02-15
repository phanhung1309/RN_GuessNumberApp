import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import colors from '../styles/colors';

const NumberContainer: React.FC = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

export default NumberContainer;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 34,
    marginVertical: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    color: colors.primary,
    fontSize: 24,
  },
});
