import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import {Glitch} from 'rn-glitch-effect'

interface P {
    text: string,
    amp?: number,
    enabled?: boolean
}

export default function GlitchText(props: P) {
    const {text, amp, enabled} = props
    console.log(enabled)

    useEffect(() => {
        
        return () => {
            
        }
    }, [enabled])
    return (
        <View>
            
            <Glitch
                text="Glitching"
                outOfTextRange={false}
                repeatDelay={200}
                glitchAmplitude={amp ? amp : 5}
                disableAutoAnimation={enabled}
                textStyle={{color:"white"}}/>
        </View>
    )
}
