import React, { useEffect, useState } from 'react';
import './styles.css'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import api from '../../services/api';
import ConvertMinutesToHours from '../../utils/ConvertMinutesToHours'
import Teacher from '../../data/Teacher';
import { ScheduleItem } from '../../data/ScheduleItem';

interface TeacherItemProps {
    teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {

    const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([])

    const weekdays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']

    useEffect(() => {
        try {

            api.get(`/classes/${teacher.id}`).then((response) => {
                setScheduleItems(response.data)
            })
        }
        catch (err) {
        }
    }, [])

    function createNewConnection() {
        api.post('connections', { user_id: teacher.id })
        console.log(scheduleItems)
    }

    return (
        <article className="teacher-item">

            <header>
                <img src={`http://localhost:3333/uploads/${teacher.avatar}`} alt={teacher.name}/>
                <div>
                    <strong> {teacher.name} {teacher.surname} </strong>
                    <span> {teacher.subject} </span>
                </div>
            </header>

            <p>
                {teacher.bio}
            </p>

            <div className="hours">

                { weekdays.map((weekday: string, index: number) => {

                    var to="", from=""

                    scheduleItems.map((schedule) => {

                        if (schedule.week_day === index+1) {
                            to = ConvertMinutesToHours(schedule.to)
                            from = ConvertMinutesToHours(schedule.from)
                        }
                    })

                    return (
                        <div key={index} className="hour">
                            <p> Dia </p>
                            <h4> {weekday} </h4>
                            <p> Horário </p>

                            <h4> {from} - {to} </h4>

                        </div>
                    )

                }) }

            </div>

            <footer>
                <p>
                    Preço/hora
                    <strong> {Intl.NumberFormat('pt-BR', { style:'currency', currency:"BRL" }).format(teacher.cost)} </strong>
                </p>

                <a target="_blank" rel="noopener noreferrer" href={`https://wa.me/${teacher.whatsapp}`} onClick={createNewConnection}>
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em contato
                </a>
            </footer>

        </article>
    )
}

export default TeacherItem;
