import React, { useState, Component, useEffect, FormEvent } from 'react'
import { View, ImageBackground, Image, Text, ScrollView, FlatList, Picker, TouchableOpacity, Alert } from 'react-native'
import giveClassesByImage from '../../assets/images/give-classes-background.png'
import { launchImageLibraryAsync } from 'expo-image-picker';
import backIcon from '../../assets/images/icons/back.png'
import logoImg from '../../assets/images/logo.png'

import styles from './styles'
import api from '../../services/api'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { getId } from '../../services/token'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { TextInput } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'

interface ScheduleItem {
    id: number, 
    week_day: number,
    to: string,
    from: string
}

function Profile() {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState<File>()
    const [photo, setPhoto] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')
    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')
    const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([])

    const { navigate } = useNavigation()

    useEffect(() => {

        try {

            api.get(`users/${getId()}`).then(response => {

                setName(response.data.name)
                setSurname(response.data.surname)
                setPhoto(response.data.avatar)
                setEmail(response.data.email)
                setBio(response.data.bio)
                setWhatsapp(response.data.whatsapp)
                setSubject(response.data.subject)
                setCost(response.data.cost)
            })

            api.get(`classes/${getId()}`).then(response => {

                response.data.map((d: ScheduleItem) => {
                    d.from = convertMinutesToHours(d.from)
                    d.to = convertMinutesToHours(d.to)
                })

                setScheduleItems(response.data)

            }).catch(() => console.log('Ocorreu erro'))

            if(scheduleItems.length > 1) {
                scheduleItems.filter((d: ScheduleItem) => {
                    return
                })
            }
        } catch (err) {
        }
        
    }, [])

    function bringDataSchedule() {
        try {

            api.get(`classes/${getId()}`).then(response => {

                response.data.map((d: ScheduleItem) => {
                    d.from = convertMinutesToHours(d.from)
                    d.to = convertMinutesToHours(d.to)
                })

                setScheduleItems(response.data)

            }).catch(() => console.log('Ocorreu erro'))

            if(scheduleItems.length > 1) {
                scheduleItems.filter((d: ScheduleItem) => {
                    return
                })
            }
        } catch (err) {
        }
    }

    function convertMinutesToHours(time: string) {
        const timeNumber = parseInt(time)
        const hours = timeNumber / 60
        const minutes = timeNumber - (hours * 60)

        if (hours < 10 && minutes < 10) {
            return `0${hours}:0${minutes}`.toString()
        }
        else if (minutes < 10) {
            return `${hours}:0${minutes}`.toString()
        }
        else if (hours < 10) {
            return `0${hours}:${minutes}`.toString()
        }
         
        return `${hours}:${minutes}`.toString()
    }

    function addNewScheduleItem () {

        if (scheduleItems.length > 0)
            setScheduleItems([...scheduleItems, { id: -1, week_day: 0, from: '', to: '' }])
        else
            setScheduleItems([{ id: -1, week_day: 0, from: '', to: '' }])
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem
        })

        setScheduleItems(updatedScheduleItems)
    }

    function handleCreateClass() {
        
        try {
            const data = new FormData()

            data.append('name', name)
            data.append('surname', surname)

            if (avatar)
                data.append('image', avatar)
            
            api.post(`profile/${getId()}`, data).then(() => {

                api.post(`classes/${getId()}`, {  whatsapp, bio, subject, cost: Number(cost), schedule: scheduleItems })
                .then(() => { 
                    navigate("SuccessProfile")
                })
                .catch(() => { console.log('Erro no cadastro') })

            })
            .catch(() => { console.log('Erro na atualização') })
        }
        catch {
            console.log("Erro inesperado")
        }
    }

    function handleGoBack() {
        navigate('Landing')
    }

    async function handleSubmit() {
        try {
            const upload = await launchImageLibraryAsync();
    
            if (upload.cancelled) {
                console.log('Canceled');
            }
            else {
                if (upload !== undefined && upload.uri !== undefined)
                    setAvatar({
                        //@ts-ignore
                        uri: upload.uri,
                        type: `${upload.type}/jpg`,
                        name: `${name}_${surname}.jpg`,
                    })
            }
        } 
        catch (error) {
            Alert.alert('Oops! Ocorreu um erro ao efetuar o upload :(');
        }
    }

    return (

        <View style={styles.all} >

            <View style={styles.header} >

                <View style={styles.topBar}>
                    <BorderlessButton onPress={handleGoBack}>
                        <Image source={backIcon} resizeMode="contain" />
                    </BorderlessButton>

                    <Image source={logoImg} resizeMode="contain" />
                </View>
                
                <ImageBackground source={giveClassesByImage} style={styles.image}>
                    <Image source={{uri: photo}} style={styles.photo} />

                    <TouchableOpacity onPress={handleSubmit} style={styles.upload}>
                            <MaterialIcons name="cloud-upload" size={24} color="#FFF" />
                    </TouchableOpacity>

                    <Text style={styles.name}>{name} {surname}</Text>
                    <Text style={styles.subject}>{subject}</Text>
                </ImageBackground>
            </View>

            <ScrollView style={styles.scroll} contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 16}}>
                <View>
                    <View style={styles.container}>
                        <Text style={styles.title}>Seus dados</Text>

                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Nome</Text>
                            <TextInput value={name} onChangeText={text => setName(text)} 
                                style={styles.input} placeholderTextColor="#6A6180"/>
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Sobrenome</Text>
                            <TextInput value={surname} onChangeText={text => setSurname(text)} 
                                style={styles.input} placeholderTextColor="#6A6180"/>
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput value={email} onChangeText={text => setEmail(text)} 
                                style={styles.input} placeholderTextColor="#6A6180"/>
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Whatsapp</Text>
                            <TextInput value={whatsapp} onChangeText={text => setWhatsapp(text)}
                                style={styles.input} placeholderTextColor="#6A6180"/>
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Biografia</Text>
                            <TextInput value={bio} onChangeText={text => setBio(text)}
                                style={styles.input} placeholderTextColor="#6A6180" numberOfLines={4} multiline={true}/>
                        </View>

                        
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.title}>Sobre a aula</Text>

                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Matéria</Text>
                            
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
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Custo</Text>
                            <TextInput value={String(cost)} onChangeText={text => setCost(text)}
                                style={styles.input} placeholderTextColor="#6A6180"/>
                        </View>
                    </View>

                    <View style={styles.container}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.title}>Horários disponíveis</Text>

                            <RectButton onPress={addNewScheduleItem}>
                                <Text style={styles.add}>+ Novo</Text>
                            </RectButton>
                        </View>

                        {scheduleItems.map((scheduleItem, index) => {

                            return (

                                <View style={{ marginBottom: 5 }}>
                                    <View style={styles.inputBlock}>
                                        <Text style={styles.label}>Dia da semana</Text>
                                        
                                        <Picker style={styles.input} selectedValue={String(scheduleItem.week_day)} 
                                        onValueChange={e => setScheduleItemValue(index, 'week_day', e)} >
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
        
                                    <View style={styles.time}>
                                        <View style={styles.itemTime}>
                                            <Text style={styles.label}>Das</Text>
                                            <TextInput value={scheduleItem.from} onChangeText={e => setScheduleItemValue(index, 'from', e)}
                                                style={styles.input} placeholderTextColor="#6A6180"/>
                                        </View>

                                        <View style={styles.itemTime}>
                                            <Text style={styles.label}>Até</Text>
                                            <TextInput value={scheduleItem.to} onChangeText={e => setScheduleItemValue(index, 'to', e)}
                                                style={styles.input} placeholderTextColor="#6A6180"/>
                                        </View>
                                    </View>

                                    <RectButton onPress={() => {
                                        api.delete(`classes/${scheduleItem.id}`).then(() => bringDataSchedule())
                                        }} 
                                        
                                        style={styles.delete}>
                                        <Text style={styles.deleteText}>
                                            Excluir horário
                                        </Text>
                                    </RectButton>

                                </View>

                            )
                        })}

                    </View>

                    <RectButton onPress={handleCreateClass} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>
                            Salvar alterações
                        </Text>
                    </RectButton>

                </View>

            </ScrollView>

        </View>
    )
}

export default Profile