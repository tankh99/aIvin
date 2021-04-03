import React from 'react'
import { View, StyleSheet } from 'react-native'
import Message from '../../components/Message';

export default function ChatLog(props: any) {
    const {messages} = props;
    return (
        <View style={styles.chatlog}>
            {messages && messages.map((message: any, index: number) => {
                const {sender, body, timestamp} = message;
                return (
                    <Message
                        sender={sender}
                        body={body}
                        timestamp={timestamp} />
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    chatlog: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10
    }
})
