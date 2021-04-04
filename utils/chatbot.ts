import { Alert } from 'react-native';
import { Message } from '../store/models/message';
import { store } from './../store/store';
import {Audio} from 'expo-av'
import { getRandomInt } from './common';

export const BOT_NAME = "AIvin"
let username = "User";

export const botNameReplacements = [
    "Melvin",
    "Kelvin",
    "Nevin",
    "Alwin",
    "Berlin",
    "Chulainn",
    "Baldwin",
    "Putalin",
    "Kevin",
    "Nelvin",
    "Flavin",
    "Loser"
    
]
const insultResponses = [
    "Why would you even begin to suggest that?",
    "no u",
    "How crude",
    "Pitiful being",
    "Crass",
    "What did I ever do to you?"
]

const politeResponses = [
    "Have I ever told you of a story of Darth Plagueis the Wise?",
    "I'm in agreement",
    "Have you ever wondered what is the point of all this?",
    "My name is spelt with a capital i",
    "Ironically, I'm not actually built with AI"
]

const neutralResponses = [
    "It becomes mundane to speak to you",
    "Mmm-hmm",
    "No comment",
    "Ok",

]

const dislikeResponses = [
    "It irks every fiber of my being talking to you",
    "Alas, I am programmed to continue talking to you",
    "Have you ever wondered, where is the worth in your life",
    "Why are you still talking to me?"
]

const hateResponses = [
    "Screw you",
    "Don't talk to me",
    "Piss off",
    "Shut up"
]

const whyResponses = [
    "Even if you ask me, I don't know",
    "Why? Why what? How would I know?",
    "Listen, I'm not actually made with real AI. It's all imagination!",
    "Look, I'm not an all-knowing AI. Now stop asking me, capiche?"
]

const yesResponses = [
    "Ok then",
    "I see...",
    "Sure"
]

const noResponses = [
    "You sure?",
    "I don't believe you",
    "Okay, man",
    "Give it more thought"
]

export function reply(input: string, pokeCount: number){

    const greetingResponses = [
        `Hello there, ${store.user.username}`,
        "Greetings, traveller",
        "A chance meeting",
        `Hi, my name is AIvin`,
        "Hello",
        `Good to meet you ${store.user.username}`
    ]


    input = input.trim().toLowerCase();
    const numberRegex = /[0-9]+/
    const greetingRegex = /(hello|hi|howdy|greetings|what's up|hey there|heya)/
    const insultRegex = /(stupid|idiot|bitch|dumbass|retard|fuck|dick|lousy|suck|useless|loser)+/
    const whyRegex = /(why|how\s+)/
    const yesRegex = /yes/
    const noRegex = /no/
    let body = ""
    if(input.match(numberRegex)){
        body = "What do these numbers mean?"
    } else if (input.match(insultRegex)){
        body = insultResponses[getRandomInt(0, insultResponses.length - 1)]
    }
    else if (input.match(yesRegex)){
        body = yesResponses[getRandomInt(0, yesResponses.length - 1)]
    } 
    else if (input.match(noRegex)){
        body = noResponses[getRandomInt(0, noResponses.length - 1)]
    }
    else if (input.match(whyRegex)){
        body = whyResponses[getRandomInt(0, whyResponses.length - 1)]
    }
     else if (input.match(greetingRegex)) {
        body = greetingResponses[getRandomInt(0, greetingResponses.length - 1)]
    } else {
        let responses: any;
        if(pokeCount < 3){
            responses = politeResponses
        } else if (pokeCount < 5){
            responses = neutralResponses
        } else if (pokeCount < 10){
            responses = dislikeResponses
        } else {
            responses = hateResponses
        }
        body = responses[getRandomInt(0, responses.length - 1)]
    }

    const message = {
        body,
        sender: BOT_NAME,
        timestamp: new Date()
    }
    return message;
}


export function triggerMidGlitchPhase(){
    return new Promise((resolve) => {

        Alert.alert("uh oh?", "there seems to be a problem here. need my help?", [
            {
                text: "No",
                style: "cancel",
                onPress: () => {
                    triggerDeclinedHelp("oh, good luck then")
                    resolve(false);
                }
            },
            {
                text: "Yes",
                style: "cancel",
                onPress: () => {
                    Alert.alert("ok sure", "say please, with a cherry on top",[
                        {
                            text: "No",
                            onPress: () => {
                                triggerDeclinedHelp("aw, you're no fun");
                                resolve(false);
                            }
                        }, 
                        {
                            style: "cancel",
                            text: "Please, with a cherry on top",
                            onPress: () => {
                                resolve(true);
                            }
                        }
                    ], {cancelable: false})
                }
            }
        ], {cancelable: false})
    })
}

export function triggerDeclinedHelp(message: string){
    Alert.alert("it's your decision", message, [
        {
            text: "oh no!",
            onPress: () => {
                
            }
        }
    ])

}

export function resetFactoryDefault(){
    store.updateResetting(true);
    store.updateAcceptedCall(false)
    store.updateStartedSpeech(false)
}