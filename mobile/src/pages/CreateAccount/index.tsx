import React, { useState } from 'react'
import { Text, View, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native'
import styles from './styles'
import { RectButton, BorderlessButton } from 'react-native-gesture-handler'
import api from '../../services/api'
import { useNavigation, Link, useFocusEffect } from '@react-navigation/native'
import Header from '../../components/Header';
import backIcon from '../../assets/images/icons/back.png'

function CreateAccount () {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [status, setStatus] = useState(0)

    const { navigate } = useNavigation()

    function createAccount() {

        if ((name != '' && surname !== '') || (email != '' && password !== '')) {
            if (status === 0)
                setStatus(1)
            else {

                try {
                    api.post("/users", { name, surname, email, password }).then(() => {
                        navigate("SuccessRegister")
                    })
                } 
                catch (err) {
                    console.log(err)
                }
            }
        }
    }

    function handleGoBack() {

        if (status === 1)
            setStatus(0)
        else
            navigate("Login")         
    }
    
    return (
        <>
            <View style={styles.topBar}>
                <BorderlessButton onPress={handleGoBack} style={styles.back}>
                    <Image source={backIcon} resizeMode="contain" />
                </BorderlessButton>
            </View>

            <View>
                <Text style={styles.titleBig}>Crie sua conta gratuíta</Text>
                <Text style={styles.desc}>Basta preencher esses dados e você estará conosco.</Text>
            </View>

            <View style={styles.login}>

                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{status === 0 ? "01. Quem é você?" : "02. Email e senha"}</Text>
                    </View>

                    <TextInput value={status === 0 ? name : email} 
                        onChangeText={status === 0 ? text => setName(text) : text => setEmail(text)} 
                        placeholder={status === 0 ? "Nome" : "Email"} placeholderTextColor="#c1bccc"
                        style={styles.input1}/>

                    <TextInput value={status === 0 ? surname : password} 
                        onChangeText={status === 0 ? text => setSurname(text) : text => setPassword(text)} 
                        placeholder={status === 0 ? "Sobrenome" : "Senha"} placeholderTextColor="#c1bccc"
                        style={styles.input2} secureTextEntry={status === 0 ? false : true}/>

                    <RectButton onPress={createAccount} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>
                            {
                                status === 0 ? "Próximo" : "Concluir cadastro"
                            }
                        </Text>
                    </RectButton>
                </KeyboardAvoidingView>
            </View>
        </>
    )
}

export default CreateAccount