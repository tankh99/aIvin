import { Formik } from 'formik'
import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import InputField from '../../components/form/InputField'
import {Button } from 'react-native-ui-lib'
import ViewRoot from '../../components/ViewRoot'
import { store } from '../../store/store'
import { useNavigation } from '@react-navigation/native'

export default function WelcomeScreen() {

    const navigation: any = useNavigation();

    const handleSubmit = (values: any) => {
        const {username} = values
        store.addUser(username);
        console.log(store.user)
        navigation.navigate("Chat")
    }

    return (
        <ViewRoot safe style={{flex: 1, alignSelf: "center", justifyContent: "center", alignItems: "center"}}>
            <View>
                <Text style={{fontWeight: "bold", fontSize:36, textAlign:"center", marginBottom: 28}}>Choose a name</Text>
                <Formik
                    initialValues={{username: ""}}
                    onSubmit={handleSubmit}>
                    {(formikBag) => {
                        const {handleSubmit} = formikBag
                        return (
                            <View style={{flexDirection:"column"}}>
                                <InputField
                                    name="username"
                                    label="Username"
                                    placeholder="Username..."
                                    formikBag={formikBag}
                                    autoCorrect={false}/>
                                
                                <Button onPress={() => handleSubmit()}>
                                    <Text style={{color: "white"}}>Start Chatting</Text>
                                </Button>
                                {/* <Button title="Start Chatting"
                                onPress={() => handleSubmit()}
                                buttonStyle={{
                                    backgroundColor: "#00e08e",
                                    borderRadius: 10,
                                }}
                                titleStyle={{
                                    fontSize: 16
                                }} /> */}
                            </View>
                        )
                    }}

                </Formik>
            </View>

        </ViewRoot>
    )
}

