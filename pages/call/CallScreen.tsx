import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Vibration } from 'react-native'
import IncomingCall from './IncomingCall'
import ImageOverlay from 'react-native-image-overlay';
import ViewRoot from '../../components/ViewRoot';
import { useNavigation } from '@react-navigation/native';
import { getRingtone } from '../../utils/audio';
import {Audio} from 'expo-av'
import AcceptedCall from './AcceptedCall';
import * as Speech from 'expo-speech';
import {Glitch} from 'rn-glitch-effect';
import GlitchText from '../../components/GlitchText';
import { Button } from '@ant-design/react-native';

export default function CallScreen() {

    const navigation: any = useNavigation();
    const [accepted, setAccepted] = useState(false)
    const [ringtone, setRingtone]: any = useState(undefined)
    const [isCalling, setIsCalling] = useState(false)
    const [glitch, setGlitch] = useState(false)

    useEffect(() => {
        navigation.addListener("beforeRemove", (e: any) => {
            e.preventDefault();
        })

        const loadRingtone = async() => {
            Audio.setAudioModeAsync({playsInSilentModeIOS: true})
            const ringtone = await getRingtone();
            setRingtone(ringtone);
        }
        loadRingtone();
        return () => {
            if(ringtone) {
                ringtone.unloadAsync();
            }
        }
    }, [])
    
    const toggleCalling = () => {

        setAccepted(!accepted)
        if(isCalling){
            Vibration.cancel();
            ringtone.stopAsync();
        } else {
            Vibration.vibrate([500, 500], true)
            ringtone.playAsync()

        }
        setIsCalling(!isCalling);        
    }

    const forceStop = () => {
        Speech.stop();
        Vibration.cancel();
        ringtone.stopAsync();
    }


    return (
        <>
            <ImageOverlay
                blurRadius={100}
                containerStyle={[StyleSheet.absoluteFill, styles.backgroundImage]} 
                source={require("../../assets/images/iphone-x-wallpaper.jpeg")}/>
            <ViewRoot safe style={styles.flex}>
            {/* <View style={[StyleSheet.absoluteFill, styles.backgroundOverlay]}></View>
            <Image style={[StyleSheet.absoluteFill, styles.backgroundImage]} source={require("../assets/images/iphone-x-wallpaper.jpeg")}/> */}
                <View style={styles.callerNameContainer}>
                    <Text style={styles.callerName}>Alvin</Text>
                    <Text style={styles.callerNameSubheader}>iPhone</Text>
                </View>
                {accepted
                ? <AcceptedCall forceStop={forceStop} toggleCalling={toggleCalling}/>
                : <IncomingCall setAccepted={toggleCalling} />
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