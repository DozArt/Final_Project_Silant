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
import TitlePage from '../titlePage';



const DetailMashine = () => {
    const {store} = useContext(Context)
    const [data, setData] = useState(store.machine);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        store.hendlerMachine(id)
    }, [store.token]);

    return (
        <div>
            {store.machine ? (
                <>
                    {store.isAuth && store.machine ? (<TitlePage machine_id={store.machine.equipment_model} machine_sn={store.machine.serial_number} />) : ''}
                    <h2>Информация о комплектации и технических характеристиках вашей техники</h2>
                    <Menu />
                    <div className={s.all_data}>
                        {/* <ItemMachin model_id={data.equipment_model} serial_number={data.serial_number} /> */}
                        <ItemMachin model_id={store.machine.engine_model} serial_number={store.machine.engine_serial_number} />
                        <ItemMachin model_id={store.machine.transmission_model} serial_number={store.machine.transmission_serial_number} />
                        <ItemMachin model_id={store.machine.drive_axle_model} serial_number={store.machine.drive_axle_serial_number} />
                        <ItemMachin model_id={store.machine.steering_axle_model} serial_number={store.machine.steering_axle_serial_number} />
                        <div className={style_borrowing.unit}>
                            <div>Договор поставки - {store.machine.supply_contract_number_and_date}</div>
                            <div>Дата отгрузки с завода - {store.machine.shipment_date}</div>
                            <div>Грузополучатель (конечный потребитель) - {store.machine.consignee}</div>
                            <div>Адрес поставки (эксплуатации) - {store.machine.delivery_address}</div>
                            <div>Комплектация - {store.machine.equipment_configuration}</div>
                            <div>Клиент - {store.machine.client.name}</div>
                            <div>Сервисная организация - {store.machine.service_company.name}</div>
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
            <div>
            <Link to='/mashines/add'>Добавить ТО</Link>
            </div>
        </div>
    );
};

export default observer(DetailMashine);