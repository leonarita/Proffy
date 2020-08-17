import React from 'react'
import { Picker } from 'react-native'

const SelectWeekday = ({ ...rest }) => {

    return (
        <Picker {...rest} >
            <Picker.Item label="Selecione" value="" />
            <Picker.Item label="Domingo" value="0" />
            <Picker.Item label="Segunda-feira" value="1" />
            <Picker.Item label="Terça-feira" value="2" />
            <Picker.Item label="Quarta-feira" value="3" />
            <Picker.Item label="Quinta-feira" value="4" />
            <Picker.Item label="Sexta-feira" value="5" />
            <Picker.Item label="Sábado" value="6" />
        </Picker>
    )
}

export default SelectWeekday
