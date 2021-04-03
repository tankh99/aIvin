import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface P {
    sender: string,
    body: string,
    timestamp: Date
}

export default function Message(props: P) {
    const {sender, body, timestamp} = props
    return (
        <View style={styles.message}>
            {body}
        </View>
    )
}

const styles = StyleSheet.create({
    message: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        
    }
})
