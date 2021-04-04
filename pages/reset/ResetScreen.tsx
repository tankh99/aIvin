import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator} from 'react-native'
import {Button} from '@ant-design/react-native'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { store } from '../../store/store';
import { negOrPos } from '../../utils/common';
import { CommonActions, NavigationProp, StackActions, useNavigation } from '@react-navigation/native';
import * as Speech from 'expo-speech'
import { resetFactoryDefault } from '../../utils/chatbot';

export default function ResetScreen(props: any) {
    
    const navigation: any = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            reset()
        }, 5000)
        return () => {
            
        }
    }, [])

    const reset = () => {
        navigation.reset({
            index: 0,
            routes: [
                {name: "Welcome"}
            ]
        })
        resetFactoryDefault();
    }
    
    
    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <ActivityIndicator animating={true}/>
            
            <Animated.Text style={[{fontSize: 24, fontWeight: "bold"}]}>This won't take long</Animated.Text>
            {/* <Button onPress={() => reset()}>Reset</Button> */}
            {/* <Button onPress={() => navigation.navigate("Welcome")}>Navigate</Button> */}
        </View>
    )
}
