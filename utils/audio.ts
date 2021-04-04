
import {Audio} from 'expo-av';

export async function getPokeSound(){
    Audio.setAudioModeAsync({playsInSilentModeIOS: true})
    console.log("Loading sound")
    const {sound} = await Audio.Sound.createAsync(
        require("../assets/sounds/fart.mp3")
    )
    return sound
}

export async function getLightGlitchSound(){
    Audio.setAudioModeAsync({playsInSilentModeIOS: true})
    const {sound} = await Audio.Sound.createAsync(
        require("../assets/sounds/light-glitch.mp3")
    )
    return sound
}

export async function getGlitchSound(){
    Audio.setAudioModeAsync({playsInSilentModeIOS: true})
    const {sound} = await Audio.Sound.createAsync(
        require("../assets/sounds/glitch-bg.mp3")
    )
    return sound
}



export async function getRingtone(){
    Audio.setAudioModeAsync({playsInSilentModeIOS: true})
    const {sound: ringtone} = await Audio.Sound.createAsync(require("../assets/sounds/iphone-ringtone.mp3"))
    return ringtone
}

export async function bypassSilentMode(){
    const {sound} = await Audio.Sound.createAsync(
        require("../assets/sounds/empty-sound.mp3")
    )
    Audio.setAudioModeAsync({playsInSilentModeIOS: true})
    // sound.setVolumeAsync(1);
    sound.playAsync();
}
