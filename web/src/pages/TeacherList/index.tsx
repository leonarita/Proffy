import React, { useState, FormEvent, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import './styles.css'
import Input from '../../components/Input';
import api from '../../services/api';
import { logout } from '../../services/token';
import { useHistory } from 'react-router-dom';
import Teacher from '../../data/Teacher';
import TeacherItem from '../../components/TeacherItem';
import SelectSubject from '../../components/SelectSubject';
import SelectWeekday from '../../components/SelectWeekday';

function TeacherList() {

    const [teachers, setTeachers] = useState([])

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    const [page, setPage] = useState(1)

    const [isLoadedData, setIsLoadedData] = useState(false)

    const history = useHistory()

    async function searchTeachers(e: FormEvent) {
        e.preventDefault()

        loadTeachers()
    }

    useEffect(() => {
        api.get(`users/${sessionStorage.getItem('USER_ID')}`).then(response => {

            if(response.status === 401) {
                logout()
                history.push("/")
            }
        })
    }, [])

    const loadTeachers = async (page=1) => {

        try {

            const response = await api.get(`classesPag?page=${page}`, {
                params: {
                    subject,
                    week_day,
                    time
                }
            })
            
            setIsLoadedData(true)
            setPage(page)
            
            setTeachers(response.data)
        } catch (err) {
            logout()
            history.push("/")
        }
    }

    function prevPage () {

        if (page === 1)
            return
        
        loadTeachers(page - 1)
    }

    function nextPage () {

        if (teachers.length < 5)
            return
        
        loadTeachers(page + 1)
    }

    return (

        <div id="page-teacher-list" className="container">

            <PageHeader title="Estes são os proffys disponíveis.">
            
                <form id="search-teachers" onSubmit={searchTeachers}>

                    <SelectSubject value={subject} onChange={(e: any) => { setSubject(e.target.value) }} />

                    <SelectWeekday value={week_day} onChange={(e: any) => { setWeekDay(e.target.value) }} />
                    
                    <Input type="time" name="time" label="Hora" value={time} onChange={e => { setTime(e.target.value) }}></Input>

                    <button type="submit"> Buscar </button>

                </form>
            
            </PageHeader>

            <main>
                {   (!isLoadedData) ? ''
                    : 
                        (teachers.length > 0 ? 
                        teachers.map((teacher: Teacher) => { return <TeacherItem key={teacher.id} teacher={teacher} /> })
                        : <p className="no-results"> Nenhum professor encontrado com a sua pesquisa. </p> 
                    ) 
                }

                <div className="actions">
                    <button disabled={page === 1} onClick={prevPage}> Anterior </button>
                    <button disabled={teachers.length < 5} onClick={nextPage}> Próximo </button>
                </div>
            </main>

        </div>
    )
}

export default TeacherList
