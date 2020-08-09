import React, { FormEvent } from 'react';
import './styles.css'

import logoImg from '../../assets/images/logo.svg'
import { useHistory } from 'react-router-dom';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'

function Login() {

    const history = useHistory()

    function handleLogin(e: FormEvent) {
        e.preventDefault()
        history.push('/main')
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
                        <input type="text" placeholder="E-mail" required/>
                    </div>

                    <div className="input-block-2">
                        <input type="password" placeholder="Senha" required/>
                    </div>

                    <div className="buttons-extras">
                        <div className="checkbox-block">
                            <input type="checkbox"/>
                            <p> Lembrar-me </p>
                        </div>

                        <a href="/forget-password"> Esqueci minha senha </a>
                        
                    </div>

                    <button onClick={handleLogin}> Entrar </button>

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

