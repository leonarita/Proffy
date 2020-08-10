import React, { useEffect, useState, FormEvent } from 'react'
import './styles.css'

import logoImg from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'
import { Link, useHistory } from 'react-router-dom'
import { hasTokenLocalStorage, getTokenLocalStorage } from '../../services/token'
import api from '../../services/api'

function ForgetPassword() {

    const [email, setEmail] = useState('')

    const history = useHistory()

    useEffect(() => {

        if(hasTokenLocalStorage() > 0) {
            const token = getTokenLocalStorage()
            const id = localStorage.getItem('USER_ID')

            if (token !== null || token !== undefined) {
                sessionStorage.setItem("TOKEN", token!)
                sessionStorage.setItem("USER_ID", id!)
                history.push("/main");
            }
        }
    }, [])

    function handleResetPassword(e: FormEvent) {
        e.preventDefault()

        api.post("forgot_password", { email })
        history.push("/")
    }

    return (
        <div id="page-forget-password">
            
            <div className="form">

                <Link to="/">
                    <img src={backIcon} alt="Voltar"/>
                </Link>

                <div className="help">

                    <form action="">
                        <strong> Eita, esqueceu sua senha? </strong>
                        <p> Não esquenta, vamos dar um jeito nisso. </p>

                        <div className="input-block">
                            <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        </div>

                        <button onClick={handleResetPassword}> Enviar </button>
                    </form>
                </div>
                

            </div>
            
            <div className="banner">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <h2> Sua plataforma de <br/> estudos online </h2>
                </div>
            </div>

        </div>
    )
}

export default ForgetPassword
