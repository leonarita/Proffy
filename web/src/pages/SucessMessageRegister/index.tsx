import React, { FormEvent } from 'react';
import './styles.css'

import success from '../../assets/images/icons/success-check-icon.svg'
import { useHistory } from 'react-router-dom';

interface MessageProps {
    title: string
    subtitle1: string, 
    subtitle2: string
    messageButton: string
}

const SucessMessageRegister: React.FC<MessageProps> = ({ title, subtitle1, subtitle2, messageButton }) => {

    const history = useHistory()

    function handleAcessPlatform(e: FormEvent) {
        e.preventDefault()
        history.push("/main")
    }

    return (
        <div className="success">
            <img src={success} alt=""/>
            <h1> Cadastro concluído! </h1>
            <p> Agora você faz parte da plataforma Proffy. </p>
            <p> Tenha uma ótima experiência. </p>

            <button onClick={handleAcessPlatform}>
                Fazer login
            </button>
        </div>
    )
}

export default SucessMessageRegister


