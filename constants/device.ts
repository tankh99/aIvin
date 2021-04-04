import { Dimensions } from "react-native";
import * as Device from 'expo-device'

export const DEVICE_HEIGHT = Dimensions.get("window").height;
export const DEVICE_WIDTH = Dimensions.get("window").width;

export function getUserType(){
    const osName = Device.osName;
    switch(osName){
        case "iOS":
        case "iPadOS":
            return "an apple user aren't you?"
        case "Android":
            return "an android user aren't you?"
        default:
            return "...what device are you using?"
    }
}

export function getModelType(){
    const modelName = Device.modelName;
    return modelName
}

export function getVersionRemarks(){
    const deviceYear: any = Device.deviceYearClass;
    let response = "";
    // your device is
    const thisYear = new Date().getFullYear();
    let timeSincePurchase = "a few months";
    const yearDiff = thisYear - deviceYear;
    if (yearDiff > 0){
        let suffix = "years"

        if(yearDiff == 1){
            suffix = "year"
        }
        timeSincePurchase = `${yearDiff} ${suffix}`
    }
    
    if (deviceYear <= thisYear - 8){
        response = "it's prehistoric, what do you even have? A Nokia?"
    } else if (deviceYear <= thisYear - 5){
        response = "it's old, perhaps I'm putting too much strain on your device then? Haha"
    }else if (deviceYear <= thisYear - 4){
        response = "it's getting old. Perhaps you should replace it soon?"
    } else if (deviceYear <= thisYear - 2){
        response = "it's quite recent"
    } else if(deviceYear <= thisYear){
        response = `it's state of the art you bought it ${timeSincePurchase} ago?`
    } 
    return response;
}