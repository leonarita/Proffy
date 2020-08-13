import React, { Component, ReactNode } from 'react'
import { View, ImageBackground, Text } from 'react-native'
import giveClassesByImage from '../../assets/images/give-classes-background.png'
import { RectButton } from 'react-native-gesture-handler'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'

function SuccessPassword() {

    const { navigate } = useNavigation()

    return (
        <View style={styles.container}>
            <ImageBackground source={giveClassesByImage} style={styles.image}>
                <Text style={styles.title}>Redefinição enviada!</Text>
                <Text style={styles.desc}>Boa, agora é só checar o email que foi enviado para você redefinir sua senha e aproveitar os estudos.</Text>

                <RectButton onPress={() => navigate("Login")} style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>
                        Voltar login
                    </Text>
                </RectButton>
            </ImageBackground>
        </View>
    )
}

export default SuccessPassword

