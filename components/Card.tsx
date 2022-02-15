import React from 'react';
import {View, StyleSheet} from 'react-native';

interface CardProps {
  style?: {};
}

const Card: React.FC<CardProps> = ({children, style}) => {
  return <View style={{...styles.card, ...style}}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
  },
});

export default Card;
