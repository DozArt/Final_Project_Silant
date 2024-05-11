import React, {useContext, useState, useEffect} from 'react';
import s from './menu.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from '@/main'
import { Link } from 'react-router-dom';


const Menu = () => {
    const {store} = useContext(Context)

    return (
        <div className={s.unit}>
            <Link to='/'>Общая информация</Link>
            <Link to='/maintenance'>ТО</Link>
            <a>Рекламации</a>
        </div>
        
    );
};

export default observer(Menu);