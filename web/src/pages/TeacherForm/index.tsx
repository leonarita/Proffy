import React, { useState, FormEvent, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import './styles.css'
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

interface ScheduleItem {
    week_day: number,
    to: string,
    from: string
}

function TeacherForm() {

    const history = useHistory()

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [avatar, setAvatar] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')
    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')

    const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([])

    useEffect(() => {

        const userId = sessionStorage.getItem('USER_ID')

        api.get(`users/${userId}`).then(response => {

            setName(response.data.name)
            setSurname(response.data.surname)
            setAvatar(response.data.avatar)
            setBio(response.data.bio)
            setWhatsapp(response.data.whatsapp)
            setSubject(response.data.subject)
            setCost(response.data.cost)
        })

        api.get(`classes/${userId}`).then(response => {

            response.data.map((d: ScheduleItem) => {
                d.from = convertMinutesToHours(d.from)
                d.to = convertMinutesToHours(d.to)
            })

            setScheduleItems(scheduleItems => scheduleItems.concat(response.data))

        }).catch(() => console.log('Ocorreu erro'))

        if(scheduleItems.length > 1) {
            scheduleItems.filter((d: ScheduleItem) => {
                return
            })
        }
        
    }, [])

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
            setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }])
        else
            setScheduleItems([{ week_day: 0, from: '', to: '' }])
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

    function handleCreateClass(e: FormEvent) {

        e.preventDefault()

        const userId = localStorage.getItem('USER_ID')

        api.put(`classes/${userId}`, {  whatsapp, bio, subject, cost: Number(cost), schedule: scheduleItems })
            .then(() => { 
                alert('Cadastro realizado com sucesso') 
                history.push('/main')
            })
            .catch(() => { alert('Erro no cadastro') })
    }

    return (
        
        <div id="page-teacher-form" className="container">

            <PageHeader title="Que incrível que você quer dar aulas." 
                description="O primeiro passo é preencher esse formulário de inscrição"/>

            <main>

                <form onSubmit={handleCreateClass}>

                    <fieldset>
                        <legend> Seus dados </legend>

                        <div className="header">
                            <div className="person">
                                <img src={avatar} 
                                alt={name}/>

                                <strong>
                                    {name} {surname} 
                                </strong>

                            </div>

                            <Input name="whatsapp" label="WhatsApp" value={whatsapp} placeholder="(  ) _ ____ ____" 
                                onChange={(e) => { setWhatsapp(e.target.value) }} />
                        </div>

                        <Textarea name="bio" label="Biografia" value={bio} onChange={(e) => { setBio(e.target.value) }} />
                    </fieldset>

                    <fieldset>
                        <legend> Sobre a aula </legend>

                        <div className="class">

                            <Select name="subject" label="Matéria" value={subject} onChange={(e) => { setSubject(e.target.value) }}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Ciências', label: 'Ciências' },
                                { value: 'Educação física', label: 'Educação física' },
                                { value: 'Física', label: 'Física' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'História', label: 'História' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Português', label: 'Português' },
                                { value: 'Química', label: 'Química' },
                            ]} />

                            <Input name="cost" label="Custo da sua aula por hora" value={cost} onChange={(e) => { setCost(e.target.value) }} />
                        
                        </div>

                    </fieldset>
                    
                    <fieldset>
                        <legend> 
                            Horários disponíveis 
                            <button type="button" onClick={addNewScheduleItem}> + Novo horário </button>
                        </legend>

                        { scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">

                                    <Select name="week_day" label="Dia da semana" value={scheduleItem.week_day}
                                    onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                    
                                        options={[
                                        { value: '0', label: 'Domingo' },
                                        { value: '1', label: 'Segunda-feira' },
                                        { value: '2', label: 'Terça-feira' },
                                        { value: '3', label: 'Quarta-feira' },
                                        { value: '4', label: 'Quinta-feira' },
                                        { value: '5', label: 'Sexta-feira' },
                                        { value: '6', label: 'Sábado' }
                                    ]} />

                                    <Input name="from" label="Das" type="time" value={scheduleItem.from}
                                    onChange={e => setScheduleItemValue(index, 'from', e.target.value)}></Input>

                                    <Input name="to" label="Até" type="time" value={scheduleItem.to}
                                    onChange={e => setScheduleItemValue(index, 'to', e.target.value)}></Input>

                                </div>
                            )
                        }) }
                        
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br/>
                            Preencha todos os dados.
                        </p>

                        <button type="submit"> Salvar cadastro </button>
                    </footer>

                </form>

            </main>

        </div>
    )
}

export default TeacherForm
