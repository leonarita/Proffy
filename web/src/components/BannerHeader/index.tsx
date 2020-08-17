import React from 'react';
import './style.css'
import logoImg from '../../assets/images/logo.svg'

function BannerHeader() {

    return (

        <div className="banner">
            <div className="logo-container">
                <img src={logoImg} alt="Proffy"/>
                <h2> Sua plataforma de <br/> estudos online </h2>
            </div>
        </div>

    )
}

export default BannerHeader
