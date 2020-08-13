import React, { Component, ReactNode } from 'react'
import { View, ImageBackground, Text } from 'react-native'
import giveClassesByImage from '../../assets/images/give-classes-background.png'
import { RectButton } from 'react-native-gesture-handler'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'

function SuccessRegister() {

    const { navigate } = useNavigation()

    return (
        <View style={styles.container}>
            <ImageBackground source={giveClassesByImage} style={styles.image}>
                <Text style={styles.title}>Cadastro concluído!</Text>
                <Text style={styles.desc}>Agora você faz parte da plataforma Proffy.</Text>

                <RectButton onPress={() => navigate("Login")} style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>
                        Fazer login
                    </Text>
                </RectButton>
            </ImageBackground>
        </View>
    )
}

export default SuccessRegister

