import React, { useContext, useState, useEffect } from 'react';
import s from './style.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from '@/main'



const ItemMachin = ({model_id, serial_number}) => {
    const {store} = useContext(Context)
    const modelData = store.dataCatalogRecords.find(data => data.id == model_id)

    return (
        <div className={s.unit}>
            <div>{store.getValueLabel(modelData.entity_name)}</div>
            <div>Заводской номер - {serial_number}</div>
            <div>Название - {modelData.name}</div>
            <div>{modelData.description}</div>
        </div>
    );
};

export default ItemMachin;