import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'

import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem from '../../components/TeacherItem'
import api from '../../services/api'
import { getId, logout } from '../../services/token'
import Teacher from '../../data/Teacher'
import { useNavigation } from '@react-navigation/native'

function Favorites() {

    const [favorites, setFavorites] = useState([])

    const { navigate } = useNavigation()

    function loadFavorites() {

        api.get(`favoritesAll/${getId()}`).then(response => {

            if(response.status === 401) {
                logout()
                navigate("Login")
            }

            if(response) {
                setFavorites(response.data)
            }
        })
    }

    useEffect(() => {
        loadFavorites()
    }, [loadFavorites])
    
    return (

        <View style={styles.container} >
            <PageHeader title="Meus Proffys favoritos" />

            <ScrollView style={styles.teacherList} contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 16}}>
                { favorites.map((teacher: Teacher) => <TeacherItem key={teacher.id} teacher={teacher} favorited />) }
            </ScrollView>
        </View>
    )
}

export default Favorites

