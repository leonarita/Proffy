import React, { Component, useState } from 'react'
import { Text, View, Picker, FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons'
import DateTimePickerModal from "react-native-modal-datetime-picker";

import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { getId } from '../../services/token';

function TeacherList() {

    const [isFiltersVisible, setIsFiltersVisible] = useState(false)
    const [teachers, setTeachers] = useState<Teacher[]>([])

    const [favorites, setFavorites] = useState<number[]>([])

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState<Date>(new Date())
    const [timeString, setTimeString] = useState('')

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [isLoadedData, setIsLoadedData] = useState(false)
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    //useFocusEffect(() => loadFavorites())

    function loadFavorites() {
        /*
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {
                const favoritedTeachers = JSON.parse(response)
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id
                })
                setFavorites(favoritedTeachersIds)
            }
        })
        */

        api.get(`favorites/${getId()}`).then(response => {

            if(response) {
                const favoritedTeachersIds = response.data.map((data: any) => {
                    return data['proffy_id']
                })
                setFavorites(favoritedTeachersIds)
            }
        })
    }

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible)
    }

    async function handleFiltersSubmit() {
        loadFavorites()

        setTimeString(`${time.getHours()}:${time.getMinutes()}`.toString())

        const response = await api.get('classesPag', {
            params: {
                subject,
                week_day,
                time: timeString
            }
        })

        setTotal(response.headers['x-total-count'])
        setPage(page+1)

        setIsLoadedData(true)
        setIsFiltersVisible(false)
        setTeachers(response.data)
    }

    async function loadTeachers() {

        if (loading) {
            return
        }

        if (total > 0 && teachers.length === total) {
            return
        }
        
        setLoading(true)

        try {

            const response = await api.get(`classesPag?page=${page}`, {
                params: {
                    subject,
                    week_day,
                    time: timeString
                }
            })

            setTeachers([...teachers, ...response.data])

            setIsLoadedData(true)
            setPage(page+1)
            setLoading(false)
            
        } catch (err) {
        }
    }

    return (

        <View style={styles.container} >

            <PageHeader title="Proffys disponíveis" headerRight={(
                <BorderlessButton onPress={handleToggleFiltersVisible}>  
                    <Feather name="filter" size={20} color="#FFF" />
                </BorderlessButton>
            )} >

                { isFiltersVisible && (

                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matérias</Text>
                        <Picker style={styles.input} selectedValue={subject} onValueChange={(itemValue, itemIndex) => setSubject(itemValue)}>
                            <Picker.Item label="Selecione" value="" />
                            <Picker.Item label="Artes" value="Artes" />
                            <Picker.Item label="Biologia" value="Biologia" />
                            <Picker.Item label="Ciências" value="Ciências" />
                            <Picker.Item label="Educação física" value="Educação física" />
                            <Picker.Item label="Física" value="Física" />
                            <Picker.Item label="Geografia" value="Geografia" />
                            <Picker.Item label="História" value="História" />
                            <Picker.Item label="Matemática" value="Matemática" />
                            <Picker.Item label="Português" value="Português" />
                            <Picker.Item label="Química" value="Química" />
                        </Picker>

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <Picker style={styles.input} selectedValue={week_day} onValueChange={text => setWeekDay(text)} >
                                    <Picker.Item label="Selecione" value="" />
                                    <Picker.Item label="Domingo" value="0" />
                                    <Picker.Item label="Segunda-feira" value="1" />
                                    <Picker.Item label="Terça-feira" value="2" />
                                    <Picker.Item label="Quarta-feira" value="3" />
                                    <Picker.Item label="Quinta-feira" value="4" />
                                    <Picker.Item label="Sexta-feira" value="5" />
                                    <Picker.Item label="Sábado" value="6" />
                                </Picker>
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>

                                {/*<TextInput style={styles.input} placeholder="Qual horário?" placeholderTextColor="#c1bccc"
                                    value={time} onChangeText={text => setTime(text)}/>*/}

                                <RectButton style={styles.input} onPress={() => { setDatePickerVisibility(true); }} >
                                { time == null ? <Text>Selecionar</Text> : <Text>{time.getHours()}:{time.getMinutes()}</Text>}
                                </RectButton>

                                <DateTimePickerModal isVisible={isDatePickerVisible} mode="time" onConfirm={(date) => {
                                    setTime(date)
                                    setDatePickerVisibility(false); }} 
                                    onCancel={() => { setDatePickerVisibility(false); }} />
                            </View>
                        </View>

                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>
                                Filtrar
                            </Text>
                        </RectButton>
                    </View>
                )}

            </PageHeader>

            { !isLoadedData ? <Text></Text> 
            : 
                (teachers.length > 0 ? 
/*
                    <ScrollView style={styles.teacherList} contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 16}}>
                        { teachers.map((teacher: Teacher) => (<TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)} />) ) }
                    </ScrollView>
*/
                <FlatList data={teachers} style={styles.teacherList} keyExtractor={(teacher) => String(teacher.id)} 
                    onEndReachedThreshold={0.2} onEndReached={loadTeachers} //showsVerticalScrollIndicator={false} 

                    renderItem={({ item: teacher }) => (
                        <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)} />
                    )}
                />

                :

                <Text style={styles.noResults}>Nenhum professor encontrado com a sua pesquisa.</Text>
                
                ) 
            }

        </View>
    )
}

export default TeacherList

