import React, { useState, FormEvent, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import './styles.css'
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../components/Textarea';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { logout } from '../../services/token';
import Dropzone from '../../components/Dropzone';
import { ScheduleItem } from '../../data/ScheduleItem';
import convertMinutesToHours from '../../utils/ConvertMinutesToHours';
import SelectSubject from '../../components/SelectSubject';
import SelectWeekday from '../../components/SelectWeekday';

function Perfil() {

    const history = useHistory()

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

    useEffect(() => {

        try {

            const userId = sessionStorage.getItem('USER_ID')

            api.get(`users/${userId}`).then(response => {

                setName(response.data.name)
                setSurname(response.data.surname)
                setPhoto(response.data.avatar)
                setEmail(response.data.email)
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

    function handleCreateClass(e: FormEvent) {

        e.preventDefault()

        const userId = sessionStorage.getItem('USER_ID')

        console.log(avatar)

        const data = new FormData()

        data.append('name', name)
        data.append('surname', surname)

        if (avatar)
            data.append('image', avatar)
        
        api.post(`profile/${userId}`, data).then(() => {

            api.post(`classes/${userId}`, {  whatsapp, bio, subject, cost: Number(cost), schedule: scheduleItems })
            .then(() => { 

                history.push("/success-page", { 
                    title: "Cadastro salvo!",
                    subtitle1: "Tudo certo, seu cadastro está na lista de Proffys.",
                    subtitle2: "Agora é só ficar de olho no seu WhatsApp.",
                    messageButton: "Acessar" 
                })
            })
            .catch(() => { alert('Erro no cadastro') })

        })
        .catch(() => { alert('Erro na atualização') })
        
    }

    return (
        
        <div id="page-teacher-form" className="container">

            <PageHeader>
                <div className="header-top">
                    <img className="photo" src={photo} alt={name}/>

                    <strong> {name} {surname} </strong>
                    <h2> {subject} </h2>
                </div>
            </PageHeader>

            <main>

                <form onSubmit={handleCreateClass}>

                    <fieldset>
                        <legend> Seus dados </legend>

                        <Dropzone onFileUploaded={setAvatar} />

                        <div className="names">
                            
                            <Input name="name" label="Nome" value={name}
                                onChange={(e) => { setName(e.target.value) }} />

                            <Input name="surname" label="Sobrenome" value={surname}
                                onChange={(e) => { setSurname(e.target.value) }} />
                        </div>

                        <div className="header">
                            <Input name="email" label="E-mail" value={email} className="input-01"
                                onChange={(e) => { setEmail(e.target.value) }} />

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
                                <div className="item">
                                    <div key={scheduleItem.id} className="schedule-item">

                                        <SelectWeekday value={scheduleItem.week_day}
                                        onChange={(e: any) => setScheduleItemValue(index, 'week_day', e.target.value)} />

                                        <Input name="from" label="Das" type="time" value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}></Input>

                                        <Input name="to" label="Até" type="time" value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}></Input>

                                    </div>

                                    <button type="button" onClick={() => {
                                            api.delete(`classes/${scheduleItem.id}`)
                                            window.location.reload();
                                        }}> 
                                            Excluir horário 
                                    </button>
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

export default Perfil
