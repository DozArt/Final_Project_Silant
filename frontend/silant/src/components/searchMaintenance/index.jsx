import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import s from './search.module.css'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom';
import { Context } from '@/main'
import ItemModel from './itemModel';
import Menu from '../menu';
import TitlePage from '../titlePage';
import InputSample from '../inputText';



const SearchMaintenance = () => {
    const {store} = useContext(Context)
    const [data, setData] = useState([]);
    const [dataFilter, setDataFilter] = useState(null)
    const [filter, setFilter] = useState([  {field: 'maintenance_type', value: ''},
                                            {field: 'machine', value: ''},
    ])
    const [machines, setMachines] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        id ? store.hendlerMachine(id) : ''
        axios.get(`http://127.0.0.1:8000/api/maintenances/${id ? '?search='+id : ''}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            }
        )
        .then(response => {
            response.data.sort((a, b) => {
                var dateA = new Date(a.maintenance_date);
                var dateB = new Date(b.maintenance_date);
                return dateA - dateB;
            });
            setData(response.data);
            setDataFilter(response.data);
            setMachines(response.data.map(item => item.machine))
        })
        .catch(error => {
            if (error.response.status === 401) {
                console.error('запускаем рефреш');
                store.handlerRefreshToken(localStorage.getItem('refreshToken'))
            }
            console.error('Error fetching data:', response.status, error);
        }); 

    }, [store.token]);

    const filterData = (sample) => {
        const updateFilter = filter.map(model => 
            model.field == sample.target.id ? { ...model, value: sample.target.value } : model
        )
        setFilter(updateFilter)
        let filteredData = data;
        updateFilter.forEach(field => {
            if (field.value != '') {
                filteredData = filteredData.filter(item => item[field.field].id == field.value || item[field.field] == field.value);
            }
        });
        setDataFilter(filteredData)

    }

    return (
        <div>
            {store.isAuth && id ? (<TitlePage machine_id={store.machine.equipment_model} machine_sn={store.machine.serial_number} />) : ''}    
            <h2>Информация о проведенных ТО вашей техники</h2>
            <Menu />
            {dataFilter ? (
                <table className={s.table} >
                    <thead>
                        <tr>
                            <th>№ п/п</th>
                            <th>Зав. № машины
                                <InputSample
                                    onChange={(e) => filterData(e)}
                                    name='machine'
                                    select={machines}/>
                            </th>
                            <th>Вид ТО
                                <InputSample
                                    onChange={(e) => filterData(e)}
                                    name='maintenance_type'
                                    select={store.dataCatalogRecords.filter(item => item.entity_name == 'mt')}/>
                            </th>
                            <th>Дата проведения</th>
                            <th>Наработка м/час</th>
                            <th>№ заказ-наряда</th>
                            <th>Дата заказ-наряда</th>
                            <th>Организация проводившая ТО</th>
                        </tr>
                    </thead>
                    <tbody className='default'>
                        {dataFilter.map((item, index) => (
                            <tr key={item.id} className={s.row}>
                                <td>{index + 1}</td>
                                <ItemModel model_id={item.machine.equipment_model} serialNamber={item.machine.serial_number} extract='namber'/>
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