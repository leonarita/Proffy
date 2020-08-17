import React, { useEffect, useState, FormEvent } from 'react'
import './styles.css'

import backIcon from '../../assets/images/icons/back.svg'
import { Link, useHistory } from 'react-router-dom'
import * as yup from 'yup';
import { hasTokenLocalStorage, getTokenLocalStorage } from '../../services/token'
import api from '../../services/api'
import BannerHeader from '../../components/BannerHeader'

const emailSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required(),
})

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

        try {

            emailSchema.isValid({ email }).then(valid => {

                if (valid) {
                    api.post("forgot_password", { email })
                    history.push("success-password")
                }
                else {
                    console.log('Email invalido')
                }
            })
        }
        catch(err) {
        }
    }

    return (
        <div id="page-forget-password">

            <BannerHeader />
            
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
        
        </div>
    )
}

export default ForgetPassword
