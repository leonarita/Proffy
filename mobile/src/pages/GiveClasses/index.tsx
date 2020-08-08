import React, { Component } from 'react'
import { Text, View, ImageBackground } from 'react-native'

import styles from './styles'
import giveClassesByImage from '../../assets/images/give-classes-background.png'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

function GiveClasses() {

    const { goBack } = useNavigation()

    function handleNavigationBack() {
        goBack()
    }

    return (
        <View style={styles.container} >
            <ImageBackground resizeMode="contain" source={giveClassesByImage} style={styles.content}>
            <Text style={styles.title}>Quer ser {'\n'}um Proffy?</Text>
            <Text style={styles.description}>Para começar, você deve se cadastrar como professor na plataforma web.</Text>
            </ImageBackground>

            <RectButton onPress={handleNavigationBack} style={styles.okButton}>
                <Text style={styles.okButtonText} >Tudo bem</Text>
            </RectButton> 
        </View>
    )
}

export default GiveClasses

