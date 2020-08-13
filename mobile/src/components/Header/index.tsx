import React, {  } from 'react'
import { Text, View, Image, ImageBackground } from 'react-native'
import styles from './styles'
import logoIcon from '../../assets/images/logo.png'
import giveClassesByImage from '../../assets/images/give-classes-background.png'

function Header () {

    return (
        <View style={styles.container}>
            <ImageBackground source={giveClassesByImage} style={styles.image}>
                <Image source={logoIcon} style={styles.banner} />
                <Text style={styles.desc}>Sua plataforma de estudos online</Text>
            </ImageBackground>
        </View>
    )
}

export default Header
