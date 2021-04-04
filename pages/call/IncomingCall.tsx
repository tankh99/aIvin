import { Entypo, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Vibration, Alert } from 'react-native'
import { getPokeSound } from '../../utils/audio';
import {Audio} from 'expo-av'
import * as Speech from 'expo-speech'
import { DEVICE_HEIGHT } from '../../constants/device';
import { ICON_COLOR, ICON_SIZE } from '../../constants/icons';
import CallScreenButton from '../../components/CallScreenButton'
import { store } from '../../store/store';



export default function IncomingCall(props: any) {
    const navigation: any = useNavigation()
    const {forceStop} = props
    const [declined, setDeclined] = useState(false)
    
    const acceptCall = async () => {
        forceStop()
        store.updateAcceptedCall(true)
    }

    const declineCall = () => {
        Alert.alert("I want to speak with you")
        setDeclined(true);
    }
    
    return (
        
        <View style={[styles.callButtons]}>
        <View style={styles.callButtonContainer}>
            <TouchableOpacity style={styles.reminderButton} onPress={() => Alert.alert("Pick up the call")}>
                <Ionicons style={{color: "white"}} name="ios-alarm" size={24}/>
                <Text style={{color: "white", marginTop: 12}}>Remind Me</Text>
            </TouchableOpacity>
            {!declined ?
                <>
                    <DeclineCallButton declineCall={declineCall}/>
                </>
                :
                <>
                    <AcceptCallButton acceptCall={acceptCall}/>
                </>
            }
        </View>
        <View style={styles.callButtonContainer}>
            <TouchableOpacity style={styles.reminderButton} onPress={() => Alert.alert("PICK UP THE CALL")}>
                <Ionicons style={{color: "white"}} name="ios-chatbubbles" size={24}/>
                <Text style={{color: "white", marginTop: 12}}>Message</Text>
            </TouchableOpacity>
            <AcceptCallButton acceptCall={acceptCall}/>
        </View>
    </View>
    )
}

export function AcceptCallButton ({acceptCall}: any) {
    return (
        <CallScreenButton label="Accept" bgColor="#4DDB65" style={{marginTop: 20}} onPress={() => acceptCall()}>
            <Ionicons name="ios-call" style={styles.callIcon} size={ICON_SIZE}/>
        </CallScreenButton>
    )
}

export function DeclineCallButton ({declineCall}: any){
    return (
        <CallScreenButton label="Decline" style={{marginTop: 20}}  bgColor="#FF3B2F" onPress={() => declineCall()}>
            <Ionicons name="ios-call" style={styles.hangupIcon} size={ICON_SIZE} color={ICON_COLOR}/>
        </CallScreenButton>
    )
}

const styles = StyleSheet.create({

    callButtons: {
        // display: "flex",
        backgroundColor: "transparent",
        flex:1,
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        right: 40,
        left: 40,
        top: DEVICE_HEIGHT - 275,
        // bottom: 0
    },
    callButtonContainer: {
        backgroundColor: "transparent"
    },
    button: {
        borderRadius: 1000,
        padding: 25,
        position: "relative",
        marginTop: 30,
    },
    callButton: {

        backgroundColor: "green",
    },
    declineButton: {
        backgroundColor: "red"
    },
    callButtonLabel: {
        color: "white",
        textAlign: "center",
        marginTop: 15
    },
    callIcon: {
        color: "white"
    },
    reminderButton: {
        backgroundColor: "transparent",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        
        
    },
    hangupIcon: {
        transform: [
         {
             rotate: "135deg"
         }   
        ]
    }
})