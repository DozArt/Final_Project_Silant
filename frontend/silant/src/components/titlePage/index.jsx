import React, {useContext, useState, useEffect} from 'react';
import s from './style.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from '@/main'
import { Link } from 'react-router-dom';


const TitlePage = () => {
    const {store} = useContext(Context)

    return (
        <div className={s.unit}>
            <p className={s.item}>Вы авторизованны как</p>
            <h1>{store.role} - {store.dataUser.first_name}</h1>
        </div>
        
    );
};

export default observer(TitlePage);