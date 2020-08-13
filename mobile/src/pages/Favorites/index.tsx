import React, { Component, useState, useEffect } from 'react'
import { Text, View, ScrollView } from 'react-native'

import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import api from '../../services/api'
import { getId } from '../../services/token'

function Favorites() {

    const [favorites, setFavorites] = useState([])

    function loadFavorites() {
        /*
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {
                const favoritedTeachers = JSON.parse(response)
                setFavorites(favoritedTeachers)
            }
        })
        */

        api.get(`favoritesAll/${getId()}`).then(response => {

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

