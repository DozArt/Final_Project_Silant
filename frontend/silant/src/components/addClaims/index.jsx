import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import s from './style.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from '@/main'
import Input from '../inputText';



const AddClaims = () => {
    const {store} = useContext(Context)
    const [data, setData] = useState({
		failure_date: '2024-05-15',
		operating_hours: 333,
		failure_unit: '',
		failure_description: 'хз',
		restoration_method: 19,
		spare_parts_used: '',
		restoration_date: '2024-05-15',
		service_company: store.dataUser.id,
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

	const RequestСlaims = async () => {
		const response = await axios.post(`${store.baseURL}/claims/`, data,
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
                    if(store.handlerRefreshToken(localStorage.getItem('refreshToken'))) {
						RequestСlaims()
					}
                }
                console.error('Error fetching data:', error);
            });
	}


    return (
        <div>
            <h2>Добавление рекламации</h2>
			<form>
				<Input label='Техника' 
						name='machine'
						onChange={(e) => updateData(e)}
						select={store.machines}
				/>
				<Input label='Наработка м/час' 
						name='operating_hours'
						onChange={(e) => updateData(e)}
				/>
				<Input label='Дата отказа' 
						name='failure_date'
						type='date'
						onChange={(e) => updateData(e)}
				/>
				<Input label='Узел отказа' 
						name='failure_unit'
						onChange={(e) => updateData(e)}
						// select={store.dataCatalogRecords.filter(item => item.entity_name == 'mt')}
				/>
				<Input label='Описание отказа' 
						name='failure_description'
						onChange={(e) => updateData(e)}
				/>
				<Input label='Способ восстановления' 
						name='restoration_method'
						onChange={(e) => updateData(e)}
						select={store.dataCatalogRecords.filter(item => item.entity_name == 'rm')}
				/>
				<Input label='Используемые запасные части' 
						name='spare_parts_used'
						onChange={(e) => updateData(e)}
				/>
				<Input label='Дата восстановления' 
						name='restoration_date'
						type='date'
						onChange={(e) => updateData(e)}
				/>
				<a onClick={RequestСlaims}>Сохранить </a>
			</form>
        </div>
    );
};

export default observer(AddClaims);