import React, { useState } from 'react';
import s from './style.module.css'

const InputSample = ({label, type, name, onChange, onClick, value, select, defaultValue, errorMesage, placeholder, autoComplete}) => {

    const [ditry, setDitry] = useState(false)
    const blurHandler = (e) => {
        setDitry(true)
    }
    
    let inputType = 'text'

    switch (type) {
        case 'password':
            inputType = 'password'
            break
        case 'number':
            inputType = 'number'
            break
        case 'date':
            inputType = 'date'
            break
    }

    const label_output = ( 
        <label htmlFor={name} className={s.label_input}>
            {label}
        </label>
    )

        // state ошибки?
    return (
        <div className={(ditry && errorMesage) ? s.error_designation : s.unit}>
            {label ? label_output : ''}
            {select ? (
                <select id={name} onChange={onChange}>
                    <option value=''>------</option>
                    {select.map((item, index) => (<option key={index} value={item.id} >{item.name}</option>))}
                </select>
            ) : (
                <input 
                    onBlur={e => blurHandler(e)}
                    onChange={onChange}
                    onClick={onClick}
                    name={name}
                    // value={value}
                    defaultValue={defaultValue}
                    type = {inputType}
                    id={name}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                />
            )}
                {ditry && <div id='error' className={s.error_state}>{errorMesage}</div>}
        </div>
    );
};

export default InputSample;