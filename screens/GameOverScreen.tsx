import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import MainButton from '../components/MainButton';
import colors from '../styles/colors';

interface GameOverScreenProps {
  roundsNumber: number;
  userNumber: number | undefined;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({
  roundsNumber,
  userNumber,
  onRestart,
}) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>The Game is Over!</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/success.png')}
          // source={{
          //   uri: 'https://cdn.pixabay.com/photo/2019/01/22/18/30/summit-3948706_960_720.jpg',
          // }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{' '}
          rounds to guess the number{' '}
          <Text style={styles.highlight}>{userNumber}</Text>
        </Text>
      </View>
      <View style={styles.button}>
        <MainButton onPress={onRestart}>RESTART</MainButton>
      </View>
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  button: {
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  highlight: {
    color: colors.primary,
  },
  resultContainer: {
    width: '80%',
    alignItems: 'center',
  },
  resultText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
