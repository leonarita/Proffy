import React, { FormEvent } from 'react';
import './styles.css'

import success from '../../assets/images/icons/success-check-icon.svg'
import { useHistory, useLocation } from 'react-router-dom';

interface MessageProps {
    title: string
    subtitle1: string, 
    subtitle2: string
    messageButton: string
}

function SuccessPage(props: MessageProps) {

    const history = useHistory()

    const {title, messageButton, subtitle1, subtitle2} = useLocation().state as MessageProps


    function handleAcessPlatform(e: FormEvent) {
        e.preventDefault()
        history.push("/main")
    }

    return (
        <div className="success">
            <img src={success} alt=""/>
            <h1> {title} </h1>
            <p> {subtitle1} </p>
            <p> {subtitle2} </p>

            <button onClick={handleAcessPlatform}>
                {messageButton}
            </button>
        </div>
    )
}

export default SuccessPage


