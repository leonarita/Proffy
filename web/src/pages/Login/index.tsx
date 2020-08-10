import React, { FormEvent, useState, useEffect } from 'react';
import './styles.css'

import logoImg from '../../assets/images/logo.svg'
import { useHistory } from 'react-router-dom';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'
import api from '../../services/api';
import { getTokenLocalStorage, hasTokenLocalStorage } from '../../services/token';

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [statusLogin, setStatusLogin] = useState(true)
    const [remember, setRemember] = useState(false)

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

    async function handleLogin(e: FormEvent) {
        e.preventDefault()

        if (!email || !password) {
            setStatusLogin(false)
        } 
        else {
            
            try {
                const response = await api.post("/login", { email, password });

                console.log(response)
                
                if(remember) {
                    localStorage.setItem('TOKEN', JSON.stringify(response.data.token))
                    localStorage.setItem('USER_ID', JSON.stringify(response.data.data_user.id))
                }

                sessionStorage.setItem('TOKEN', JSON.stringify(response.data.token))
                sessionStorage.setItem('USER_ID', JSON.stringify(response.data.data_user.id))

                history.push("/main");
            } catch (err) {
                setStatusLogin(false)
            }
          }
    }

    return (
    
        <div id="page-login">

            <div className="banner">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <h2> Sua plataforma de <br/> estudos online </h2>
                </div>
            </div>

            <div className="form">

                <form action="">
                    <strong> Fazer login </strong>

                    <div className="input-block-1">
                        <input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>

                    <div className="input-block-2">
                        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>

                    <div className="buttons-extras">
                        <div className="checkbox-block">
                            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}/>
                            <p> Lembrar-me </p>
                        </div>

                        <a href="/forget-password"> Esqueci minha senha </a>
                        
                    </div>

                    <button onClick={handleLogin}> Entrar </button>

                    { !statusLogin && (
                        <p className="error-message"> Erro ao realizar o login </p>
                    ) }

                </form>

                <footer>
                    <div className="register">
                        <p> Não tem conta? </p>

                        <a href="/register"> Cadastre-se </a>
                    </div>

                    <p className="free"> É de graça <img src={purpleHeartIcon} alt="Coração roxo"/> </p>
                </footer>
            </div>

        </div>
    )
}

export default Login

