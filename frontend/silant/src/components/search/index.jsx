import React, { useState, useEffect } from 'react';
import axios from 'axios';
import s from './search.module.css'

const Search = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/machines/',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRFToken': '1TeToOmytlZyDW3z3SSrXxIveAAdxSSTFaiedl2Z3KNuCN7z7xHAqPrb0O112esj',
                }
            }
        )
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
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
                            <th>Дата отгрузки с завода</th>
                            <th>Покупатель</th>
                            <th>Грузополучатель (конечный потребитель)</th>
                            <th>Адрес поставки (эксплуатации)</th>
                            <th>Комплектация (доп. опции)</th>
                            <th>Сервисная компания</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td><a>{item.equipment_model}</a></td>
                                <td><a>{item.engine_model.name}</a></td>
                                <td><a>{item.transmission_model}</a></td>
                                <td><a>{item.drive_axle_model}</a></td>
                                <td><a>{item.steering_axle_model}</a></td>
                                <td>{item.shipment_date}</td>
                                <td>{item.client}</td>
                                <td>{item.consignee}</td>
                                <td>{item.delivery_address}</td>
                                <td>{item.equipment_configuration}</td>
                                <td>{item.service_company}</td>
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

export default Search;