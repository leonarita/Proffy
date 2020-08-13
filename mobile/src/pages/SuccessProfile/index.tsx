import React, { Component, ReactNode } from 'react'
import { View, ImageBackground, Text } from 'react-native'
import giveClassesByImage from '../../assets/images/give-classes-background.png'
import { RectButton } from 'react-native-gesture-handler'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'

function SuccessProfile() {

    const { navigate } = useNavigation()

    return (
        <View style={styles.container}>
            <ImageBackground source={giveClassesByImage} style={styles.image}>
                <Text style={styles.title}>Cadastro salvo!</Text>
                <Text style={styles.desc}>Tudo certo, seu cadastro está na lista de Proffys. Agora é só ficar de olho no seu WhatsApp.</Text>

                <RectButton onPress={() => navigate("Login")} style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>
                        Acessar
                    </Text>
                </RectButton>
            </ImageBackground>
        </View>
    )
}

export default SuccessProfile

