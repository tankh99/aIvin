import { glitchStyles } from "../styles";
import { StyleSheet } from 'react-native';
import { getRandomInt } from "./common";

export function getRandomPositionGlitchStyle(){
    const randomInt = getRandomInt(0, 4);
    const randomOffset = getRandomInt(30, 350);
    let style: any;
    if(randomInt == 0){
        style = {
            right: randomOffset
        }
    } else if (randomInt == 1){
        style = {
            bottom: randomOffset
        }
    } else if (randomInt == 2){
        style = {
            left: randomOffset
        }
    } else if (randomInt == 3){
        style = {
            top: randomOffset
        }
    } else {
        style = null
    }
    return style;
}

export function getRandomSizeGlitchStyle(): any{
    const randomWidth = getRandomInt(10, 150);
    const randomHeight = getRandomInt(10, 200);
    return {
        width: randomWidth,
        height: randomHeight
    }
}

export const styles = StyleSheet.create({
    
    shiftLeft: {
        right: 50
    },
    shiftRight: {
        left: 50
    },
    shiftUp: {
        bottom: 50
    },
    shiftDown: {
        top: 50
    }
})