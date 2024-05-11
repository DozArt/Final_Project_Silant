import React, { useContext, useState, useEffect } from 'react';
import s from './itemModel.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from '@/main'



const ItemModel = ({model_id, serialNamber, extract = 'model'}) => {
    const {store} = useContext(Context)
    const[activ, setActiv] = useState(false)

    const [modelName, setModelName] = useState('load')
    const [modelDescription, setModelDescription] = useState('load')

    useEffect(() => {
        if (store.dataCatalogRecords.length > 0 && model_id !== undefined) {
            const modelData = store.dataCatalogRecords.find(data => data.id == model_id)
            if (modelData) {
                setModelName(modelData.name)
                setModelDescription(modelData.description)
            } else {
                setModelName('Model not found')
                setModelDescription('Description not found')
            }
        }
    }, [model_id, store.dataCatalogRecords]);

    const switch_activ = () => {
        setActiv(!activ)
    }

    function getExtract(){
        switch (extract) {
            case 'namber':
                return serialNamber;
            default:
                return modelName;
        }
    }

    return (
        <td onClick={switch_activ}>
            <a className={activ ? s.select : ''}>
                {getExtract()}
            </a>
            <div className={activ ? s.modal_on : s.modal_off} onClick={switch_activ}>
                <div className={s.content} onClick={(event) => event.stopPropagation()}>
                    <button className={s.close} onClick={switch_activ}>X</button>
                    <p>{modelDescription}</p>
                    <p>Название модели: {modelName}</p>
                    {serialNamber ? (<p>Серийный номер: {serialNamber}</p>) : ''}
                </div>
            </div>
        </td>
    );
};

export default observer(ItemModel);