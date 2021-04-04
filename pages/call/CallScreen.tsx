import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Vibration, Animated, Alert } from 'react-native'
import IncomingCall from './IncomingCall'
import ImageOverlay from 'react-native-image-overlay';
import ViewRoot from '../../components/ViewRoot';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { bypassSilentMode, getGlitchSound, getPokeSound, getRingtone } from '../../utils/audio';
import {Audio} from 'expo-av'
import AcceptedCall from './AcceptedCall';
import * as Speech from 'expo-speech';
import {Glitch} from 'rn-glitch-effect';
import GlitchText from '../../components/GlitchText';
import { ActivityIndicator, Button } from '@ant-design/react-native';
import { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { store } from '../../store/store';
import Resetting from './Resetting';
import { observer } from 'mobx-react-lite';

function CallScreen() {

    const navigation: any = useNavigation();
    const [ringtone, setRingtone]: any = useState(undefined)
    const [isCalling, setIsCalling] = useState(false)
    const [glitchBg, setGlitchBg]: any = useState(null)


    useEffect(() => {
        const init = async () => {
            navigation.addListener("beforeRemove", (e: any) => {
                e.preventDefault();
                Alert.alert("You can't escape");
            })
    
            const loadRingtone = async() => {
                const ringtone = await getRingtone();
                startCalling(ringtone);
                await setRingtone(ringtone);
                
            }
            await loadRingtone();

            const loadGlitchBg = async () => {
                const glitchBg = await getGlitchSound();
                await setGlitchBg(glitchBg);
            }
            await loadGlitchBg();
        }
        init();

        return () => {
            if(ringtone) {
                ringtone.unloadAsync();
            }
        }
    }, [])
    

    const startCalling = async (ringtone: any) => {
        ringtone.playAsync();
        Vibration.vibrate([500, 500], true)
    }



    const toggleCalling = async () => {
        if(isCalling){
            Vibration.cancel();
            ringtone.stopAsync();
        } else {
            Vibration.vibrate([500, 500], true)
            ringtone.playAsync()

        }
        setIsCalling(!isCalling);        
    }

    const forceStop = async () => {
        Speech.stop();
        Vibration.cancel();
        // console.log(store.glitchBg)
        store.updateStartedSpeech(false);
        if(ringtone){
            await ringtone.stopAsync();
        }

        if(glitchBg) {
            console.log("Stopping glitchBG")
            
            await glitchBg.stopAsync();
            // console.log(glitchBg)
        }

    }


    const playGlitchSound = async () => {
        // const sound = await getGlitchSound();
        glitchBg.setIsLoopingAsync(true);
        glitchBg.setVolumeAsync(0.5)
        glitchBg.playAsync();
        // setGlitchBg(sound);
        // store.updateGlitchBg(glitchBg)

    }
    

    // if(store.resetting){
    //     return <Resetting/>
    // }

    return (
        <>
            <ImageOverlay
                blurRadius={100}
                containerStyle={[StyleSheet.absoluteFill, styles.backgroundImage]} 
                source={require("../../assets/images/iphone-x-wallpaper.jpeg")}/>
            <ViewRoot safe style={styles.flex} statusBar="light">
            {/* <View style={[StyleSheet.absoluteFill, styles.backgroundOverlay]}></View>
            <Image style={[StyleSheet.absoluteFill, styles.backgroundImage]} source={require("../assets/images/iphone-x-wallpaper.jpeg")}/> */}
                <View style={styles.callerNameContainer}>
                    <Animated.Text style={[styles.callerName]}>Alvin</Animated.Text>
                    <Text style={styles.callerNameSubheader}>iPhone</Text>
                </View>
                {store.acceptedCall
                ? <AcceptedCall playGlitchSound={playGlitchSound} 
                    forceStop={forceStop} 
                    glitchBg={glitchBg}
                    toggleCalling={toggleCalling} />
                : <IncomingCall forceStop={forceStop} />
                }
                
            </ViewRoot>
        </>
    )
}

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    callerNameContainer: {
        // position: "absolute",
        alignSelf: "center",
        top: 50,
        backgroundColor: "transparent"
    },
    callerName:{
        fontWeight: "bold",
        fontSize: 36,
        color: "white",
    },
    callerNameSubheader: {
        fontSize: 18,
        color: "rgba(255,255,255,0.6)",
        textAlign: "center",
        marginTop: 18
    },
    backgroundImage: {
        width: "100%",
        height: "150%",
        // resizeMode: "cover"
    },
})

export default observer(CallScreen);