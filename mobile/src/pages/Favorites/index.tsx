import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'

import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem from '../../components/TeacherItem'
import api from '../../services/api'
import { getId } from '../../services/token'
import Teacher from '../../data/Teacher'

function Favorites() {

    const [favorites, setFavorites] = useState([])

    function loadFavorites() {

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

