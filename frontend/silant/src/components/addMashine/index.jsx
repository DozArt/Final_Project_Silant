import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import s from './addMashine.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from '@/main'
import ItemModel from './itemModel';
import Input from '../inputText';



const AddMashine = () => {
    const {store} = useContext(Context)
    const [data, setData] = useState(null);

    useEffect(() => {
        // axios.get('http://127.0.0.1:8000/api/machines/',
        //     {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: store.token,
        //         }
        //     }
        // )
        //     .then(response => {
        //         setData(response.data);
        //         console.log('=> setData Mashines')
        //     })
        //     .catch(error => {
        //         if (error.response.status === 401) {
        //             console.error('запускаем рефреш');
        //             store.handlerRefreshToken(localStorage.getItem('refreshToken'))
        //         }
        //         console.error('Error fetching data:', error);
        //     });
    }, []);

    

    return (
        <div>
            <h2>Добавление техники</h2>
            <Input label='Серийный номер техники' 
                    name='serial_number'/>
            <Input label='Модель техники' 
                    name='equipment_model'
                    select={store.dataCatalogRecords.filter(item => item.entity_name == 'eq')}/>

            <Input label='Модель двигателя' 
                    name='engine_model'
                    select={store.dataCatalogRecords.filter(item => item.entity_name == 'en')}/>
            <Input label='Заводской номер двигателя' 
                    name='engine_serial_number'/>

            <Input label='Модель трансмиссии' 
                    name='transmission_model'
                    select={store.dataCatalogRecords.filter(item => item.entity_name == 'tr')}/>
            <Input label='Заводской номер трансмиссии' 
                    name='transmission_serial_number'/>

            <Input label='Модель ведущего моста' 
                    name='drive_axle_model'
                    select={store.dataCatalogRecords.filter(item => item.entity_name == 'da')}/>
            <Input label='Заводской номер ведущего моста' 
                    name='drive_axle_serial_number'/>

            <Input label='Модель управляемого моста' 
                    name='steering_axle_model'
                    select={store.dataCatalogRecords.filter(item => item.entity_name == 'sa')}/>
            <Input label='Заводской номер управляемого моста' 
                    name='steering_axle_serial_number'/>
            
            <button>Сохранить </button>
        </div>
    );
};

export default observer(AddMashine);