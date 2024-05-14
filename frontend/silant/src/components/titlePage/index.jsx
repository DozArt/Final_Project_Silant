import React, {useContext, useState, useEffect} from 'react';
import s from './style.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from '@/main'
import { Link, useParams } from 'react-router-dom';


const TitlePage = ({machine_id, machine_sn}) => {
    const {store} = useContext(Context)
    const { id } = useParams();
    const [data, setData] = useState()

    return (
        (id && machine_id) ? ( 
            <div className={s.title}>
                <h1>{store.modelData(machine_id).name} - №{machine_sn}</h1>
                <p>{store.modelData(machine_id).description}</p>
            </div>
        ) : (
            <div className={s.unit}>
                <p className={s.item}>Вы авторизованны как</p>
                <h1>{store.role} - {store.dataUser.first_name}</h1>
            </div>
        )
    );
};

export default observer(TitlePage);