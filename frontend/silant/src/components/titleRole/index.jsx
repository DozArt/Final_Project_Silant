import React, {useContext, useState, useEffect} from 'react';
import s from './style.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from '@/main'
import { useParams } from 'react-router-dom';



const TitleRole = ({machine_id, machine_sn}) => {
    const {store} = useContext(Context)
    const { id } = useParams();
    const [data, setData] = useState()

    return (
        store.isAuth ? (
        <div className={s.unit}>
            <h1>{store.role} - {store.dataUser.first_name}</h1>
        </div>
        ) : ''
    );
};

export default observer(TitleRole) ;