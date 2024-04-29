import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
            {data ? (
                <ul>
                    {data.map(item => (
                        <li key={item.id}>{item.engine_serial_number} - {item.engine_model.name}</li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Search;