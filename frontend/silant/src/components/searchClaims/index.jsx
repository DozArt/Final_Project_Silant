import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import s from './class.module.css'
import { observer } from 'mobx-react-lite'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Context } from '@/main'
import ItemModel from '../searchMaintenance/itemModel';
import Menu from '../menu';
import TitleMacine from '../titleMachine';
import InputSample from '../inputText';



const SearchClaims = () => {
    const {store} = useContext(Context)
    const [data, setData] = useState([]);
    const [dataFilter, setDataFilter] = useState(null)
    const [filter, setFilter] = useState([  {field: 'restoration_method', value: ''},
                                            {field: 'machine', value: ''},
                                            {field: 'failure_unit', value: ''},
    ])
    const [machines, setMachines] = useState(null)
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        id ? store.hendlerMachine(id) : ''
        axios.get(`http://127.0.0.1:8000/api/claims/${id ? '?search='+id : ''}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            }
        )
        .then(response => {
            response.data.sort((a, b) => {
                var dateA = new Date(a.failure_date);
                var dateB = new Date(b.failure_date);
                return dateA - dateB;
            });
            setData(response.data);
            setDataFilter(response.data);

            const noUniqueData = response.data.map(item => item.machine)
            const uniqueData = noUniqueData.filter((item, index, self) =>
                index === self.findIndex((t) => (
                    t.id === item.id
                ))
            );
            setMachines(uniqueData)
        })
        .catch(error => {
            if (error.response.status === 401) {
                console.error('запускаем рефреш');
                store.handlerRefreshToken(localStorage.getItem('refreshToken'))
            } else {
                console.error('Error fetching data:', response.status, error);
            }
        }); 

    }, [store.token]);

    const filterData = (sample) => {
        const updateFilter = filter.map(model => 
            model.field == sample.target.id ? { ...model, value: sample.target.value } : model
        )
        setFilter(updateFilter)
        console.log(updateFilter)
        let filteredData = data;
        updateFilter.forEach(field => {
            if (field.value != '') {
                filteredData = filteredData.filter(item => item[field.field].id == field.value || item[field.field] == field.value);
            }
        });
        setDataFilter(filteredData)
    }

    const extractEntity = (item) => {

        return store.dataCatalogRecords.find(cat => cat.id == item).entity_name
    }

    return (
        <div className={s.unit}>
            <TitleMacine  />
            <h2>Информация о рекламациях вашей техники</h2>
            <Menu />
            {dataFilter ? (
                <div className={s.scrolling}>
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
                            <th>Дата отказа</th>
                            <th>Наработка м/час</th>
                            <th>Узел отказа
                                <InputSample
                                    onChange={(e) => filterData(e)}
                                    name='failure_unit'
                                    select={store.dataCatalogRecords.filter(item => ['en', 'tr', 'da', 'sa'].includes(item.entity_name))}/>
                            </th>
                            <th>Описание отказа</th>
                            <th>Способ восстановления
                                <InputSample
                                    onChange={(e) => filterData(e)}
                                    name='restoration_method'
                                    select={store.dataCatalogRecords.filter(item => item.entity_name == 'rm')}/>
                            </th>
                            <th>Используемые запасные части</th>
                            <th>Дата восстановления</th>
                            <th>Время простоя техники</th>
                            <th>Сервисная компания</th>
                        </tr>
                    </thead>
                    <tbody className='default'>
                        {dataFilter.map((item, index) => (
                            <tr key={item.id} className={s.row} onClick={() => navigate(`/machine/${item.machine.id}`)} >
                                <td>{index + 1}</td>
                                <ItemModel model_id={item.machine.equipment_model} serialNamber={item.machine.serial_number} extract='namber'/>
                                <td>{item.failure_date}</td>
                                <td>{item.operating_hours}</td>
                                <ItemModel model_id={item.failure_unit.id} />
                                {/* <ItemModel model_id={item.failure_unit.id}  serialNamber={item.failure_unit.entity_name} extract='namber'/> */}
                                <td>{item.failure_description}</td>
                                <ItemModel model_id={item.restoration_method}/>
                                <td>{item.spare_parts_used}</td>
                                <td>{item.restoration_date}</td>
                                <td>{
                                    new Date(item.restoration_date).getDate() - new Date(item.failure_date).getDate()
                                }</td>
                                <td>{item.service_company.name}</td>
                                {/* <ItemModel model_id={item.restoration_method}/> */}
                                {/* <td>{item.servicing_organization.id == item.machine.client ? 'смостоятельно' : item.servicing_organization.name}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <Link to='/claims/add'><div className={s.link_add}>Добавить рекламацию</div></Link>
        </div>
    );
};

export default observer(SearchClaims);