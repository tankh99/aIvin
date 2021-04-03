import React from 'react'
import {createStackNavigator, HeaderStyleInterpolators, TransitionSpecs} from '@react-navigation/stack';
import ChatScreen from '../pages/chat/ChatScreen';
import WelcomeScreen from '../pages/welcome/WelcomeScreen';
import CallScreen from '../pages/call/CallScreen';

const Stack = createStackNavigator();

export default function MainNavigator() {
    return (
        <Stack.Navigator initialRouteName="Call" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen}/>
            <Stack.Screen name="Chat" component={ChatScreen}/>
            <Stack.Screen name="Call" options={{
                title: "Incoming Call",
                ...CallTransition
            }} component={CallScreen}/>
        </Stack.Navigator>
    )
}


const CallTransition = {
    gestureDirection: "horizontal",
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({current, next, layouts}: any) => {
      return {
        cardStyle: {
          transform: [
            {
              translateY: current.progress.interpolate({
                inputRange: [0,1]   ,
                outputRange: [30, 0]
              })
            },
          ],
          opacity: current.progress.interpolate({
            inputRange: [0,1],
            outputRange: [0,1]
          })
        },
        overlayStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0,1],
            outputRange: [0, 1]
          })
        }
      }
    } 
  }