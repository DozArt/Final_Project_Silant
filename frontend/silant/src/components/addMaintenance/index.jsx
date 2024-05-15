import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import s from './style.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from '@/main'
import Input from '../inputText';



const AddMaintenance = () => {
    const {store} = useContext(Context)
    const [data, setData] = useState({
		maintenance_date: '2024-05-15',
		operating_hours: 333,
		work_order_number: '222',
		work_order_date: '2024-05-15',
		maintenance_type: 19,
		servicing_organization: store.dataUser.id,
		machine: 2}
	);

    useEffect(() => {
		store.hendlerMachines()
        
    }, []);

	const updateData = (sample) => {
		const newData = { ...data };
		newData[sample.target.id] = sample.target.value;
		setData(newData)
		console.log(newData)
	}

	const RequestMaintenance = async () => {
		const response = await axios.post(`${store.baseURL}/maintenances/`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                }
            }

        )
            .then(response => {
                setData(response.data);
                console.log('=> отправка')
            })
            .catch(error => {
                if (error.response.status === 401) {
                    console.error('запускаем рефреш');
                    store.handlerRefreshToken(localStorage.getItem('refreshToken'))
                }
                console.error('Error fetching data:', error);
            });
	}


    return (
        <div>
            <h2>Добавление ТО</h2>
			<form>
				<Input label='Техника' 
						name='machine'
						onChange={(e) => updateData(e)}
						select={store.machines}
				/>
				<Input label='Тип ТО' 
						name='maintenance_type'
						onChange={(e) => updateData(e)}
						select={store.dataCatalogRecords.filter(item => item.entity_name == 'mt')}
				/>
				<Input label='Дата проведения' 
						name='maintenance_date'
						type='date'
						onChange={(e) => updateData(e)}
				/>
				<Input label='Наработка м/час' 
						name='operating_hours'
						onChange={(e) => updateData(e)}
				/>
				<Input label='Номер заказнаряда' 
						name='work_order_number'
						onChange={(e) => updateData(e)}
				/>
				<Input label='Дата заказнаряда' 
						name='work_order_date'
						type='date'
						onChange={(e) => updateData(e)}
				/>
				<a onClick={RequestMaintenance}>Сохранить </a>
			</form>
        </div>
    );
};

export default observer(AddMaintenance);