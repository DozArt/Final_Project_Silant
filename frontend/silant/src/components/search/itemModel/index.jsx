import React, { useContext, useState, useEffect } from 'react';
import s from './itemModel.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from '@/main'



const ItemModel = ({model_id, serialNamber}) => {
    const {store} = useContext(Context)
    const[activ, setActiv] = useState(false)

    const [modelName, setModelName] = useState('load')
    const [modelDescription, setModelDescription] = useState('load')

    useEffect(() => {
        try {
            setModelName(store.dataCatalogRecords.find(data => data.id === model_id).name)
            setModelDescription(store.dataCatalogRecords.find(data => data.id === model_id).description)
        } catch {
            setModelName('loading...')
            setModelDescription('loading...')
        }
    }, [store.dataCatalogRecords]);

    const switch_activ = () => {
        setActiv(!activ)
    }

    return (
        <td onClick={switch_activ}>
            <a className={activ ? s.select : ''}>
                {modelName}
            </a>
            <div className={activ ? s.modal_on : s.modal_off} onClick={switch_activ}>
                <div className={s.content} onClick={(event) => event.stopPropagation()}>
                    <button className={s.close} onClick={switch_activ}>X</button>
                    <p>{modelDescription}</p>
                    <p>Название модели: {modelName}</p>
                    <p>Серийный номер: {serialNamber}</p>
                </div>
            </div>
        </td>
    );
};

export default observer(ItemModel);