import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Platform,TouchableNativeFeedback} from 'react-native';
import Colors from '../constants/colors';

const MainButton = props => {
    const buttonPlatform = Platform.OS === 'ios' ? {...styles.button}:{...styles.button,...styles.buttonAndroid};
    const buttonColor = props.type === 'main'? {...styles.buttonMain}:props.type === 'lower' ? {...styles.buttonLower}:{...styles.buttonGreater};
    const buttonStyles = {...buttonPlatform,...buttonColor};


    let ButtonComponent = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version>=21){
        ButtonComponent = TouchableNativeFeedback;
    }

    return(
        <ButtonComponent activeOpacity={.7} onPress={props.onPress}>
            <View style={buttonStyles}>
                <Text style={styles.buttonText}>
                    {props.children}
                </Text>
            </View>
        </ButtonComponent>
    )
};

const styles = StyleSheet.create({
    button:{
        paddingVertical:12,
        paddingHorizontal:30,
        borderRadius:5,
        marginTop:10
    },
    buttonAndroid: {
        height:50
    },
    buttonMain:{
        backgroundColor: Colors.primary
    },
    buttonLower:{
        backgroundColor: 'red',
        alignItems:'center',
        justifyContent:'center'
    },
    buttonGreater:{
        backgroundColor: 'green',
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText:{
        color:'#fff',
        fontFamily:'kufam-regular',
        fontSize:15,
        textAlign:'center'
    }
});

export default MainButton;