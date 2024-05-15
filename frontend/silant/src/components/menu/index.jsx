import React, {useContext, useState, useEffect} from 'react';
import s from './menu.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from '@/main'
import { Link, useParams } from 'react-router-dom';


const Menu = () => {
    const {store} = useContext(Context)
    const { id } = useParams();

    const url_mashine = '/machine'
    const url_maintenance = '/maintenance'
    // если есть id то ссылка другая
    return (
        <div className={s.unit}>
            <Link to={`/machine${id ? '/'+id : ''}`}>Общая информация</Link>
            <Link to={`/maintenance${id ? '/'+id : ''}`}>ТО</Link>
            <Link to={`/claims${id ? '/'+id : ''}`}>Рекламации</Link>
        </div>
        
    );
};

export default observer(Menu);