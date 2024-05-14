import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import s from './search.module.css'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom';
import { Context } from '@/main'
import ItemModel from './itemModel';
import Menu from '../menu';
import TitlePage from '../titlePage';



const SearchMaintenance = () => {
    const {store} = useContext(Context)
    const [data, setData] = useState(null);
    const { id } = useParams();
    const [filter, setFilter] = useState(id)
    

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            axios.get(`http://127.0.0.1:8000/api/maintenances/${filter ? '?search='+filter : ''}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    }
                }
            )
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                if (error.response.status === 401) {
                    console.error('запускаем рефреш');
                    store.handlerRefreshToken(localStorage.getItem('refreshToken'))
                }
                console.error('Error fetching data:', response.status, error);
            }); 
        }

    }, [store.token]);

    // useEffect(() => {

    // }, [store.token]);

    // если есть id то заголовок должен быть 

    return (
        <div>
            {store.isAuth && data ? (<TitlePage machine_id={data[0].machine.id} machine_sn={data[0].machine.serial_number} />) : ''}    
            <h2>Информация о проведенных ТО вашей техники</h2>
            <Menu />
            {data ? (
                <table className={s.table} >
                    <thead>
                        <tr>
                            <th>№ п/п</th>
                            <th>Зав. № машины</th>
                            <th>Вид ТО</th>
                            <th>Дата проведения</th>
                            <th>Наработка м/час</th>
                            <th>№ заказ-наряда</th>
                            <th>Дата заказ-наряда</th>
                            <th>Организация проводившая ТО</th>
                        </tr>
                    </thead>
                    <tbody className='default'>
                        {data.map((item, index) => (
                            <tr key={item.id} className={s.row}>
                                <td>{index + 1}</td>
                                <ItemModel model_id={item.machine.id} serialNamber={item.machine.serial_number} extract='namber'/>
                                <ItemModel model_id={item.maintenance_type} serialNamber={item.serial_number}/>
                                <td>{item.maintenance_date}</td>
                                <td>{item.operating_hours}</td>
                                <td>{item.work_order_number}</td>
                                <td>{item.work_order_date}</td>
                                <td>{item.servicing_organization.id == item.machine.client ? 'смостоятельно' : item.servicing_organization.name}</td>
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

export default observer(SearchMaintenance);