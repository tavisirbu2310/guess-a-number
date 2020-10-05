import React from 'react';
import {View, Text, StyleSheet, Button, Image, Dimensions, ScrollView} from 'react-native';
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Colors from '../constants/colors';
import MainButton from "../components/MainButton";

const GameOverScreen = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>The Game is over</TitleText>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        resizeMode='cover'
                        fadeDuration={1000}
                        // source={require('../assets/done.jpg')}
                        source={{uri: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80'}}
                    />
                </View>
                <View style={styles.resultContainer}>
                    <BodyText style={styles.resultText}>Your phone needed <Text
                        style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess
                        the number
                        <Text style={styles.highlight}> {props.userNumber}</Text>
                    </BodyText>
                </View>
                <MainButton type='main' onPress={props.onRestart}>NEW GAME</MainButton>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'kufam-bold'

    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 800 ? 12 : 18
    }
});

export default GameOverScreen;