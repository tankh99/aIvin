import { Message } from '../store/models/message';
import { store } from './../store/store';
import {Audio} from 'expo-av'
import { getRandomInt } from './common';

export const BOT_NAME = "AIvin"

export const botNameReplacements = [
    "Melvin",
    "Kelvin",
    "Nevin",
    "Alwin",
    "Berlin",
    "Chulainn",
    "Baldwin",
    
]

const greetingResponses = [
    "Hello there",
    "Greetings, traveller",
    "A chance meeting",
    `Hi, my name is AIvin`,
    "Hello"
]

const insultResponses = [
    "Why on earth would you even begin to suggest that?",
    "no u",
    "How crude",
    "Pitiful being"
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

export function reply(input: string, pokeCount: number){
    input = input.trim().toLowerCase();
    const numberRegex = /[0-9]+/
    const greetingRegex = /(hello|hi|howdy|greetings)/
    const insultRegex = /(stupid|idiot|bitch|dumbass|retard|fuck)+/
    let body = ""
    if(input.match(numberRegex)){
        body = "What do these numbers mean?"
    } else if (input.match(insultRegex)){
        body = insultResponses[getRandomInt(0, insultResponses.length - 1)]
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
