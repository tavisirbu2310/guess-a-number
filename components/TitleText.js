import React from 'react';
import {Text, StyleSheet} from 'react-native';

const TitleText = props => <Text style={{...props.style,...styles.title}}>{props.children}</Text>;


const styles = StyleSheet.create({
    title:{
        fontFamily:'kufam-bold',
        fontSize:18
    }
})

export default TitleText;