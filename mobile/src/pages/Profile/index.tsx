import React, { useState, useEffect } from 'react'
import { View, ImageBackground, Image, Text, ScrollView, Picker, TouchableOpacity, Alert } from 'react-native'
import giveClassesByImage from '../../assets/images/give-classes-background.png'
import { launchImageLibraryAsync } from 'expo-image-picker';
import backIcon from '../../assets/images/icons/back.png'
import logoImg from '../../assets/images/logo.png'

import styles from './styles'
import api from '../../services/api'
import { useNavigation } from '@react-navigation/native'
import { getId, logout } from '../../services/token'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { TextInput } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import convertMinutesToHours from '../../utils/convertMinutesToHours';
import ScheduleItem from '../../data/ScheduleItem';
import SelectSubject from '../../components/SelectSubject';
import SelectWeekday from '../../components/SelectWeekday';
import globalStyles from '../../styles/globalStyles'

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
            .catch(() => {
                logout()
                navigate("Login")
            })

            bringDataSchedule()
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

            })
            .catch(() => {
                logout()
                navigate("Login")
            })

            if(scheduleItems.length > 1) {
                scheduleItems.filter(() => {
                    return
                })
            }
        } catch (err) {
        }
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

                    navigate('SuccessPage', { title: "Cadastro salvo!",
                        subtitle: "Tudo certo, seu cadastro está na lista de Proffys. Agora é só ficar de olho no seu WhatsApp.",
                        messageButton: "Acessar" })
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
                            <Text style={globalStyles.label}>Nome</Text>
                            <TextInput value={name} onChangeText={text => setName(text)} 
                                style={[globalStyles.input, { borderRadius: 8 }]} placeholderTextColor="#6A6180"/>
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={globalStyles.label}>Sobrenome</Text>
                            <TextInput value={surname} onChangeText={text => setSurname(text)} 
                                style={[globalStyles.input, { borderRadius: 8 }]} placeholderTextColor="#6A6180"/>
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={globalStyles.label}>Email</Text>
                            <TextInput value={email} onChangeText={text => setEmail(text)} 
                                style={[globalStyles.input, { borderRadius: 8 }]} placeholderTextColor="#6A6180"/>
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={globalStyles.label}>Whatsapp</Text>
                            <TextInput value={whatsapp} onChangeText={text => setWhatsapp(text)}
                                style={[globalStyles.input, { borderRadius: 8 }]} placeholderTextColor="#6A6180"/>
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={globalStyles.label}>Biografia</Text>
                            <TextInput value={bio} onChangeText={text => setBio(text)}
                                style={[styles.input]} placeholderTextColor="#6A6180" numberOfLines={4} multiline={true}/>
                        </View>

                        
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.title}>Sobre a aula</Text>

                        <View style={styles.inputBlock}>
                            <Text style={globalStyles.label}>Matéria</Text>
                            
                            <SelectSubject selectedValue={subject} onValueChange={(itemValue: string) => setSubject(itemValue)}
                                style={[globalStyles.input, { borderRadius: 8 }]} />
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={globalStyles.label}>Custo</Text>
                            <TextInput value={String(cost)} onChangeText={text => setCost(text)}
                                style={[globalStyles.input, { borderRadius: 8 }]} placeholderTextColor="#6A6180"/>
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

                                <View key={index} style={{ marginBottom: 5 }}>
                                    <View style={styles.inputBlock}>
                                        <Text style={globalStyles.label}>Dia da semana</Text>
                                        
                                        <SelectWeekday style={[globalStyles.input, { borderRadius: 8 }]} selectedValue={String(scheduleItem.week_day)} 
                                        onValueChange={(e: any) => setScheduleItemValue(index, 'week_day', e)} />
                                    </View>
        
                                    <View style={styles.time}>
                                        <View style={styles.itemTime}>
                                            <Text style={globalStyles.label}>Das</Text>
                                            <TextInput value={scheduleItem.from} onChangeText={e => setScheduleItemValue(index, 'from', e)}
                                                style={[globalStyles.input, { borderRadius: 8 }]} placeholderTextColor="#6A6180"/>
                                        </View>

                                        <View style={styles.itemTime}>
                                            <Text style={globalStyles.label}>Até</Text>
                                            <TextInput value={scheduleItem.to} onChangeText={e => setScheduleItemValue(index, 'to', e)}
                                                style={[globalStyles.input, { borderRadius: 8 }]} placeholderTextColor="#6A6180"/>
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

                    <RectButton onPress={handleCreateClass} style={globalStyles.submitButton}>
                        <Text style={globalStyles.submitButtonText}>
                            Salvar alterações
                        </Text>
                    </RectButton>

                </View>

            </ScrollView>

        </View>
    )
}

export default Profile