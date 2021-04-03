
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DEVICE_HEIGHT } from '../constants/device'

export default function CallScreenButton({label, children, endCallButton, bgColor, style, onPress}: any) {
    return (
        <View style={styles.buttonGrp}>
            <TouchableOpacity style={[
                styles.button, 
                !endCallButton ? styles.miscButton: styles.endCallButton, 
                bgColor ? {backgroundColor: bgColor, borderWidth: 0} : null,
                style

            ]} 
                onPress={onPress}>
                {children}
            </TouchableOpacity>

            <Text style={styles.buttonLabel}>{label}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonGrp: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonLabel: {
        color: "white",
        marginBottom: 12,
        marginTop: 8
    },
    button: {
        borderRadius: 100,
        padding: 25,
        alignSelf: "center",
    },
    miscButton: {
        borderColor: "rgba(255,255,255,0.6)",
        borderWidth: 1,
        backgroundColor: "transparent",
        marginVertical: 4,
        marginHorizontal: 4
    },
    endCallButton: {
        backgroundColor: "red",
        marginTop: 80
        // position: "absolute",
        // top: DEVICE_HEIGHT
    }
    
})
