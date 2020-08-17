import React, { useState, useEffect } from 'react'
import { Text, View, TextInput } from 'react-native'
import { Checkbox } from 'react-native-paper';
import styles from './styles'
import { RectButton } from 'react-native-gesture-handler'
import api from '../../services/api'
import { useNavigation, Link } from '@react-navigation/native'
import { setToken, setId, loginAsyncStorage, getDataAsyncStorage } from '../../services/token'
import Header from '../../components/Header';
import AsyncStorage from '@react-native-community/async-storage';

function Login () {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checked, setChecked] = useState(false)

    const { navigate } = useNavigation()

    useEffect(() => {
        
        try {
            getDataAsyncStorage()

            AsyncStorage.getItem('USER_ID').then(response => {
                if(response) {
                    navigate('Landing')
                }
            })
        }
        catch {
            return
        }
    }, [])

    async function handleLogin() {

        if (!email || !password) {
            return
        }

        try {
            const response = await api.post("/login", { email, password });

            setToken(response.data.token)
            setId(response.data.data_user.id)

            if (checked)
                loginAsyncStorage(response.data.token, response.data.data_user.id)

            setEmail('')
            setPassword('')
            navigate('Landing')
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Header/>

            <View style={styles.login}>

                <View style={styles.header}>
                    <Text style={styles.title}>Fazer login</Text>

                    <Link to="/CreateAccount" style={styles.createAccount}>
                        <Text style={styles.createAccountText}>
                            Criar uma conta
                        </Text>
                    </Link>

                </View>

                <TextInput value={email} onChangeText={text => setEmail(text)} placeholder="E-mail" placeholderTextColor="#c1bccc"
                    style={styles.input1}/>

                <TextInput value={password} onChangeText={text => setPassword(text)} placeholder="Senha" placeholderTextColor="#c1bccc"
                    style={styles.input2} secureTextEntry={true}/>

                <View style={styles.buttonsExtras}>
                    <View style={styles.check}>
                        <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} color="#04D361" />
                        <Text style={styles.checkText}>Lembrar-me</Text>
                    </View>

                    <Link to="/ForgetPassword">
                        <Text style={styles.forget}>Esqueci minha senha</Text>
                    </Link>
                </View>

                <RectButton onPress={handleLogin} style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>
                        Entrar
                    </Text>
                </RectButton>
            </View>
        </>
    )
}

export default Login
