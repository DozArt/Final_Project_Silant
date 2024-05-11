import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import s from './search.module.css'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom';
import { Context } from '@/main'
import ItemModel from './itemModel';



const Search = () => {
    const {store} = useContext(Context)
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/machines/',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: store.token,
                }
            }
        )
            .then(response => {
                setData(response.data);
                console.log('=> setData Mashines')
            })
            .catch(error => {
                if (error.response.status === 401) {
                    console.error('запускаем рефреш');
                    store.handlerRefreshToken(localStorage.getItem('refreshToken'))
                }
                console.error('Error fetching data:', error);
            });
    }, [store.token]);

    // СДЕЛАТЬ
    // подробная информация при клике на строку

    return (
        <div>
            <div>
            <Link to='/mashines/add'>Добавить технику</Link>
            </div>
            <h2>Проверьте комплектацию и технические характеристики техники Силант</h2>
            {data ? (
                <table className={s.table} >
                    <thead>
                        <tr>
                            <th>№ п/п</th>
                            <th>модель техники</th>
                            <th>Модель двигателя</th>
                            <th>Модель трансмиссии (производитель, артикул)</th>
                            <th>Модель ведущего моста</th>
                            <th>Модель управляемого моста</th>
                            {store.isAuth ? ( 
                                <>
                                <th>Дата отгрузки с завода</th>
                                <th>Договор поставки №, дата</th>
                                <th>Покупатель</th>
                                <th>Грузополучатель (конечный потребитель)</th>
                                <th>Адрес поставки (эксплуатации)</th>
                                <th>Комплектация (доп. опции)</th>
                                <th>Сервисная компания</th>
                                </>
                            ) : ''}
                            
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <ItemModel model_id={item.equipment_model} serialNamber={item.serial_number}/>
                                <ItemModel model_id={item.engine_model} serialNamber={item.engine_serial_number}/>
                                <ItemModel model_id={item.transmission_model} serialNamber={item.transmission_serial_number}/>
                                <ItemModel model_id={item.drive_axle_model} serialNamber={item.drive_axle_serial_number}/>
                                <ItemModel model_id={item.steering_axle_model} serialNamber={item.steering_axle_serial_number}/>
                                {store.isAuth ? ( 
                                    <>
                                    <td>{item.shipment_date}</td>
                                    <td>{item.supply_contract_number_and_date}</td>
                                    <td>{item.client.name}</td>
                                    <td>{item.consignee}</td>
                                    <td>{item.delivery_address}</td>
                                    <td>{item.equipment_configuration}</td>
                                    <td>{item.service_company.name}</td>
                                    </>
                                ) : ''}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default observer(Search);