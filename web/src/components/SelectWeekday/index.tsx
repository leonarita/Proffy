import React from 'react';
import Select from '../Select';

const SelectWeekday = ({ ...rest }) => {

    return (
        <Select name="week_day" label="Dia da semana" {...rest}
                                    
            options={[
                { value: '0', label: 'Domingo' },
                { value: '1', label: 'Segunda-feira' },
                { value: '2', label: 'Terça-feira' },
                { value: '3', label: 'Quarta-feira' },
                { value: '4', label: 'Quinta-feira' },
                { value: '5', label: 'Sexta-feira' },
                { value: '6', label: 'Sábado' }
        ]} />
    )
}

export default SelectWeekday


