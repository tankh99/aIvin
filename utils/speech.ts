
import * as Speech from 'expo-speech';

export function getPitch(glitchFactor?: number){
    const pitch = glitchFactor ? Math.random() * glitchFactor + 0.1 : 1

    return pitch
}

export function chainSpeech(speechArr: any, startIndex: number){
    const {text, pitch, delay, fn} = speechArr[startIndex];
    setTimeout(() => {
        const nextIndex = startIndex + 1;
        // console.log(nextIndex)

        if(nextIndex < speechArr.length){
            Speech.speak(text, {pitch, onDone: () => {
                if(fn) fn();
                chainSpeech(speechArr, nextIndex)
                
            }
        })
        } else {
            Speech.speak(text, {pitch})
        }
    }, delay)
}
