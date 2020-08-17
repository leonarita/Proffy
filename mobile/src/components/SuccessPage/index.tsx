import React, {  } from 'react'
import { View, ImageBackground, Text, Image } from 'react-native'
import giveClassesByImage from '../../assets/images/give-classes-background.png'
import DoneIcon from '../../assets/images/icons/Feito.png'
import { RectButton } from 'react-native-gesture-handler'
import styles from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import globalStyles from '../../styles/globalStyles'
import { getId } from '../../services/token'

interface MessageProps {
    title: string
    subtitle: string, 
    messageButton: string
}

const SuccessPage = () => {

    const { navigate } = useNavigation()

    const route = useRoute()
    const routeParams = route.params as MessageProps

    return (
        <View style={styles.container}>
            <ImageBackground source={giveClassesByImage} style={styles.image}>

                <Image source={DoneIcon} style={styles.done} />

                <Text style={styles.title}>{routeParams.title}</Text>
                <Text style={styles.desc}>{routeParams.subtitle}</Text>

                <RectButton onPress={() => {
                    if(!getId())
                        navigate("Login")
                    else
                        navigate("Landing")}}
                     style={[globalStyles.submitButton, { marginTop: 20 }]}>
                    <Text style={globalStyles.submitButtonText}>
                        {routeParams.messageButton}
                    </Text>
                </RectButton>
            </ImageBackground>
        </View>
    )
}

export default SuccessPage

