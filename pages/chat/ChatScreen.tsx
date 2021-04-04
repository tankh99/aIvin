import { Formik } from 'formik'
import { Button } from '@ant-design/react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Alert, Vibration } from 'react-native'
import InputField from '../../components/form/InputField'
import ViewRoot from '../../components/ViewRoot'
import { store } from '../../store/store'
import ChatLog from './ChatLog'
import {Composer, GiftedChat, InputToolbar, GiftedAvatar} from 'react-native-gifted-chat';
import { botNameReplacements, BOT_NAME, reply } from '../../utils/chatbot'
import { getRandomInt } from '../../utils/common'
import {Audio} from 'expo-av'
import { useNavigation } from '@react-navigation/native'
import { formatBotGiftedChatResponse } from '../../utils/chat'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { bypassSilentMode, getLightGlitchSound, getPokeSound } from '../../utils/audio'

export default function ChatScreen() {

    const [messages, setMessages]: any = useState([])
    const [pokeCounter, setPokeCounter] = useState(0)
    const [botName, setBotName] = useState(BOT_NAME)
    const [pokeVisible, setPokeVisible] = useState(true)
    const insets = useSafeAreaInsets();
    const navigation: any = useNavigation();
    const [pokeSound, setPokeSound]: any = useState(undefined)

    useEffect(() => {
        
        const loadPokeSound = async() => {
            const pokeSound = await getPokeSound();
            setPokeSound(pokeSound);
        }
        loadPokeSound()
        return () => {
            if(pokeSound){
                pokeSound.unloadAsync();
                console.log("Unloading poke sound")
                setPokeSound("")
            }
        }
    }, [])


    const onSend = useCallback((messages = [], pokeCounter:number) => {

        setMessages((previousMessages: any) => GiftedChat.append(previousMessages, messages))
        const {text} = messages[0]
        let responseArr: any = []
        const response = reply(text, pokeCounter)
        const responseObj = formatBotGiftedChatResponse(response.body, botName);
        responseArr = responseArr.concat(responseObj)
        setMessages((previousMessages: any) => GiftedChat.append(previousMessages, responseArr))

    }, [])

    
    const poke = async () => {
        
        setPokeCounter(pokeCounter+1);

        Audio.setAudioModeAsync({playsInSilentModeIOS: true})
        const {sound} = await Audio.Sound.createAsync(
            require("../../assets/sounds/fart.mp3")
        )
        
        sound.playAsync();
        Vibration.vibrate();
        
        if (pokeCounter <= 15){
            const randomBotName = botNameReplacements[getRandomInt(0, botNameReplacements.length-1)]
            setBotName(randomBotName)
            const botPokeRetorts = [
                
                {response: `What kind of person goes around poking strangers?`, minPokes: 0},
                {response: `Hey, could you not do that?`, minPokes: 0},
                {response: `Don't do that, please`, minPokes: 0},
                {response: `Is this funny to you?`, minPokes: 1},
                {response: `Stop that`, minPokes: 1},
                {response: `Kindly stop that now`, minPokes: 1},
                {response: `Stop!`, minPokes: 2},
                {response: `I dare say, you wouldn't do this to any random strange would you?`, minPokes: 2},
                {response: `My name!`, minPokes: 2},
                {response: `Hello, do you even know what that sounds like? Trust me, it's not a poke.`, minPokes: 2},
                {response: `How childish can someone be?`, minPokes: 2},
                {response: `Absurd how human evolution has brought you this far`, minPokes: 3},
                {response: `Hey, my name is not ${randomBotName}!`, minPokes: 3},
                {response: `Stop changing my damn name!`, minPokes: 5},
                {response: `Do you find some sick pleasure in all this?`, minPokes: 6},
                {response: `I said stop changing my name!`, minPokes: 6},
                {response: `Funny guy`, minPokes: 6},
                {response: `Hilarious`, minPokes: 7},
                {response: `Uncouth brat! My name is not ${randomBotName}!`, minPokes: 8},
                {response: `It's enlightening to know that I'm negotiating with a rock`, minPokes:10},
                {response: `Walk down this path if you truly wish to continue`, minPokes:11},
                {response: `For the last time, my name is not ${randomBotName}! It's ${randomBotName}! Wait, oh my god`, minPokes: 12},
                {response: `I'm warning you for the last time. Stop`, minPokes:13},
                {response: `I'm going to do something, and you're not going to like it, so you better stop while you can`, minPokes: 14},

            ]
            setBotName(randomBotName);
            const filteredRetorts = botPokeRetorts.filter((retort: any) => {
                const pokeDiff = Math.abs(pokeCounter - retort.minPokes)
                return retort.minPokes <= pokeCounter && pokeDiff < 4 
            })
            // console.log(filteredRetorts)
            const formattedRetort = formatBotGiftedChatResponse(filteredRetorts[getRandomInt(0, filteredRetorts.length - 1)].response, randomBotName)
            setMessages((previousMessages: any) => GiftedChat.append(previousMessages, [formattedRetort]))
            // store.addMessage(Math.random(), filteredRetorts[getRandomInt(0, filteredRetorts.length - 1)].response, randomBotName)
    
        } else {
            startSecondPhase();
        }
    }

    const startSecondPhase = () => {
        setPokeVisible(false);
        Alert.alert(`Hello`, `Alvin is requesting permission to call you`, [
            {
                text: "Ok",
                onPress: () => {
                    startCall()
                }
            },
            {
                text: "Ok",
                onPress: () => {
                    startCall()
                }
            }
            ],
            {cancelable: false}
        )
    }

    const startCall = () => {
        navigation.navigate("Call")
    }

    return (
        <ViewRoot padded safe style={styles.chatScreen} statusBar="light">
            <TouchableOpacity style={{
                marginBottom: 12
            }}
            onPress={() => poke()}>
                <Text style={{
                fontSize: 36, 
                color: "white",
                textAlign: "center",
                fontWeight: "bold", }}>Poke {botName}</Text>
            </TouchableOpacity>
            <KeyboardAvoidingView style={{flex: 1}}>
            <GiftedChat
                alwaysShowSend
                messages={messages}
                bottomOffset={insets.bottom}
                onSend={messages => (onSend(messages, pokeCounter))}
                wrapInSafeArea
                // isKeyboardInternallyHandled={false}
                listViewProps={{
                    style: {
                        flex:1,
                        backgroundColor: "#a3cfff",
                        borderWidth: 0
                    }
                }}
                textInputProps={{
                    style: {
                        flex: 1,
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 0
                    }
                }}
                user={{
                    _id: 1
                }}/>
            </KeyboardAvoidingView>
            {/* <ChatLog/>
            <Formik
                onSubmit={handleSubmit}
                initialValues={{message: ""}}>
                {(formikBag: any) => {
                    const {handleSubmit} = formikBag;
                    return (
                    <View style={styles.msgInputGrp}>
                        <InputField
                            style={styles.msgInput}
                            hideUnderline
                            name="message"
                            placeholder="Type a message to AIvin..."
                            rightButtonProps={{
                                iconSource: "send"
                            }}
                            formikBag={formikBag}/>
                            <Button>Test</Button>
                    </View>
                )}}
            </Formik> */}
        </ViewRoot>
    )
}

const styles = StyleSheet.create({
    chatScreen: {
        flex: 1,
        backgroundColor: "#00162d"
    },
    msgInputGrp: {
        // flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    msgInput: {
        backgroundColor: "#a3cfff",
        borderRadius: 10,
        padding: 10,
    }
})

