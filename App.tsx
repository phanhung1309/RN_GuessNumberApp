/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const App = () => {
  const [userNumber, setUserNumber] = useState<number | undefined>();
  const [guessRound, setGuessRound] = useState<number>(0);

  const configureNewGameHandler = () => {
    setGuessRound(0);
    setUserNumber(undefined);
  };

  const startGameHandler = (selectedNumber: number) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (numOfRounds: number) => {
    setGuessRound(numOfRounds);
  };

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {guessRound ? (
        <GameOverScreen
          onRestart={configureNewGameHandler}
          roundsNumber={guessRound}
          userNumber={userNumber}
        />
      ) : userNumber ? (
        <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
      ) : (
        <StartGameScreen onStartGame={startGameHandler} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default App;
