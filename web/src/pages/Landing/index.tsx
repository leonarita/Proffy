import React, { useState, useEffect, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom'
import './styles.css'

import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'
import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import sair from '../../assets/images/icons/Sair.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'
import api from '../../services/api';
import { logout } from '../../services/token';

function Landing() {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [avatar, setAvatar] = useState('')

    const [totalConnections, setTotalConnections] =  useState(0)
    const history = useHistory()

    useEffect(() => {

        const userId = sessionStorage.getItem('USER_ID')

        try {
            api.get(`users/${userId}`).then(response => {

                setName(response.data.name)
                setSurname(response.data.surname)
                setAvatar(response.data.avatar)
            })

            api.get('connections').then(response => {
                const { total } = response.data
                setTotalConnections(total)
            })
        } catch (err) {
            logout()
            history.push("/")
        }

    }, [])

    function handleLogoff(e: FormEvent) {
        e.preventDefault()

        logout()
        history.push("/")
    }

    return (

        <div>
            <div id="page-landing">

                <div id="page-landing-content" className="container">

                    <div className="data">
                        <div className="profile">
                            <a href="/perfil">
                                <img src={avatar} alt={name}/>
                                <p> {name} {surname} </p>
                            </a>
                        </div>

                        <div className="logoff">
                            <button onClick={handleLogoff}>
                                <img src={sair} alt="Logoff"/>
                            </button>
                        </div>
                    </div>

                    <div className="logo-container">
                        <img src={logoImg} alt="Proffy"/>
                        <h2> Sua plataforma de estudos online </h2>
                    </div>

                    <img src={landingImg} alt="Plataforma de estudos" className="hero-image"/>

                </div>

            </div>

            <div id="bottom">
                <div className="buttons-container">

                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar"/>
                        Estudar
                    </Link>

                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Dar aulas"/>
                        Dar aulas
                    </Link>
                </div>

                <span className="total-connections">
                    Total de {totalConnections} conexões já realizadas <img src={purpleHeartIcon} alt="Coração roxo"/>
                </span>
            </div>
        </div>
    )
}

export default Landing

