import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import s from './search.module.css'
import { observer } from 'mobx-react-lite'
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '@/main'
import ItemModel from '../searchMaintenance/itemModel';
import Menu from '../menu';
import TitlePage from '../titlePage';
import InputSample from '../inputText';


const Search = () => {
    const {store} = useContext(Context)
    const [data, setData] = useState(null);
    const [dataFilter, setDataFilter] = useState(null)
    const [filter, setFilter] = useState([  {field: 'equipment_model', value: ''},
                                            {field: 'engine_model', value: ''},
                                            {field: 'transmission_model', value: ''},
                                            {field: 'drive_axle_model', value: ''},
                                            {field: 'steering_axle_model', value: ''},
    ])
    const navigate = useNavigate();
    const [search, setSearch] = useState('')
    const [inputSearch, setInputSearch] = useState('')


    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/machines/${search ? '?search='+search : ''}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: store.token,
                }
            }
        )
            .then(response => {
                response.data.sort((a, b) => {
                    // Преобразуем даты в объекты Date для сравнения
                    var dateA = new Date(a.shipment_date);
                    var dateB = new Date(b.shipment_date);
                    
                    // Сравниваем даты и возвращаем результат сравнения
                    return dateA - dateB;
                });
                setData(response.data);
                setDataFilter(response.data);
                
                console.log('=> setData Mashines')
            })
            .catch(error => {
                if (error.response.status === 401) {
                    console.error('запускаем рефреш');
                    store.handlerRefreshToken(localStorage.getItem('refreshToken'))
                }
                console.error('Error fetching data:', error);
            });
    }, [store.token, search]);


    const filterData = (sample) => {
        const updateFilter = filter.map(model => 
            model.field === sample.target.id ? { ...model, value: sample.target.value } : model
        )
        setFilter(updateFilter)
        let filteredData = data;
        updateFilter.forEach(field => {
            if (field.value != '') {
                filteredData = filteredData.filter(item => item[field.field] == field.value);
            }
        });
        setDataFilter(filteredData)
    }

    return (
        <div>
            {store.isAuth ? (<TitlePage />) : ''}
            <h2>Проверьте комплектацию и технические характеристики техники Силант</h2>
            {store.isAuth ? (<Menu />) : ''}
            <div className={s.search}>
                <InputSample placeholder='Заводской номер' name='searchSerialNamber' onChange={e => setInputSearch(e.target.value)}/>
                <button onClick={() => setSearch(inputSearch)}>Поиск</button>
            </div>
            {dataFilter ? (
                <table className={s.table} >
                    <thead>
                        <tr>
                            <th>№ п/п</th>
                            <th>модель техники 
                                <InputSample
                                    onChange={(e) => filterData(e)}
                                    name='equipment_model'
                                    select={store.dataCatalogRecords.filter(item => item.entity_name == 'eq')}/>
                            </th>
                            <th>Модель двигателя 
                                <InputSample
                                    onChange={(e) => filterData(e)}
                                    name='engine_model'
                                    select={store.dataCatalogRecords.filter(item => item.entity_name == 'en')}/>
                            </th>
                            <th>Модель трансмиссии (производитель, артикул)
                                <InputSample
                                    onChange={(e) => filterData(e)}
                                    name='transmission_model'
                                    select={store.dataCatalogRecords.filter(item => item.entity_name == 'tr')}/>
                            </th>
                            <th>Модель ведущего моста
                                <InputSample
                                    onChange={(e) => filterData(e)}
                                    name='drive_axle_model'
                                    select={store.dataCatalogRecords.filter(item => item.entity_name == 'ta')}/>
                            </th>
                            <th>Модель управляемого моста
                                <InputSample
                                    onChange={(e) => filterData(e)}
                                    name='steering_axle_model'
                                    select={store.dataCatalogRecords.filter(item => item.entity_name == 'sa')}/>
                            </th>
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
                    <tbody className='default'>
                        {dataFilter.map((item, index) => (
                            <tr key={item.id} onClick={() => navigate(`/machine/${item.id}`)}>
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