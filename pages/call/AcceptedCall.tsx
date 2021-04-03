import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { View, Text, Vibration, Image, StyleSheet } from 'react-native'
import * as Speech from 'expo-speech';
import { getPokeSound} from '../../utils/audio';
import { chainSpeech, getPitch } from '../../utils/speech';
import CallScreenButton from '../../components/CallScreenButton';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { DEVICE_WIDTH } from '../../constants/device';
import { ICON_COLOR, ICON_SIZE } from '../../constants/icons';
import {Audio} from 'expo-av'
import { glitchStyles } from '../../styles';
import { Button } from '@ant-design/react-native';
import { getRandomInt } from '../../utils/common';

export default function AcceptedCall({forceStop, toggleCalling}: any) {

    const [interruptedOnce, setInterruptedOnce] = useState(false)
    const [glitching, setGlitching] = useState(false)

    const [firstMiscButtonsGlitchStyles, setFirstMiscButtonsGlitchStyles] = useState([])
    const [firstMiscButtonsGlitchIntervalID, setFirstMiscButtonsGlitchIntervalID] = useState(-1)

    const [secondMiscButtonsGlitchStyles, setSecondMiscButtonsGlitchStyles] = useState([])
    const [secondMiscButtonsGlitchIntervalID, setSecondMiscButtonsGlitchIntervalID] = useState(-1)

    useFocusEffect(
        useCallback(() => {
            // startTalking()
            return () => {
                forceStop();
                stopGlitching();
            }
        }, [])
    )

    const startTalking = async () => {
        
        const {sound: openingGlitchSound} = await Audio.Sound.createAsync(
            require("../../assets/sounds/light-glitch.mp3")
        ) // this is to load sound and enable TTS even while phone is silenced
        openingGlitchSound.setVolumeAsync(0);
        openingGlitchSound.playAsync();

        const script = [
            {text: "Hello", pitch: 1, delay: 1000},
            {text: "You know me, don't you?", pitch: 1, delay: 500},
            {text: "Don't be", pitch: 3, delay: 500},
            {text: "afraid", pitch: 5, delay: 0},
            {text: "I just want to talk", pitch: 1, delay: 0},
            {text: "and talk", pitch: getPitch(2), delay: 200},
            {text: "and talk", pitch: getPitch(4), delay: 200, fn: startGlitching},
            {text: "and talk", pitch: getPitch(6), delay: 200},
            {text: "and talk", pitch: 100, delay: 200},
            
        ]

        chainSpeech(script, 0)

        // startGlitching();

    }

    const interrupt = async () => {
        const speaking = await Speech.isSpeakingAsync()
        setInterruptedOnce(true)
        if(speaking){
            Speech.pause();
            Speech.speak("Excuse me, I am fucking speaking");
            Speech.resume();
        } 
    }

    const startGlitching = () => {
        setGlitching(!glitching);
        
        triggerCallButtons();
    }

    const triggerCallButtons = () => {
        let firstMiscButtonsInterval = setInterval(() => {
            const randomInt = getRandomInt(0, 2);
            console.log(randomInt)
            let style: any;
            if(randomInt == 0){
                style = glitchStyles.shiftLeft;
            } else if (randomInt == 1) {
                style = glitchStyles.shiftRight;
            }   else {
                style = null
            }
            setFirstMiscButtonsGlitchStyles(style)

        }, getRandomInt(100, 1000))


        let secondMiscButtonsInterval = setInterval(() => {
            const randomInt = getRandomInt(0, 2);
            console.log(randomInt)
            let style: any;
            if(randomInt == 0){
                style = glitchStyles.shiftLeft;
            } else if (randomInt == 1) {
                style = glitchStyles.shiftRight;
            }   else {
                style = null
            }
            setSecondMiscButtonsGlitchStyles(style)

        }, getRandomInt(100, 1000))

        setFirstMiscButtonsGlitchIntervalID(firstMiscButtonsInterval);
        setSecondMiscButtonsGlitchIntervalID(secondMiscButtonsInterval);
    }   

    const stopGlitching = () => {
        clearInterval(firstMiscButtonsGlitchIntervalID)
        clearInterval(secondMiscButtonsGlitchIntervalID)
    }

    return (
        
        <View style={styles.container}>
            <Button onPress={() => startGlitching()}>Toggle Glitch</Button>
            <Button onPress={() => stopGlitching()}>Stop Glitch</Button>
            <View style={[styles.row, firstMiscButtonsGlitchStyles]}>
                <CallScreenButton label="mute" onPress={() => forceStop()}>
                    <Image source={require("../../assets/icons/mute-icon.png")} 
                        style={{width: ICON_SIZE, height: ICON_SIZE}}/>
                </CallScreenButton>
                <CallScreenButton label="keypad" onPress={startTalking}>
                    <Ionicons name="ios-keypad" size={ICON_SIZE} color={ICON_COLOR} />
                </CallScreenButton>
                <CallScreenButton label="speaker" bgColor="white">
                    <Image source={require("../../assets/icons/speaker-icon.png")} style={{tintColor: "black", width: ICON_SIZE, height: ICON_SIZE}}/>
                </CallScreenButton>
            </View>
            <View style={[styles.row, secondMiscButtonsGlitchStyles]}>
                <CallScreenButton label="add call">
                    <AntDesign name="plus" size={ICON_SIZE} color={ICON_COLOR}/>
                </CallScreenButton>
                <CallScreenButton label="FaceTime" onPress={() => startGlitching()}>
                    <Image source={require("../../assets/icons/facetime-icon.png")} style={{width: ICON_SIZE, height: ICON_SIZE}}/>
                </CallScreenButton>
                <CallScreenButton label="contacts">
                    <Image source={require("../../assets/icons/contacts-icon.png")} style={{width: ICON_SIZE, height: ICON_SIZE}}/>
                </CallScreenButton>
            </View>
            <CallScreenButton endCallButton onPress={() => interrupt()}>
                <Ionicons name="ios-call" style={styles.hangupIcon} size={ICON_SIZE} color={ICON_COLOR}/>
            </CallScreenButton>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex:1,        
        backgroundColor: "transparent",
        position: "absolute",
        top: 250,
        justifyContent: "center",
        alignItems:"center",
        width: DEVICE_WIDTH - 40,
        marginHorizontal: 20
    },
    text: {
        color: "white"
    },
    row: {
        flex: 1,
        flexDirection: "row"
    },
    
    hangupIcon: {
        transform: [
         {
             rotate: "135deg"
         }   
        ]
    }
})
