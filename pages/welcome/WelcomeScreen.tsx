import { Formik } from 'formik'
import React from 'react'
import { View, Text, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import InputField from '../../components/form/InputField'
import ViewRoot from '../../components/ViewRoot'
import { store } from '../../store/store'
import { useNavigation } from '@react-navigation/native'
import { Button } from '@ant-design/react-native'
import * as Yup from 'yup'

const validationSchema = Yup.object({
    username: Yup.string().required("Username is required")
})

export default function WelcomeScreen() {

    const navigation: any = useNavigation();

    const handleSubmit = (values: any) => {
        const {username} = values
        store.addUser(username);
        console.log(store.user)
        navigation.navigate("Chat")
    }
    

    return (
        <ViewRoot safe padded style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text style={{fontWeight: "bold", fontSize:36, textAlign:"center", marginBottom: 28}}>Choose a name</Text>
                {/* <Button onPress={()=> alert()}>Alert</Button> */}
                <Formik
                    initialValues={{username: ""}}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}>
                    {(formikBag) => {
                        const {handleSubmit} = formikBag
                        return (
                            <View style={{alignSelf: "stretch", justifyContent: "center"}}>
                                <InputField
                                    name="username"
                                    label="Username"
                                    placeholder="Username..."
                                    formikBag={formikBag}
                                    autoCorrect={false}/>
                                
                                <Button type="primary"
                                    onPress={() => handleSubmit()}>Start Chatting</Button>
                            </View>
                        )
                    }}
                </Formik>

        </ViewRoot>
    )
}

