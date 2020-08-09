import React, { Component } from 'react'
import './styles.css'

import logoImg from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'
import { Link } from 'react-router-dom'

function ForgetPassword() {

    return (
        <div id="page-forget-password">
            
            <div className="form">

                <Link to="/">
                    <img src={backIcon} alt="Voltar"/>
                </Link>

                <div className="help">

                    <form action="">
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
