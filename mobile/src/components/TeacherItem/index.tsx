import React, { Component, useState } from 'react'
import { Text, View, Image, Linking } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import styles from './styles'
import { RectButton } from 'react-native-gesture-handler'
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'
import api from '../../services/api'
import { useFocusEffect } from '@react-navigation/native'
import { getId } from '../../services/token'

export interface Teacher {
    avatar: string,
    bio: string,
    cost: number,
    id: number,
    name: string,
    subject: string,
    whatsapp: string
}

interface TeacherItemProps {
    teacher: Teacher,
    favorited: boolean
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher, favorited}) => {

    const [isFavorited, setisFavorited] = useState(favorited)

    useFocusEffect(() => loadFavorites())

    function handleLinkToWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
        api.post('connections', { user_id: teacher.id })
    }

    function loadFavorites() {
        api.get(`favorites/${getId()}`).then(response => {

            var ok = false

            if(response) {
                response.data.map((data: any) => {
                    if (data['proffy_id'] === teacher.id)
                        ok = true
                })
            }

            console.log(ok)
            setisFavorited(ok)
        })
    }

    async function handleToggleFavorite() {
        /*
        const favorites = await AsyncStorage.getItem('favorites')

        let favoritesArray = []

        if (favorites)
            favoritesArray = JSON.parse(favorites)

        if (isFavorited) {
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
                return teacherItem.id === teacher.id
            })

            favoritesArray.splice(favoriteIndex, 1)
            setisFavorited(false)
        }
        else {            
            favoritesArray.push(teacher)

            setisFavorited(true)
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
        */

        await api.post(`favorites/${getId()}`, { proffy_id: teacher.id })
        setisFavorited(!isFavorited)
    }

    return (

        <View style={styles.container}>

            <View style={styles.profile}>
                <Image style={styles.avatar} source={{ uri: `http://192.168.15.12:3333/uploads/${teacher.avatar}` }} />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                {teacher.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço-hora {'  '}
                    <Text style={styles.priceValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(teacher.cost)}</Text>
                </Text>

                <View style={styles.buttonsContainer}>

                    <RectButton onPress={handleToggleFavorite} style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}>
                        { isFavorited ? <Image source={unFavoriteIcon} /> : <Image source={heartOutlineIcon} /> }                       
                    </RectButton>

                    <RectButton style={styles.contactButton}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText} onPress={handleLinkToWhatsapp}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>

        </View>
    )
}

export default TeacherItem

