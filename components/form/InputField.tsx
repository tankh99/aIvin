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
    
    const {name, label, value, formikBag,  ...rest}= props
    const {values, errors, touched, handleChange} = formikBag
    
    const hasError = (touched[name] && errors[name]) ? true : false
    const errorMsg = errors[name];
    return (
        <View style={[formStyles.inputContainer, ]}>
            {label && <Text>{label}</Text>}
            <TextInput
                style={formStyles.input}
                placeholder={label}
                value={value ? value : values[name]}
                onChangeText={handleChange(name)}
                {...rest}/>
           {hasError &&

            <Text style={formStyles.formError}>{errorMsg}</Text>
           }
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