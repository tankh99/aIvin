
import * as Speech from 'expo-speech';
import { store } from '../store/store';

export function getPitch(glitchFactor?: number){
    const pitch = glitchFactor ? Math.random() * glitchFactor + 0.1 : 1

    return pitch
}

export function chainSpeech(speechArr: any, startIndex: number, ){
    const {text, pitch, delay, fn} = speechArr[startIndex];
    setTimeout(() => {
        const nextIndex = startIndex + 1;
        if(store.startedSpeech){
            if(nextIndex < speechArr.length){
                Speech.speak(text, {pitch, onDone: () => {
                    if(fn) {
                        for(let func of fn){
                            func();
                        }
                    }
                    chainSpeech(speechArr, nextIndex)
                }
                })
            } else {
                Speech.speak(text, {pitch})
            }
        }
    }, delay)
}
