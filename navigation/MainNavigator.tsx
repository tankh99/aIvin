import React from 'react'
import {createStackNavigator, HeaderStyleInterpolators, TransitionSpecs} from '@react-navigation/stack';
import ChatScreen from '../pages/chat/ChatScreen';
import WelcomeScreen from '../pages/welcome/WelcomeScreen';
import CallScreen from '../pages/call/CallScreen';
import ResetScreen from '../pages/reset/ResetScreen';
import {store} from '../store/store';

const Stack = createStackNavigator();

export default function MainNavigator() {
    return (
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Welcome" component={WelcomeScreen}/>
            <Stack.Screen name="Chat" component={ChatScreen}/>

            <Stack.Screen name="Call" options={{
                title: "Incoming Call",
                ...CallTransition
            }} component={CallScreen}/>

            <Stack.Screen name="Reset" options={{
                title:"Reset Transition",
              ...ResetTransition
            }} component={ResetScreen}/>
        </Stack.Navigator>
    )
}

const ResetTransition = {
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
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9],
                })
              : 1,
          },
        ],
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
        overlayStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      }
    }
  }
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