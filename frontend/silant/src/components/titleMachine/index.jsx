import React, {useContext, useState, useEffect} from 'react';
import s from './style.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from '@/main'
import { Link, useParams } from 'react-router-dom';


const TitleMacine = () => {
    const {store} = useContext(Context)
    const { id } = useParams();

    return (
        (id && store.modelData(store.machine.equipment_model)) ? (
            <div className={s.title}>
                <div className={s.sing}>
                    <h1>{store.modelData(store.machine.equipment_model).name} - №{store.machine.serial_number}</h1>
                    <p>{store.modelData(store.machine.equipment_model).description}</p>
                    
                </div>
            </div>
        ) : ''
    );
};

export default observer(TitleMacine);