import React, { useContext, useState, useEffect } from 'react';
import s from './itemModel.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from '@/main'



const ItemModel = ({model_id, serialNamber, extract = 'model'}) => {
    const {store} = useContext(Context)

    const [modelName, setModelName] = useState('load')
    const [modelDescription, setModelDescription] = useState('load')

    useEffect(() => {
        if (store.dataCatalogRecords.length > 0 && model_id !== undefined) {
            const modelData = store.modelData(model_id)
            if (modelData) {
                setModelName(modelData.name)
                setModelDescription(modelData.description)
            } else {
                setModelName('Model not found')
                setModelDescription('Description not found')
            }
        }
    }, [model_id, store.dataCatalogRecords]);

    function getExtract(){
        switch (extract) {
            case 'namber':
                return serialNamber;
            default:
                return modelName;
        }
    }

    return (
        <td>
            <a className={s.text_link}>
                {getExtract()}
            </a>
            <div className={s.modal}>
                <p>{modelDescription}</p>
                <p>Название модели: {modelName}</p>
                {serialNamber ? (<p>Серийный номер: {serialNamber}</p>) : ''}
            </div>
        </td>
    );
};

export default observer(ItemModel);