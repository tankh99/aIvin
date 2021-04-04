import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'

interface P {
    padded?: boolean,
    safe?: boolean,
    style?: any,
    statusBar?: "light" | "dark",
    children: any
}

export default function ViewRoot(props: P) {
    const {padded, safe, style, statusBar, children} = props

    const styleList = [padded && styles.padded, style]


    if(safe){
        return (    
            <SafeAreaView style={styleList}>
                <StatusBar style={statusBar ? statusBar : "dark"}/> 
                    {/* <TouchableWithoutFeedback style={{zIndex: 10}} onPress={() => Keyboard.dismiss()} > */}
                    {/* <KeyboardAwareScrollView contentContainerStyle={style}> */}
                        {children}
                    {/* </KeyboardAwareScrollView> */}
                    {/* </TouchableWithoutFeedback> */}
                
            </SafeAreaView>
        )
    } else {
        return (
            <View style={styleList}>
                <StatusBar style={statusBar ? statusBar : "dark"}/> 
                {children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    padded: {
        paddingHorizontal: 15,
        paddingVertical: 15
    }
})

