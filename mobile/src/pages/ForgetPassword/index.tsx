import React, { Component, useState } from 'react'
import { Text, View, Image, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { Checkbox } from 'react-native-paper';
import styles from './styles'
import logoIcon from '../../assets/images/logo.png'
import giveClassesByImage from '../../assets/images/give-classes-background.png'
import { RectButton, BorderlessButton } from 'react-native-gesture-handler'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation, Link } from '@react-navigation/native'
import { setToken } from '../../services/token'
import Header from '../../components/Header';
import PageHeader from '../../components/PageHeader';
import backIcon from '../../assets/images/icons/back.png'

function ForgetPassword () {

    const [email, setEmail] = useState('')

    const { navigate } = useNavigation()

    async function handleRecoverPassword() {

        if (!email) {
            return
        }

        try {
            api.post("forgot_password", { email })

            navigate('SuccessPassword')
        }
        catch (err) {
            console.log(err)
        }
    }

    function handleGoBack() {
        navigate('Login')
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <Header/>
            
            <BorderlessButton onPress={handleGoBack} style={styles.iconBack}>
                <Image source={backIcon} resizeMode="contain" />
            </BorderlessButton>

            <View style={styles.login}>

                <View style={styles.header}>
                    <Text style={styles.title}>Esqueceu sua senha?</Text>

                    <Text style={styles.sub}>
                        Não esquenta, vamos dar um jeito nisso.
                    </Text>

                </View>

                <TextInput value={email} onChangeText={text => setEmail(text)} placeholder="E-mail" placeholderTextColor="#c1bccc"
                    style={styles.input}/>

                <RectButton onPress={handleRecoverPassword} style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>
                        Enviar
                    </Text>
                </RectButton>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ForgetPassword
