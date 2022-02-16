import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

interface GameScreenProps {
  userChoice: number;
  onGameOver: (numberOfRounds: number) => void;
}

const generateRandomBetweens = (
  min: number,
  max: number,
  exclude: number,
): any => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetweens(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen: React.FC<GameScreenProps> = ({userChoice, onGameOver}) => {
  const [currentGuess, setCurrentGuess] = useState(() =>
    generateRandomBetweens(1, 100, userChoice),
  );
  const [pastGuesses, setPastGuesses] = useState<number[]>([]);
  const currentLow = useRef<number>(1);
  const currentHigh = useRef<number>(100);

  const nextGuessHandler = (direction: 'lower' | 'greater') => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        {text: 'Sorry!', style: 'cancel'},
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetweens(
      currentLow.current,
      currentHigh.current,
      currentGuess,
    );
    setCurrentGuess(nextNumber);
    setPastGuesses(curPastGuesses => [currentGuess, ...curPastGuesses]);
  };

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, pastGuesses.length, userChoice, onGameOver, pastGuesses]);

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title={Dimensions.get('window').width < 350 ? '(-)' : 'LOWER (-)'}
            onPress={() => nextGuessHandler('lower')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title={Dimensions.get('window').width < 350 ? '(+)' : 'GREATER (+)'}
            onPress={() => nextGuessHandler('greater')}
          />
        </View>
      </Card>
      <View style={styles.list}>
        {/* <ScrollView>
          {pastGuesses.map((guess, index) => (
            <View key={guess} style={styles.listItem}>
              <Text>#{pastGuesses.length - index}</Text>
              <Text>{guess}</Text>
            </View>
          ))}
        </ScrollView> */}
        <FlatList
          keyExtractor={item => item.toString()}
          data={pastGuesses}
          renderItem={({item, index}) => (
            <View style={styles.listItem}>
              <Text>#{pastGuesses.length - index}</Text>
              <Text>{item}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 300,
    maxWidth: '90%',
  },
  button: {
    width: Dimensions.get('window').width > 350 ? 120 : 80,
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  list: {
    width: '80%',
    flex: 1,
  },
});
