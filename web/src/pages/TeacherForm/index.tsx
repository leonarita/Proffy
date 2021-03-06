import React, { useState, FormEvent, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import './styles.css'
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../components/Textarea';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { logout } from '../../services/token';
import ConvertMinutesToHours from '../../utils/ConvertMinutesToHours'
import { ScheduleItem } from '../../data/ScheduleItem';
import SelectSubject from '../../components/SelectSubject';
import SelectWeekday from '../../components/SelectWeekday';

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

        try {
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
            .catch(() => {
                logout()
                history.push("/")
            })

            api.get(`classes/${userId}`).then(response => {

                response.data.map((d: ScheduleItem) => {
                    d.from = ConvertMinutesToHours(d.from)
                    d.to = ConvertMinutesToHours(d.to)
                })

                setScheduleItems(scheduleItems => scheduleItems.concat(response.data))

            })
            .catch(() => {
                logout()
                history.push("/")
            })

            if(scheduleItems.length > 1) {
                scheduleItems.filter(() => {
                    return
                })
            }
        } catch (err) {
            logout()
            history.push("/")
        }
        
    }, [])

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

        const userId = sessionStorage.getItem('USER_ID')

        api.post(`classes/${userId}`, {  whatsapp, bio, subject, cost: Number(cost), schedule: scheduleItems })
            .then(() => { 
                history.push("/success-profile")
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

                            <SelectSubject value={subject} onChange={(e: any) => { setSubject(e.target.value) }} />

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

                                    <SelectWeekday value={scheduleItem.week_day}
                                    onChange={(e: any) => setScheduleItemValue(index, 'week_day', e.target.value)} />

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
