import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions} from 'react-native';
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";
import {Ionicons} from '@expo/vector-icons';
import BodyText from "../components/BodyText";

// import * as ScreenOrientation from 'expo-screen-orientation';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
)

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

    const [availableDeviceHeight,setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
    const [availableDeviceWidth,setAvailableDeviceWidth] = useState(Dimensions.get('window').width);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {userChoice, onGameOver} = props;

    useEffect(()=> {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        }
        Dimensions.addEventListener('change',updateLayout);

        return () => {
            Dimensions.removeEventListener('change',updateLayout);
        }
    })

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t cheat!', 'You know that this is wrong...', [{
                text: 'Try playing fair next!',
                style: 'cancel'
            }]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(currPastGuesses => [nextNumber.toString(), ...currPastGuesses])
    };

    let listWrapperStyle = styles.listWrapper;

    if (availableDeviceWidth < 350){
        listWrapperStyle = styles.listWrapperBig;
    }

    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <TitleText>Phone's Guess</TitleText>
                <View style={styles.controls}>
                    <MainButton type='lower' onPress={() => nextGuessHandler('lower')}>
                        <Ionicons name='md-remove' size={20} color='#fff'/></MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton type='greater' onPress={() => nextGuessHandler('greater')}>
                        <Ionicons name='md-add' size={20} color='#fff'/></MainButton>
                </View>
                <View style={listWrapperStyle}>
                    <FlatList keyExtractor={item => item}
                              contentContainerStyle={styles.list}
                              data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)}/>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <TitleText>Phone's Guess</TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton type='lower' onPress={() => nextGuessHandler('lower')}>
                    <Ionicons name='md-remove' size={20} color='#fff'/></MainButton>
                <MainButton type='greater' onPress={() => nextGuessHandler('greater')}>
                    <Ionicons name='md-add' size={20} color='#fff'/></MainButton>
            </Card>
            <View style={listWrapperStyle}>
                {/*<ScrollView contentContainerStyle={styles.list}>*/}
                {/*    {pastGuesses.map((guess,index) => renderListItem(guess,pastGuesses.length - index))}*/}
                {/*</ScrollView>*/}
                <FlatList keyExtractor={item => item}
                          contentContainerStyle={styles.list}
                          data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)}/>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 300,
        maxWidth: '80%'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    listWrapper: {
        flex: 1,
        width: '90%',
    },
    listWrapperBig: {
        flex:1,
        width: '60%'
    },
    list: {
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-end'
    },
    controls:{
        flexDirection:'row',
        justifyContent:'space-around',
        width: '80%',
        alignItems: 'center'
    }
})

export default GameScreen;