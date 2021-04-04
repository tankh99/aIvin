import React from 'react'
import { View, Text, ActivityIndicator} from 'react-native'
import {Button} from '@ant-design/react-native'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { store } from '../../store/store';
import { negOrPos } from '../../utils/common';
import { useNavigation } from '@react-navigation/native';
import * as Speech from 'expo-speech'

export default function Resetting() {
    
    const navigation: any = useNavigation();



    setTimeout(() => {
        // reset()
    }, 5000)

    const reset = () => {
        // navigation.navigate("Chat", {
        //     params: {
        //         initial: true
        //     }
        // })

        navigation.reset({
            index: 0,
            routes: [
                {
                    name: "Welcome",
                },
                {
                    name: "Chat"
                },
                {
                    name: "Call"
                }
            ]
        })

        // console.log("Im navigating?")
        // navigation.navigate("Welcome");
        store.updateResetting(false);

    }

    const offsetY = useSharedValue(1);
    const bouncingTextAnim = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: withRepeat(withTiming(offsetY.value * 50, {duration: 2000}))
                }
            ]
        }
    })

    
    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            
            <ActivityIndicator animating={true}/>
            <Button onPress={() => reset()}>Reset</Button>
            <Animated.Text style={[{fontSize: 24, fontWeight: "bold"}]}>This won't take long</Animated.Text>
            {/* <Button onPress={() => store.updateResetting(false)}>Unrset</Button> */}
        </View>
    )
}
