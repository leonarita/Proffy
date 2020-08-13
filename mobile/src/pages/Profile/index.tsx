import React, {  } from 'react'
import { View, ImageBackground } from 'react-native'
import giveClassesByImage from '../../assets/images/give-classes-background.png'

import styles from './styles'

function Profile() {
    

    return (

        <>
            <View style={styles.header} >
                <ImageBackground source={giveClassesByImage} style={styles.image}>
                    
                </ImageBackground>
            </View>

            <View style={styles.container}>
                <View style={styles.profile}>

                </View>
            </View>
        </>
    )
}

export default Profile

