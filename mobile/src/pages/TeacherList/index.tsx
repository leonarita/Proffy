import React, { useState } from 'react'
import { Text, View, ToastAndroid, FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons'
import DateTimePickerModal from "react-native-modal-datetime-picker";

import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem from '../../components/TeacherItem'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import api from '../../services/api'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getId, logout } from '../../services/token';
import Teacher from '../../data/Teacher';
import SelectSubject from '../../components/SelectSubject';
import SelectWeekday from '../../components/SelectWeekday';
import globalStyles from '../../styles/globalStyles'

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

    const { navigate } = useNavigation()

    useFocusEffect(() => loadFavorites())

    function loadFavorites() {

        api.get(`favorites/${getId()}`).then(response => {

            if(response) {
                const favoritedTeachersIds = response.data.map((data: any) => {
                    return data['proffy_id']
                })

                setFavorites(favoritedTeachersIds)
            }
        })
        .catch(() => {
            logout()
            navigate("Login")
        })
    }

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible)
    }

    async function handleFiltersSubmit() {
        loadFavorites()

        if (subject !== '' && subject !== "") {

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
        else {
            ToastAndroid.showWithGravity(
                "Preencha todos os campos!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            );
        }
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
                        <SelectSubject selectedValue={subject} onValueChange={(itemValue: string) => setSubject(itemValue)}
                            style={styles.input} />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <SelectWeekday style={styles.input} selectedValue={week_day} onValueChange={(text: any) => setWeekDay(text)} />
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

                        <RectButton onPress={handleFiltersSubmit} style={globalStyles.submitButton}>
                            <Text style={globalStyles.submitButtonText}>
                                Filtrar
                            </Text>
                        </RectButton>
                    </View>
                )}

            </PageHeader>

            { !isLoadedData ? <Text></Text> 
            : 
                (teachers.length > 0 ? 

                <FlatList data={teachers} style={styles.teacherList} keyExtractor={(teacher) => String(teacher.id)} 
                    onEndReachedThreshold={0.2} onEndReached={loadTeachers} //showsVerticalScrollIndicator={false} 
                    contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 16}}

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

