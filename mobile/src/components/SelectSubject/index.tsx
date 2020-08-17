import React from 'react'
import { Picker } from 'react-native'

const SelectSubject = ({ ...rest }) => {

    return (
        <Picker {...rest}>
            <Picker.Item label="Selecione" value="" />
            <Picker.Item label="Artes" value="Artes" />
            <Picker.Item label="Biologia" value="Biologia" />
            <Picker.Item label="Ciências" value="Ciências" />
            <Picker.Item label="Educação física" value="Educação física" />
            <Picker.Item label="Física" value="Física" />
            <Picker.Item label="Geografia" value="Geografia" />
            <Picker.Item label="História" value="História" />
            <Picker.Item label="Matemática" value="Matemática" />
            <Picker.Item label="Português" value="Português" />
            <Picker.Item label="Química" value="Química" />
        </Picker>
    )
}

export default SelectSubject
