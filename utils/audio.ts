
import {Audio} from 'expo-av';

export async function getPokeSound(){
    const {sound} = await Audio.Sound.createAsync(
        require("../assets/sounds/fart.mp3")
    )
    // playPokeSound(sound);
    return sound
}

export async function getRingtone(){
    Audio.setAudioModeAsync({playsInSilentModeIOS: true})
    const {sound: ringtone} = await Audio.Sound.createAsync(require("../assets/sounds/iphone-ringtone.mp3"))
    return ringtone
}
