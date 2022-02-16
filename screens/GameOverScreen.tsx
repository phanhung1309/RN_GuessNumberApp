import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';

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
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState<number>(
    Dimensions.get('window').width,
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState<number>(
    Dimensions.get('window').height,
  );

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };

    const subscription = Dimensions.addEventListener('change', updateLayout);

    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={styles.title}>The Game is Over!</Text>
        <View
          style={{
            ...styles.imageContainer,
            ...{
              width: availableDeviceWidth * 0.7,
              height: availableDeviceWidth * 0.7,
              borderRadius: (availableDeviceWidth * 0.7) / 2,
              marginVertical: availableDeviceHeight / 30,
            },
          }}>
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
            Your phone needed{' '}
            <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess
            the number <Text style={styles.highlight}>{userNumber}</Text>
          </Text>
        </View>
        <View style={{marginTop: availableDeviceHeight / 20}}>
          <MainButton onPress={onRestart}>RESTART</MainButton>
        </View>
      </View>
    </ScrollView>
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
    borderWidth: 2,
    borderColor: 'black',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
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
