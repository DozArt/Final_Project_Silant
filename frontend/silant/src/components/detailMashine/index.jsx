import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import s from './class.module.css'
import style_borrowing from './itemMachin/style.module.css'
import { observer } from 'mobx-react-lite'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '@/main'
import ItemModel from '../searchMaintenance/itemModel';
import ItemMachin from './itemMachin';
import Menu from '../menu';



const DetailMashine = () => {
    const {store} = useContext(Context)
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/machines/${id}/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: store.token,
                }
            }
        )
            .then(response => {
                setData(response.data);
                console.log('=> setData detail Mashine')
            })
            .catch(error => {
                if (error.response.status === 401) {
                    console.error('запускаем рефреш');
                    store.handlerRefreshToken(localStorage.getItem('refreshToken'))
                }
                console.error('Error fetching data:', error);
            });
    }, [store.token]);

    return (
        <div>
            {data ? (
                <>
                    <div className={s.title}>
                        <h1>{store.modelData(data.equipment_model).name} - №{data.serial_number}</h1>
                        <p>{store.modelData(data.equipment_model).description}</p>
                    </div>
                    <h2>Информация о комплектации и технических характеристиках вашей техники</h2>
                    <Menu />
                    <div className={s.all_data}>
                        {/* <ItemMachin model_id={data.equipment_model} serial_number={data.serial_number} /> */}
                        <ItemMachin model_id={data.engine_model} serial_number={data.engine_serial_number} />
                        <ItemMachin model_id={data.transmission_model} serial_number={data.transmission_serial_number} />
                        <ItemMachin model_id={data.drive_axle_model} serial_number={data.drive_axle_serial_number} />
                        <ItemMachin model_id={data.steering_axle_model} serial_number={data.steering_axle_serial_number} />
                        <div className={style_borrowing.unit}>
                            <div>Договор поставки - {data.supply_contract_number_and_date}</div>
                            <div>Дата отгрузки с завода - {data.shipment_date}</div>
                            <div>Грузополучатель (конечный потребитель) - {data.consignee}</div>
                            <div>Адрес поставки (эксплуатации) - {data.delivery_address}</div>
                            <div>Комплектация - {data.equipment_configuration}</div>
                            <div>Клиент - {data.client.name}</div>
                            <div>Сервисная организация - {data.service_company.name}</div>
                        </div>
                    </div>
                    
                    <table className={s.all_data}>
                        <tbody>
                        </tbody>
                    </table>
                </>
                
            ) : (
                <p>Loading...</p>
            )}
            <div>[Список всех ТО]</div>
            <div>
            <Link to='/mashines/add'>Добавить ТО</Link>
            </div>
        </div>
    );
};

export default observer(DetailMashine);