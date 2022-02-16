import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import Input from '../components/Input';
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';
import colors from '../styles/colors';

interface StartGameScreenProps {
  onStartGame: (selectedNumber: number) => void;
}

const StartGameScreen: React.FC<StartGameScreenProps> = ({onStartGame}) => {
  const [enteredValue, setEnteredValue] = useState<string>('');
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [selectedNumber, setSelectedNumber] = useState<number>(0);

  const numberInputHandler = (inputText: string) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue, 10);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number!', 'Number has to be between 1 to 99.', [
        {text: 'Okay', style: 'destructive', onPress: resetInputHandler},
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
              <Text>Select a Number</Text>
              <Input
                autoCorrect={false}
                style={styles.input}
                blurOnSubmit
                keyboardType="number-pad"
                disableFullscreenUI={true}
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button
                    title="Reset"
                    onPress={resetInputHandler}
                    color={colors.accent}
                  />
                </View>
                <View style={styles.button}>
                  <Button
                    title="Confirm"
                    onPress={confirmInputHandler}
                    color={colors.primary}
                    disabled={confirmed}
                  />
                </View>
              </View>
            </Card>

            {confirmed && (
              <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => onStartGame(selectedNumber)}>
                  START GAME
                </MainButton>
              </Card>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: '800',
    color: colors.black,
  },
  inputContainer: {
    width: '80%',
    minWidth: 300,
    maxWidth: '95%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    width: Dimensions.get('window').width / 4,
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default StartGameScreen;
