import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
    return Font.loadAsync({
        'ranchers-regular': require('./assets/fonts/Ranchers-Regular.ttf'),
        'kufam-bold': require('./assets/fonts/Kufam-Bold.ttf'),
        'kufam-regular': require('./assets/fonts/Kufam-Regular.ttf')
    });
}

export default function App() {

    const [userNumber, setUserNumber] = useState();
    const [guessRounds, setGuessRounds] = useState(0);

    const [dataLoaded, setDataLoaded] = useState(false);

    if (!dataLoaded) {
        return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)}
                           onError={(err) => console.log(err)}/>;
    }

    const newGameHandler = () => {
        setGuessRounds(0);
        setUserNumber(null);
    }

    const startGameHandler = (selectedNumber) => {
        setUserNumber(selectedNumber);
    };

    const gameOverHandler = numberOfRounds => {
        setGuessRounds(numberOfRounds);
    };

    let content = <StartGameScreen onStartGame={startGameHandler}/>;

    (userNumber && guessRounds === 0) ? content =
        <GameScreen onGameOver={gameOverHandler} userChoice={userNumber}/> : null;

    guessRounds > 0 ? content =
        <GameOverScreen onRestart={newGameHandler} roundsNumber={guessRounds} userNumber={userNumber}/> : null;


    return (
        <SafeAreaView style={styles.screen}>
            <Header title='Guess a Number'/>
            {content}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});
