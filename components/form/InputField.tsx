import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { formStyles } from '../../styles'


interface P {
    name: string,
    label?: string,
    placeholder?: string,
    formikBag: any
}

export default function InputField(props: any) {
    
    const {name, label, value, formikBag, ...rest}= props
    const {values, handleChange} = formikBag

    return (
        <View style={[formStyles.inputContainer, {alignSelf: "center", flex: 1, justifyContent: "center", marginTop: 4, marginRight: 4}]}>
            {label && <Text>{label}</Text>}
            <TextInput
                style={formStyles.input}
                placeholder={label}
                value={value ? value : values[name]}
                onChangeText={handleChange(name)}
                {...rest}/>
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        
    },
    inputContainer: {
        alignSelf:"center",
        borderRadius: 10,
        borderColor: "gray",
        borderWidth: 1,
        backgroundColor: "white",
        // paddingVertical: 4,
        paddingHorizontal: 10,
    }
})