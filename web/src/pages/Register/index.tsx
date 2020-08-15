import React, { useState, FormEvent, useEffect } from 'react'
import './styles.css'

import logoImg from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
import * as yup from 'yup'
import { hasTokenLocalStorage, getTokenLocalStorage } from '../../services/token'

const userSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(8).max(25),
    name: yup.string().required().min(3),
    surname: yup.string().required()
})

function Register() {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    useEffect(() => {
        
        try {
            if(hasTokenLocalStorage() > 0) {
                const token = getTokenLocalStorage()
                const id = localStorage.getItem('USER_ID')

                if (token !== null || token !== undefined) {
                    sessionStorage.setItem("TOKEN", token!)
                    sessionStorage.setItem("USER_ID", id!)
                    history.push("/main");
                }
            }

            else {
                return
            }
        }
        catch (err) {
            return
        }
    }, [])

    function handleLogin(e: FormEvent) {
        e.preventDefault()

        try {

            userSchema.isValid({ name, surname, email, password }).then(response => {

                if (response) {
                    api.post("/users", { name, surname, email, password }).then(() => {
                        history.push("/success-register")
                    })
                }
            })
        } 
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div id="page-register">

            <div className="banner">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <h2> Sua plataforma de <br/> estudos online </h2>
                </div>
            </div>

            <div className="form">

                <Link to="/">
                    <img src={backIcon} alt="Voltar"/>
                </Link>

                <div className="register">

                    <form action="" onSubmit={handleLogin}>

                        <strong> Cadastro </strong>
                        <p> Preencha os dados abaixo para começar. </p>

                        <div className="input-block-1">
                            <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required/>
                        </div>

                        <div className="input-block-2">
                            <input type="text" placeholder="Sobrenome" value={surname} onChange={(e) => setSurname(e.target.value)} required/>
                        </div>

                        <div className="input-block-2">
                            <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        </div>

                        <div className="input-block-3">
                            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        </div>

                        <button> Concluir cadastro </button>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default Register
