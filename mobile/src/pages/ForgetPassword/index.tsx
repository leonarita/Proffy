import React, { useState } from 'react'
import { Text, View, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import styles from './styles'
import { RectButton, BorderlessButton } from 'react-native-gesture-handler'
import api from '../../services/api'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/Header';
import backIcon from '../../assets/images/icons/back.png'
import * as yup from 'yup';
import globalStyles from '../../styles/globalStyles'

const emailSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required(),
})

function ForgetPassword () {

    const [email, setEmail] = useState('')

    const { navigate } = useNavigation()

    async function handleRecoverPassword() {

        try {
            emailSchema.isValid({ email }).then(valid => {

                if (valid) {
                    api.post("forgot_password", { email }).then(() => {

                        navigate('SuccessPage', { title: "Redefinição enviada!",
                        subtitle: "Boa, agora é só checar o email que foi enviado para você redefinir sua senha e aproveitar os estudos.",
                        messageButton: "Voltar ao login" })
                    })
                }
            })
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
                    style={[globalStyles.input, { borderRadius: 8 }]}/>

                <RectButton onPress={handleRecoverPassword} style={[globalStyles.submitButton, { margin: 20, marginHorizontal: 40 }]}>
                    <Text style={globalStyles.submitButtonText}>
                        Enviar
                    </Text>
                </RectButton>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ForgetPassword
