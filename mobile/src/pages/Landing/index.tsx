import React, { useState } from 'react'
import { Text, View, Image } from 'react-native'
import styles from './styles'
import { useNavigation, Link, useFocusEffect } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

import landingImg from '../../assets/images/landing.png'
import studyIcon from '../../assets/images/icons/study.png'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import heartIcon from '../../assets/images/icons/heart.png'
import sairIcon from '../../assets/images/icons/Sair.png'
import api from '../../services/api'
import { getToken, getId, logout } from '../../services/token'

function Landing() {

    const { navigate } = useNavigation()

    const [totalConnections, setTotalConnections] =  useState(0)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [avatar, setAvatar] = useState('')

    console.log(getToken())

    useFocusEffect(() => bringData())

    function bringData() {

        try {
            api.get(`users/${getId()}`).then(response => {

                if(response.status === 401) {
                    logout()
                    navigate("Login")
                }

                setName(response.data.name)
                setSurname(response.data.surname)
                setAvatar(response.data.avatar)
            })

            api.get('connections').then(response => {

                if(response.status === 401) {
                    logout()
                    navigate("Login")
                }
                
                const { total } = response.data
                setTotalConnections(total)
            })
        }
        catch {
            logout()
            navigate("Login")
        }
    }

    function handleNavigationToGiveClassesPage() {
        navigate('GiveClasses')
    }

    function handleNavigationToStudyPages() {
        navigate('Study')
    }

    function handleLogout() {
        logout()
        navigate("Login")
    }

    return (
        <View style={styles.container} >

            <View style={styles.top}>

                <View style={styles.userData}>
                    <View style={styles.data}>
                        <Image source={{uri: avatar}} style={styles.photo} />
                        <Link to="/Profile">
                            <Text style={styles.name}>{name} {surname}</Text>
                        </Link>
                    </View>

                    <RectButton onPress={handleLogout}>
                        <Image source={sairIcon} style={styles.sair}/>
                    </RectButton>
                </View>

                <Image source={landingImg} style={styles.banner} />
            </View>

            <View style={styles.bottom}>

                <Text style={styles.title} > 
                    Seja bem-vindo, {'\n'} 
                    <Text style={styles.titleBold}>O que deseja fazer?</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton style={[styles.button, styles.buttonPrimary]} onPress={handleNavigationToStudyPages}>
                        <Image source={studyIcon} />
                        <Text style={styles.buttonText}>Estudar</Text>
                    </RectButton>

                    <RectButton style={[styles.button, styles.buttonSecondary]} onPress={handleNavigationToGiveClassesPage}>
                        <Image source={giveClassesIcon} />
                        <Text style={styles.buttonText}>Dar aulas</Text>
                    </RectButton>
                </View>

                <Text style={styles.totalConnections}>
                    Total de {totalConnections} conexões já realizadas {' '}
                    <Image source={heartIcon} />
                </Text>
            </View>
        </View>
    )
}

export default Landing

