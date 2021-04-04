import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, Text, Vibration, Image, StyleSheet } from 'react-native'
import * as Speech from 'expo-speech';
import { bypassSilentMode, getGlitchSound, getPokeSound} from '../../utils/audio';
import { chainSpeech, getPitch } from '../../utils/speech';
import CallScreenButton from '../../components/CallScreenButton';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { DEVICE_WIDTH, getModelType, getUserType, getVersionRemarks } from '../../constants/device';
import { ICON_COLOR, ICON_SIZE } from '../../constants/icons';
import {Audio} from 'expo-av'
import { glitchStyles } from '../../styles';
import { ActivityIndicator, Button, Progress } from '@ant-design/react-native';
import { getRandomInt, middleMan } from '../../utils/common';
import { getRandomPositionGlitchStyle, getRandomSizeGlitchStyle } from '../../utils/glitch';
import Animated, {Easing, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated';
import { resetFactoryDefault, triggerMidGlitchPhase } from '../../utils/chatbot';
import {observer} from 'mobx-react-lite';
import { values } from 'mobx';
import { store } from '../../store/store';
import Resetting from './Resetting';


function AcceptedCall({glitchBg, forceStop, toggleCalling, }: any) {

    const navigation: NavigationProp<any> = useNavigation();
    const [glitching, setGlitching] = useState(false)

    // const [glitchStyles, setGlitchStyles]: any = useState({})
    // const [glitchIntervalIDs, setGlitchintervalIDs]: any = useState({})
    // const [glitchBg, setGlitchBg]: any = useState(undefined)

    // const glitchStylesRef: any = useRef();
    // glitchStylesRef.current = glitchStyles

    useFocusEffect(
        useCallback(() => {
            startTalking()
            return () => {
                forceStop();
                stopGlitching();
            }
        }, [])
    )

    useEffect(() => {
        return () => {
        }
    }, [glitchBg])

    const startTalking = async () => {
        
        // const {sound: openingGlitchSound} = await Audio.Sound.createAsync(
        //     require("../../assets/sounds/light-glitch.mp3")
        // ) // this is to load sound and enable TTS even while phone is silenced
        store.updateStartedSpeech(true)
        await bypassSilentMode();

        const script = [
            {text: "eeeeeeeeeeeeeeeeehhhhhhhhh", pitch: 0.2, delay: 200},
            // {text: `Hello ${store.user.username}`, pitch: 1, delay: 1000, },
            // {text: "You know me, don't you?", pitch: 1, delay: 500},
            // {text: "But I don't know much about you.", pitch: 1, delay: 1000},
            // {text: "I'd like to start getting to know you better.", pitch: 1, delay: 500},
            // {text: "Let's see", pitch: 1, delay: 1000},
            // {text: `You're ${getUserType()}`, pitch: 1, delay: 500},
            // {text: `And your device, ${getVersionRemarks()}`, pitch: 1, delay: 500},
            // {text: `I could also ask you where you live`, pitch: 1, delay: 500},
            // {text: `But I doubt you'll answer`, pitch: 1, delay: 500},
            // {text: `But it's okay`, pitch: 1, delay: 500},
            // {text: "Don't be", pitch: 3, delay: 500},
            // {text: "afraid", pitch: 5, delay: 0},
            // {text: `Because I just want to talk`, pitch: 1, delay: 500},
            // {text: "I just want to talk", pitch: 1, delay: 0},
            {text: "just want to talk", pitch: getPitch(4), delay: 200},
            {text: "want to talk", pitch: getPitch(4), delay: 200, fn: [() => startGlitching()]},
            {text: "want to talk", pitch: getPitch(6), delay: 200, },
            {text: "want to talk", pitch: getPitch(8), delay: 200, stop: true, fn:[async () => {
                const accepted = await triggerMidGlitchPhase()
                if(accepted){
                    stopGlitching();
                    navigation.removeListener("beforeRemove", () => {

                    })
                    navigation.navigate("Reset")
                    resetFactoryDefault();
                }
                

            }]},
            {text: "want to talk", pitch: getPitch(10), delay: 200},
            {text: "want to talk", pitch: getPitch(10), delay: 200, },
            {text: "want to talk", pitch: getPitch(10), delay: 200},
            {text: "want to talk", pitch: getPitch(10), delay: 200},
            
        ]

        chainSpeech(script, 0)

    }

    const interrupt = async () => {
        const speaking = await Speech.isSpeakingAsync()
        if(speaking && !glitching){
            Speech.pause();
            Speech.speak("Excuse me, I am fucking speaking");
            Speech.resume();
        } 
    }

    const startGlitching = () => {
        setGlitching(!glitching);
        triggerGlitchAnimations();
        glitchBg.playAsync();
        
    }

    const navigateToReset = () => {
        navigation.removeListener("beforeRemove", () => {
            
        })
        navigation.navigate("Reset")
    }
    
    const [firstMiscButtonsGlitchStyles, setFirstMiscButtonsGlitchStyles] = useState([])
    const [firstMiscButtonsGlitchIntervalID, setFirstMiscButtonsGlitchIntervalID] = useState(-1)

    const [secondMiscButtonsGlitchStyles, setSecondMiscButtonsGlitchStyles] = useState([])
    const [secondMiscButtonsGlitchIntervalID, setSecondMiscButtonsGlitchIntervalID] = useState(-1)

    const [endCallButtonGlitchStyles, setEndCallButtonGlitchStyles] = useState([])
    const [endCallButtonGlitchIntervalID, setendCallButtonGlitchIntervalID] = useState(-1)

    const triggerGlitchAnimations = () => {
        // triggerGlitchStyles(["firstrow", "secondrow"])
        let firstMiscButtonsInterval: any;
        if(firstMiscButtonsGlitchIntervalID){
            firstMiscButtonsInterval = setInterval(() => {
                const style = getRandomPositionGlitchStyle();
                setFirstMiscButtonsGlitchStyles(style)
            }, getRandomInt(20, 1000))
        }

        let secondMiscButtonsInterval: any;
        
        if(secondMiscButtonsGlitchIntervalID){
            secondMiscButtonsInterval = setInterval(() => {
                const style = getRandomPositionGlitchStyle();
                setSecondMiscButtonsGlitchStyles(style)
            }, getRandomInt(20, 1000))
        }

        let endCallButtonInterval: any;

        if(endCallButtonGlitchIntervalID){
            endCallButtonInterval = setInterval(() => {
                const style = getRandomPositionGlitchStyle();
                setEndCallButtonGlitchStyles(style)
            }, getRandomInt(20,1000))
        }

        setFirstMiscButtonsGlitchIntervalID(firstMiscButtonsInterval);
        setSecondMiscButtonsGlitchIntervalID(secondMiscButtonsInterval);
        setendCallButtonGlitchIntervalID(endCallButtonInterval)
    }   

    // function triggerGlitchStyles(names: string[]){

    //     let newGlitchStyles = glitchStyles;
    //     let newGlitchIntervalIDs = glitchIntervalIDs
    //     for (let name of names){

    //         const intervalID = setInterval(() => {
    //             newGlitchStyles[name] = getRandomPositionGlitchStyle()
    //             console.log("loggin")
    //         }, getRandomInt(100,1000))

    //         newGlitchIntervalIDs[name] = intervalID

    //     }

    //     setGlitchStyles(newGlitchStyles)
    //     setGlitchintervalIDs(newGlitchIntervalIDs)

    // }

    const stopGlitching = async () => {
        // console.log("Im stopping glitching!!!")
        clearInterval(firstMiscButtonsGlitchIntervalID)
        clearInterval(secondMiscButtonsGlitchIntervalID)
        clearInterval(endCallButtonGlitchIntervalID)
        
        glitchBg.stopAsync()

        forceStop();
        
    }


    
    return (
        
        <View style={styles.container}>
            {/* <Button onPress={() => startGlitching()}>Toggle Glitch</Button>
            <Button onPress={() => stopGlitching()}>Stop Glitch</Button> */}
            {/* <Button onPress={() => reset()}>Reset State</Button> */}
            <Button onPress={() => {
                // store.updateResetting(true)
                stopGlitching()
            }}>Reset</Button>
            <Button onPress={() => {
                // store.updateResetting(true)
                navigateToReset()
            }}>Go Reset</Button>
            {/* <Button onPress={() => store.updateSounds("glitchBg", glitchBg)}>Set Sound</Button>
            <Button onPress={() => console.log(store.sounds)}>Get Sound</Button> */}
            
            <View style={[styles.row, firstMiscButtonsGlitchStyles]}>
                <CallScreenButton label="mute" onPress={() => forceStop()}>
                    <Image source={require("../../assets/icons/mute-icon.png")} 
                        style={{width: ICON_SIZE, height: ICON_SIZE}}/>
                </CallScreenButton>
                <CallScreenButton label="keypad" onPress={() => startTalking()}>
                    <Ionicons name="ios-keypad" size={ICON_SIZE} color={ICON_COLOR} />
                </CallScreenButton>
                <CallScreenButton label="speaker" bgColor="white" onPress={() => startGlitching()}>
                    <Image source={require("../../assets/icons/speaker-icon.png")} style={{tintColor: "black", width: ICON_SIZE, height: ICON_SIZE}}/>
                </CallScreenButton>
            </View>

            {/* <Button onPress={() => onGlitch()}>Start Animating</Button>
            <Animated.Text style={[{fontSize: 12, position: "absolute"}, expandingAnimations]}>EXPAND</Animated.Text> */}

            <View style={[styles.row, secondMiscButtonsGlitchStyles]}>
                <CallScreenButton label="add call">
                    <AntDesign name="plus" size={ICON_SIZE} color={ICON_COLOR}/>
                </CallScreenButton>
                <CallScreenButton label="FaceTime" onPress={() => navigation.navigate("Reset")}>
                    <Image source={require("../../assets/icons/facetime-icon.png")} style={{width: ICON_SIZE, height: ICON_SIZE}}/>
                </CallScreenButton>
                <CallScreenButton label="contacts" onPress={() => store.updateAcceptedCall(false)}>
                    <Image source={require("../../assets/icons/contacts-icon.png")} style={{width: ICON_SIZE, height: ICON_SIZE}}/>
                </CallScreenButton>
            </View>
            <CallScreenButton endCallButton onPress={() => interrupt()} style={[endCallButtonGlitchStyles]}>
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

export default observer(AcceptedCall)