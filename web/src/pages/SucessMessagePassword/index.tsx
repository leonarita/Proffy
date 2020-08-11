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

const SucessMessagePassword: React.FC<MessageProps> = ({ title, subtitle1, subtitle2, messageButton }) => {

    const history = useHistory()

    function handleAcessPlatform(e: FormEvent) {
        e.preventDefault()
        history.push("/main")
    }

    return (
        <div className="success">
            <img src={success} alt=""/>
            <h1> Redefinição enviada! </h1>
            <p> Boa, agora é só checar o email que foi enviado para você </p>
            <p> redefinir sua senha e aproveitar os estudos. </p>

            <button onClick={handleAcessPlatform}>
                Voltar ao login
            </button>
        </div>
    )
}

export default SucessMessagePassword


