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
        store.isAuth ? (
        <div className={s.unit}>
            <Link to={`/machine${id ? '/'+id : ''}`}><div>Общая информация</div></Link>
            <Link to={`/maintenance${id ? '/'+id : ''}`}><div>ТО</div></Link>
            <Link to={`/claims${id ? '/'+id : ''}`}><div>Рекламации</div></Link>
        </div>
    ) : ''
    );
};

export default observer(Menu);