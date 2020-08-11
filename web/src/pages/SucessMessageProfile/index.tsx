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

const SucessMessageProfile: React.FC<MessageProps> = ({ title, subtitle1, subtitle2, messageButton }) => {

    const history = useHistory()

    function handleAcessPlatform(e: FormEvent) {
        e.preventDefault()
        history.push("/main")
    }

    return (
        <div className="success">
            <img src={success} alt=""/>
            <h1> Cadastro salvo! </h1>
            <p> Tudo certo, seu cadastro está na lista de Proffys. </p>
            <p> Agora é só ficar de olho no seu WhatsApp. </p>

            <button onClick={handleAcessPlatform}>
                Acessar
            </button>
        </div>
    )
}

export default SucessMessageProfile


