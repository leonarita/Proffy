import React, { Component } from 'react'
import './styles.css'

import logoImg from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'
import { Link } from 'react-router-dom'

function Register() {

    return (
        <div id="page-register">

            <div className="form">

                <Link className="back" to="/">
                    <img src={backIcon} alt="Voltar"/>
                </Link>

                <div className="register">

                    <form action="">

                        <strong> Cadastro </strong>
                        <p> Preencha os dados abaixo para começar </p>

                        <div className="input-block-1">
                            <input type="text" placeholder="Nome" required/>
                        </div>

                        <div className="input-block-2">
                            <input type="text" placeholder="Sobrenome" required/>
                        </div>

                        <div className="input-block-2">
                            <input type="text" placeholder="E-mail" required/>
                        </div>

                        <div className="input-block-3">
                            <input type="password" placeholder="Senha" required/>
                        </div>

                        <button> Concluir cadastro </button>

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

export default Register
