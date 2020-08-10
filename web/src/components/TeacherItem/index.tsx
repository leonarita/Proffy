import React from 'react';
import './styles.css'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import api from '../../services/api';

export interface Teacher {
    avatar: string,
    bio: string,
    cost: number,
    id: number,
    name: string,
    surname: string,
    subject: string,
    whatsapp: string
}

interface TeacherItemProps {
    teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {

    function createNewConnection() {
        api.post('connections', { user_id: teacher.id })
    }

    return (
        <article className="teacher-item">

            <header>
                <img src={teacher.avatar} alt={teacher.name}/>
                <div>
                    <strong> {teacher.name} {teacher.surname} </strong>
                    <span> {teacher.subject} </span>
                </div>
            </header>

            <p>
                {teacher.bio}
            </p>

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
